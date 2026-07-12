import { useEffect, useState } from "react";
import { getCustomers } from "../api/customers";
import { getProducts } from "../api/products";

const STATUS_OPTIONS = ["PENDING", "IN_PRODUCTION", "DISPATCHED", "DELIVERED", "CANCELLED"];

// emptyOrder uses customerId and productId — flat text fields removed
const emptyOrder = {
  customerId: "",
  productId: "",
  quantity: "",
  total_amount: "",
  delivery_address: "",
  expected_delivery: "",
  status: "PENDING",
  order_date: "",
};

export default function OrderForm({ initialValues, onSubmit, submitLabel = "Save", submitting = false }) {
  const [values, setValues] = useState(emptyOrder);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  // Load customers and products in parallel on mount
  useEffect(() => {
    Promise.all([getCustomers(), getProducts()])
      .then(([customersRes, productsRes]) => {
        setCustomers(customersRes.data);
        setProducts(productsRes.data);
      })
      .catch(err => console.error("Could not load master data", err));
  }, []);

  // Re-sync form only after both master lists AND initialValues are ready
  // This ensures dropdowns have options before trying to set selected value
  useEffect(() => {
    if (initialValues && customers.length > 0 && products.length > 0) {
      setValues({ ...emptyOrder, ...initialValues });
    }
  }, [initialValues, customers, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert flat customerId/productId to nested objects backend expects
    const payload = {
      ...values,
      customer: { id: Number(values.customerId) },
      product:  { id: Number(values.productId) },
    };

    // Remove flat id fields — backend doesn't need them
    delete payload.customerId;
    delete payload.productId;

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">

        <div className="form-field">
          <label>Customer</label>
          <select
            name="customerId"
            value={values.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.customer_name}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Product</label>
          <select
            name="productId"
            value={values.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.product_name} — {p.product_code}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={values.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="total_amount">Total Amount (₹)</label>
          <input
            id="total_amount"
            name="total_amount"
            type="number"
            min="0"
            step="0.01"
            value={values.total_amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="order_date">Order Date</label>
          <input
            id="order_date"
            name="order_date"
            type="date"
            value={values.order_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="expected_delivery">Expected Delivery</label>
          <input
            id="expected_delivery"
            name="expected_delivery"
            type="date"
            value={values.expected_delivery}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={values.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-field full">
          <label htmlFor="delivery_address">Delivery Address</label>
          <input
            id="delivery_address"
            name="delivery_address"
            placeholder="e.g. Bosch Plant, Adugodi, Bengaluru"
            value={values.delivery_address}
            onChange={handleChange}
            required
          />
        </div>

      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export { STATUS_OPTIONS, emptyOrder };