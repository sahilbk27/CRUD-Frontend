import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = ["PENDING", "IN_PRODUCTION", "DISPATCHED", "DELIVERED", "CANCELLED"];

const emptyOrder = {
  customer_id:"",
  product_id:"",
  quantity: "",
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
  const [customers,setCustomers]=useState([]);
  const [products,setProducts]=useState([]);
  const [selectedProduct,setSelectedProduct]=useState(null);

  useEffect(()=>{
  
  axios.get("http://localhost:8080/customers")
  .then(res=>{
  setCustomers(res.data);
  });
  
  
  axios.get("http://localhost:8080/products")
  .then(res=>{
  setProducts(res.data);
  });
  
  
  },[]);

  // Re-sync form fields whenever initialValues changes (e.g. after a lookup or on edit-page load)
  useEffect(() => {
    if (initialValues) {
      setValues({ ...emptyOrder, ...initialValues });
    }
  }, [initialValues]);

  const handleChange=(e)=>{
  
  const {name,value}=e.target;
  
  setValues(prev=>{
  
  let updated={
  ...prev,
  [name]:value
  };
  
  if(name==="quantity" && selectedProduct){
  
  updated.total_amount =
  selectedProduct.unitPrice * value;
  
  }
  return updated;
  }); 
  };

  const handleProductChange=(e)=>{

  const id=e.target.value;
  
  
  const product=products.find(
  p=>p.id===Number(id)
  );
  
  
  setSelectedProduct(product);
  
  
  setValues(prev=>({
  ...prev,
  product_id:id,
  total_amount:
  product && prev.quantity
  ?
  product.unitPrice * prev.quantity
  :
  ""
  }));
  
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

        {/* <div className="form-field">
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
        </div> */}

        <div className="form-field">
        
        <label>Customer</label>
        
        <select
        name="customer_id"
        value={values.customer_id}
        onChange={handleChange}
        required
        >
        
        <option value="">
        Select Customer
        </option>
        
        
        {customers.map(c=>(
        
        <option key={c.id} value={c.id}>
        {c.customerName}
        </option>
        
        ))}
        
        </select>
        
        </div>

        {/* <div className="form-field">
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
        </div> */}

        <div className="form-field">

        <label>Product</label>
        
        <select
        name="product_id"
        value={values.product_id}
        onChange={handleProductChange}
        required
        >
        
        <option value="">
        Select Product
        </option>
        
        
        {products.map(p=>(
        
        <option key={p.id} value={p.id}>
        {p.productName}
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

        {/* <div className="form-field">
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
        </div> */}

        <div className="form-field">

        <label>Unit Price</label>
        
        <input
        value={
        selectedProduct?.unitPrice || ""
        }
        readOnly
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
          name="total_amount"
          value={values.total_amount}
          readOnly
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
