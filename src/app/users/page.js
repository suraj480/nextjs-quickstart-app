"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '' });
    const [editId, setEditId] = useState(null);

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
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Add or Update User
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) return;
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `/api/users/${editId}` : `/api/users`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })

        setForm({ name: '', email: '' });
        setEditId(null);
        loadUsers();
    };

    // Edit Button Click
    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email });
        setEditId(user.id);
    }

    // Delete Button Click
    const handleDelete = async (id) => {
        await fetch(`/api/users/${id}`, { method: 'DELETE' })
        loadUsers();
    }

    return (
        <main className="container mt-5">
            <h2 className="text-primary">User Management</h2>

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