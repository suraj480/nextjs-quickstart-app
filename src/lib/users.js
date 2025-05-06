
export const users = [
    { id: 1, name: 'sam', email: 'sam@example.com' },
    { id: 2, name: 'John Smith', email: 'john.smith@example.com' },
    { id: 3, name: 'joe', email: 'joe@example.com' },
]

let nextId = 4;

export function getUsers() {
    return users;
}

export function getUserById(id) {
    return users.find(u => u.id === id);
}

export function createUser(user) {
    const newUser = { id: nextId++, ...user };
    users.push(newUser);
    return newUser;
}

export function updateUser(id, updatedUser) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
    }
    return null;
}

export function deleteUser(id) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return null;
}