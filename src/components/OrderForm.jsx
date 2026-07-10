import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["PENDING", "IN_PRODUCTION", "DISPATCHED", "DELIVERED", "CANCELLED"];

const emptyOrder = {
  customer_name: "",
  customer_email: "",
  product_name: "",
  product_code: "",
  quantity: "",
  unit: "",
  unit_price: "",
  total_amount: "",
  delivery_address: "",
  expected_delivery: "",
  status: "PENDING",
  order_date: "",
};

/**
 * Controlled form for creating/editing a Sales order.
 *
 * Props:
 * - initialValues: object to prefill the form (used for edit + duplicate)
 * - onSubmit(values): called with form values on submit
 * - submitLabel: text for the submit button
 * - submitting: disables the button + shows a loading label
 */
export default function OrderForm({ initialValues, onSubmit, submitLabel = "Save", submitting = false }) {
  const [values, setValues] = useState(emptyOrder);

  // Re-sync form fields whenever initialValues changes (e.g. after a lookup or on edit-page load)
  useEffect(() => {
    if (initialValues) {
      setValues({ ...emptyOrder, ...initialValues });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">

        {/* <div className="form-field">
          <label htmlFor="order_number">Order Number</label>
          <input
            id="order_number"
            name="order_number"
            placeholder="e.g. ORD-2026-001"
            value={values.order_number}
            onChange={handleChange}
            required
          />
        </div> */}

        <div className="form-field">
          <label htmlFor="customer_name">Customer Name</label>
          <input
            id="customer_name"
            name="customer_name"
            value={values.customer_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="customer_email">Customer Email</label>
          <input
            id="customer_email"
            name="customer_email"
            type="email"
            value={values.customer_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="product_name">Product Name</label>
          <input
            id="product_name"
            name="product_name"
            value={values.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="product_code">Product Code</label>
          <input
            id="product_code"
            name="product_code"
            placeholder="e.g. FIP-112"
            value={values.product_code}
            onChange={handleChange}
            required
          />
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
          <label htmlFor="unit">Unit</label>
          <select id="unit" name="unit" value={values.unit} onChange={handleChange} required>
            <option value="">Select unit</option>
            <option value="PCS">PCS</option>
            <option value="SET">SET</option>
            <option value="MT">MT</option>
            <option value="KG">KG</option>
            <option value="L">L</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="unit_price">Unit Price (₹)</label>
          <input
            id="unit_price"
            name="unit_price"
            type="number"
            min="0"
            step="0.01"
            value={values.unit_price}
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
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={values.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
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
