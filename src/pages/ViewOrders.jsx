import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, searchOrders, deleteOrder } from "../api/salesApi";

export default function ViewOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [notice, setNotice] = useState("");

  const loadAll = () => {
    setLoading(true);
    setError("");
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setError("Could not load orders. Is the backend running?"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      loadAll();
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await searchOrders(keyword.trim());
      setOrders(res.data);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setKeyword("");
    loadAll();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete order #${id}? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      setNotice(`Order #${id} deleted`);
      setTimeout(() => setNotice(""), 3000);
    } catch {
      setError(`Failed to delete order #${id}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        {/* <div className="eyebrow">Sales Orders / Manage</div> */}
        <h1>View Orders</h1>
        <p>Search, edit, or delete existing sales orders.</p>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by customer, product..."
        />
        <button type="submit" className="btn btn-primary">Search</button>
        {keyword && (
          <button type="button" className="btn btn-secondary" onClick={handleClearSearch}>
            Clear
          </button>
        )}
      </form>

      {notice && <div className="banner banner-success">{notice}</div>}
      {error && <div className="banner banner-error">{error}</div>}

      <div className="card" style={{ overflowX: "auto" }}>
        {loading ? (
          <p className="loading-text">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-state">No orders found.</div>
        ) : (
          <table style={{ minWidth: "900px" }}>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty / Unit</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <span className="id-chip">{o.order_number}</span>
                  </td>
                  <td>
                    <div>{o.customer_name}</div>
                    <div className="customer-email">{o.customer_email}</div>
                  </td>
                  <td>
                    <div>{o.product_name}</div>
                    <div className="customer-email">{o.product_code}</div>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{o.quantity} {o.unit}</td>
                  <td style={{ whiteSpace: "nowrap" }}>₹{o.unit_price?.toLocaleString("en-IN")}</td>
                  <td style={{ whiteSpace: "nowrap" }}>₹{o.total_amount?.toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`status-pill status-${(o.status || "").toLowerCase().replace("_", "-")}`}>
                      <span className="status-dot" />
                      {o.status}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{o.order_date}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{o.expected_delivery}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-secondary btn-small"
                        onClick={() => navigate(`/orders/edit/${o.id}`)}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(o.id)}
                        disabled={deletingId === o.id}
                      >
                        {deletingId === o.id ? "Deleting..." : "Delete"}
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}