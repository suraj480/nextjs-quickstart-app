"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productsList = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    type: "",
    description: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);
  const [idError, setIdError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to load products:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "id") setIdError("");
    if (name === "type") setTypeError("");
    if (name === "description") setDescriptionError("");
    if (name === "price") setPriceError("");
  };

  const validateForm = () => {
    let valid = true;
    // if (! Number(form.id.trim())) {
    //   setIdError("ID is required");
    //   valid = false;
    // }
    if (!form.type.trim()) {
      setTypeError("Type is required");
      valid = false;
    }
    if (!form.description.trim()) {
      setDescriptionError("Description is required");
      valid = false;
    }
    if (!form.price.trim()) {
      setPriceError("Price is required");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix form errors");
      return;
    }

    const newProduct = {
      id: Number(form.id),
      type: form.type.trim(),
      description: form.description.trim(),
      price: Number(form.price),
    };

    if (editId) {
      // Update product via PUT
      const res = await fetch(`/api/products/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        toast.success("Product updated successfully!");
        setEditId(null);
        setForm({ id: "", type: "", description: "", price: "" });
        loadProducts();
      } else {
        toast.error("Failed to update product");
      }
    } else {
      // Add new product via POST
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        setForm({ id: "", type: "", description: "", price: "" });
        loadProducts();
      } else {
        toast.error("Failed to add product");
      }
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      type: product.type,
      description: product.description,
      price: product.price,
    });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted!");
      loadProducts();
    } else {
      toast.error("Failed to delete product");
    }
  };

  return (
    <main className="container mt-5">
      <h2 className="text-primary">Product Management</h2>
      <h2>{editId ? "Edit Product" : "Add Product"}</h2>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="row g-3 mt-3">
        <div className="col-md-4">
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Enter ID"
            className="form-control"
            disabled={!!editId} // disable id field during edit
          />
          {idError && <p style={{ color: "red" }}>{idError}</p>}
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Enter Type"
            className="form-control"
          />
          {typeError && <p style={{ color: "red" }}>{typeError}</p>}
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="form-control"
          />
          {descriptionError && <p style={{ color: "red" }}>{descriptionError}</p>}
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="form-control"
          />
          {priceError && <p style={{ color: "red" }}>{priceError}</p>}
        </div>
        <div className="col-md-4">
          <button className="btn btn-success w-100" type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>

      <h1>List of all products</h1>
      {products.length === 0 ? (
        <p>Loading..</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Price</th>
              <th>View</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <Link href={`/products/${item.id}`}>View Details</Link>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default productsList;
