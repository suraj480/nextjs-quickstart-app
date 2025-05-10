import { createProduct, products } from "@/lib/products";

// Request URL: http://192.168.29.21:3000/api/products
export async function GET() {
    return new Response(JSON.stringify(products), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// Request URL: http://192.168.29.21:3000/api/products
// Header: Content-Type: application/json
// Request Body: { "id":"123", "type":"veggie", "description":"potato","price":"$90"}
export async function POST(request) {
    const body = await request.json();
    const { id, type, description, price } = body;
    if (!id || !type || !description | !price) {
        return new Response(
            JSON.stringify({ error: ' required.' }),
            { status: 400 });
    }
    const newProuct = createProduct({ id, type, description, price });
    return Response.json(newProuct, { status: 201 })
}
