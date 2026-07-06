import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getOrderById, updateOrder } from "../api/salesApi";
import OrderForm from "../components/OrderForm";

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrderById(id)
      .then((res) => setInitialValues(res.data))
      .catch(() => setError("Order not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    try {
      await updateOrder(id, values);
      navigate("/orders/view", { state: { updated: id } });
    } catch {
      setError("Failed to update order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="eyebrow">Sales Orders / Edit</div>
        <h1>Edit Order <span className="id-chip">#{id}</span></h1>
        <p>Update the fields below and save your changes.</p>
      </div>

      {error && (
        <div className="banner banner-error">
          {error} — <Link to="/orders/view">Back to orders</Link>
        </div>
      )}

      <div className="card">
        {loading ? (
          <p className="loading-text">Loading order...</p>
        ) : initialValues ? (
          <OrderForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            submitting={submitting}
          />
        ) : null}
      </div>
    </div>
  );
}
