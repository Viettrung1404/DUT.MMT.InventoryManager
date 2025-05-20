import fs from 'fs';

export const readFileData = async (path) => {
    try {
        const data = await fs.promises.readFile(path, 'utf8');
        return JSON.parse(data).users;
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

export const writeFileData = async (path, data) => {
    try {
        await fs.promises.writeFile(path, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing file:', err);
        throw err;
    }
}