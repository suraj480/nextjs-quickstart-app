import Link from "next/link";
import React from "react";

const productsAvailable = [
  { id: 101, category: "Mobile", decription: "Iphone 15", price: "$53" },
  { id: 102, category: "Laptop", decription: "Hp probook", price: "$530" },
  { id: 103, category: "Accesories", decription: "Keyboard", price: "$8" },
];

const products = () => {
  return (
    <div>
      <h1>List of all products</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">View details</th>
          </tr>
        </thead>
        <tbody>
          {productsAvailable.map((item) => (
            <tr key={item.id}>
              {/* <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}

              {console.log(item)}

              <td>{item.id}</td>
              <td>{item.category}</td>
              <td>{item.decription}</td>
              <td>{item.price}</td>
              <td>
                <Link href={`/products/${item.id}`}>
                  Click here to view details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default products;
