import { deleteProduct, getProductById, updateProduct } from "@/lib/products";

// Request URL: http://192.168.29.21:3000/api/users/1
export async function GET(_, { params }) {
    const id = parseInt(params.id);
    const user = getProductById(id);
    return user
        ? Response.json(user)
        : new Response(JSON.stringify({ error: "User Not Found" }), {
            status: 404,
        });
}

// Request URL: http://192.168.29.21:3000/api/products/1
// Header: Content-Type: application/json
// Request Body: 
export async function PUT(request, { params }) {
    const id = parseInt(params.id);
    const data = await request.json();
    const updatedProduct = updateProduct(id, data);
    return updatedProduct
        ? Response.json(updatedProduct)
        : new Response(JSON.stringify({ error: "Product Not Found" }), {
            status: 404,
        });
}

// Request URL: http://192.168.29.21:3000/api/products/1
export async function DELETE(_, { params }) {
    const id = parseInt(params.id);
    const deletedProduct = deleteProduct(id);
    return deletedProduct
        ? Response.json(deletedProduct)
        : new Response(JSON.stringify({ error: "Product Not Found" }), {
            status: 404,
        });
}
