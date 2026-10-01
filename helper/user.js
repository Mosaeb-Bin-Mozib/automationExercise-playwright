import fs from 'fs';

export function getUser(id) {
    const users = JSON.parse(
        fs.readFileSync('./test-data/user.json', 'utf-8')
    );

    return users.find(user => user.id === id);
}