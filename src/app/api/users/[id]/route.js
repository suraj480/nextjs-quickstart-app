import { deleteUser, getUserById, updateUser } from "@/lib/users";

// Request URL: http://192.168.29.21:3000/api/users/1
export async function GET(_, { params }) {
    const id = parseInt(params.id);
    const user = getUserById(id);
    return user
        ? Response.json(user)
        : new Response(JSON.stringify({ error: "User Not Found" }), {
            status: 404,
        });
}

// Request URL: http://192.168.29.21:3000/api/users/1
// Header: Content-Type: application/json
// Request Body: { "name": "suraj", "email": "suraj@gmail.com" }
export async function PUT(request, { params }) {
    const id = parseInt(params.id);
    const data = await request.json();
    const updatedUser = updateUser(id, data);
    return updatedUser
        ? Response.json(updatedUser)
        : new Response(JSON.stringify({ error: "User Not Found" }), {
            status: 404,
        });
}

// Request URL: http://192.168.29.21:3000/api/users/1
export async function DELETE(_, { params }) {
    const id = parseInt(params.id);
    const deleetedUser = deleteUser(id);
    return deleetedUser
        ? Response.json(deleetedUser)
        : new Response(JSON.stringify({ error: "User Not Found" }), {
            status: 404,
        });
}
