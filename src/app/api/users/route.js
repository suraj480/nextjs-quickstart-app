import { createUser, users } from "@/lib/users";

// Request URL: http://192.168.29.21:3000/api/users
export async function GET() {
    return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// Request URL: http://192.168.29.21:3000/api/users
// Header: Content-Type: application/json
// Request Body: { "name": "King Kochhar", "email": "king.kochhar@gmail.com" }
export async function POST(request) {
    const body = await request.json();
    const { name, email } = body;
    if (!name || !email) {
        return new Response(
            JSON.stringify({ error: 'Name and Email required.' }),
            { status: 400 });
    }
    const newUser = createUser({ name, email });
    return Response.json(newUser, { status: 201 })
}
