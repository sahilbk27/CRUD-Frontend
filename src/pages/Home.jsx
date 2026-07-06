import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../api/salesApi";

export default function Home() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllOrders()
      .then((res) => setCount(res.data.length))
      .catch(() => setError("Could not reach the backend"));
  }, []);

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">
          <span className="pulse-dot" />
          Live Sales Order System
        </div>
        <h1 className="hero-title">
          Run your <span className="hero-accent">sales pipeline</span>
          <br />
          from one clean dashboard.
        </h1>
        <p className="hero-desc">
          Raise, track, and manage orders intelligently — real-time status updates, instant lookup, and full order history.
          Create, duplicate, search, and manage sales orders end-to-end —
          backed directly by your Spring Boot + MySQL service, no spreadsheets
          required.
        </p>
        <div className="hero-actions">
          <Link to="/orders/create" className="btn btn-hero-primary">
            + New Order
          </Link>
          <Link to="/orders/view" className="btn btn-hero-secondary">
            Browse Orders
          </Link>
        </div>
      </div>
 
      {/* Live stats */}
      <div className="home-stats">
        <div className="stat-box stat-teal">
          <div className="stat-value">{error ? "—" : count ?? "···"}</div>
          <div className="stat-label">Total Orders</div>
        </div>
      </div>
 
      {/* Feature grid */}
      <div className="section-label">What you can do here</div>
      <div className="feature-grid">
        <Link to="/orders/create" className="feature-card">
          <div className="feature-icon icon-teal">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </div>
          <h3>Create Order</h3>
          <p>Spin up a brand new sales order in seconds with full field validation.</p>
        </Link>
 
        <Link to="/orders/create" className="feature-card">
          <div className="feature-icon icon-purple">
            <svg viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <h3>Duplicate by ID</h3>
          <p>Load any past order and reuse it as a starting point for a new one.</p>
        </Link>
 
        <Link to="/orders/view" className="feature-card">
          <div className="feature-icon icon-coral">
            <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2"/><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </div>
          <h3>Smart Search</h3>
          <p>Find orders instantly by customer name, order number.</p>
        </Link>
 
        <Link to="/orders/view" className="feature-card">
          <div className="feature-icon icon-blue">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 21v-4.2L16.4 4.4a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L7.2 20 4 21z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
          </div>
          <h3>Edit &amp; Manage</h3>
          <p>Update order status, fix details.</p>
        </Link>
      </div>
    </div>
  );
}
