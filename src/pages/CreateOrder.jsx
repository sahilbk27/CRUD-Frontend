import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, getOrderById } from "../api/salesApi";
import OrderForm, { emptyOrder } from "../components/OrderForm";

export default function CreateOrder() {
  const navigate = useNavigate();

  const [lookupId, setLookupId] = useState("");
  const [lookupStatus, setLookupStatus] = useState(null);
  const [looking, setLooking] = useState(false);

  const [formValues, setFormValues] = useState(emptyOrder);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    if (!lookupId) return;
    setLooking(true);
    setLookupStatus(null);
    try {
      const res = await getOrderById(lookupId);
      // Strip id and order_number — new order gets its own generated number
      // Extract customer/product objects and map to flat IDs for the dropdowns
      const { id, order_number, customer, product, ...rest } = res.data;
      setFormValues({
        ...rest,
        customerId: customer?.id || "",
        productId:  product?.id  || "",
      });
      setLookupStatus({
        type: "success",
        message: `Loaded order #${lookupId}. Edit and save as a new order.`,
      });
    } catch {
      setLookupStatus({
        type: "error",
        message: `No order found with ID ${lookupId}`,
      });
    } finally {
      setLooking(false);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await createOrder(values);
      navigate("/orders/view", { state: { created: res.data.id } });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Create Order</h1>
        <p>Fill out a new order, or load an existing order by ID to duplicate it.</p>
      </div>

      <div className="lookup-box">
        <div className="form-field">
          <label htmlFor="lookupId">Duplicate from Order ID</label>
          <input
            id="lookupId"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="Enter Order ID"
            type="number"
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleLookup}
          disabled={looking}
        >
          {looking ? "Looking up..." : "Load"}
        </button>
        {lookupStatus && (
          <span className={`lookup-status ${lookupStatus.type}`}>
            {lookupStatus.message}
          </span>
        )}
      </div>

      {error && <div className="banner banner-error">{String(error)}</div>}

      <div className="card">
        <OrderForm
          initialValues={formValues}
          onSubmit={handleSubmit}
          submitLabel="Create Order"
          submitting={submitting}
        />
      </div>
    </div>
  );
}