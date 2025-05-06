
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ul className="nav nav-pills m-2 " >
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href="/">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/contact">Contact</Link>
          </li>
        </ul>
        {children}
      </body>
    </html>
  );
}
