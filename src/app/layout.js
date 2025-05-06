
"use client"
import { users } from '@/lib/users';
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({ children }) {

  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const foundUser = users.find((user) =>
      user.name.toLowerCase() === query.toLowerCase()
    );
    setResult(foundUser);
  };

  return (
    <html lang="en">
      <body>
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
          <div className='container-fluid'>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/users">Users</Link>
              </li>
            </ul>
            <form onSubmit={handleSearch} className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}

              />
              <button className='btn btn-outline-primary' type='submit'>Search</button>
            </form>

          </div>
        </nav>
        {result && <h1 className='mt-4'> {result.name}</h1>}
        {!result && query && <h2 className='mt-4'>User not found</h2>}
        {children}
      </body>
    </html>
  );
}
