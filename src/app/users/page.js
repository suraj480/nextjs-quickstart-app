"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '' });
    const [editId, setEditId] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        fetch('/api/users')
            .then((res) => res.json())
            .then(setUsers)
            .catch((err) => console.log(err))
    }

    // HandleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setEmailError("Invalid email format");

            } else { setEmailError(null); }
        } if (name === "name") {
            if (value.length < 3) { setNameError("Name should be at least 3 characters long"); }
            else { setNameError(null); }
        } setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); if (!form.name || !form.email || nameError || emailError) return;
        const method = editId ? "PUT" : "POST";
        const url = editId ? `/api/users / ${editId}` : `/api/users`;
        await fetch(url, {
            method, headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        toast.success(editId ? "User updated successfully" : "User added successfully",
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        setForm({ name: "", email: "" });
        setEditId(null);
        loadUsers();
    };


    // Edit Button Click
    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email });
        toast.success("User updated successfully!", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setEditId(user.id);
    }

    // Delete Button Click
    const handleDelete = async (id) => {
        await fetch(`/api/users/${id}`, { method: 'DELETE' })
        toast.success("User deleted successfully!", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        loadUsers();
    }

    return (
        <main className="container mt-5">
            <h2 className="text-primary">User Management</h2>
            <ToastContainer />
            {/* User Input Form */}
            <form onSubmit={handleSubmit} className="row g-3 mt-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        className="form-control"
                    />
                    {nameError && <p style={{ color: 'red', marginTop: '5px' }}>{nameError}</p>}
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="form-control"
                    />
                      {emailError&& <p style={{ color: 'red', marginTop: '5px' }}>{emailError}</p>}
                </div>
                <div className="col-md-4">
                    <button className="btn btn-success w-100">
                        {editId ? 'Update User' : 'Add User'}
                    </button>
                </div>
            </form>


            {users.length === 0 && <p>Loading..</p>}
            <ul className="list-group mt-3">
                {users.map((user) => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{user.name}</strong> - {user.email}
                        </div>
                        <div>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>

                    </li>
                ))}
            </ul>
        </main>
    )
}