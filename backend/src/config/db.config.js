import { MongoClient } from 'mongodb';
import 'dotenv/config';

let dbInstance = null;
let client = null; 

const connectDB = async () => {
    try {
        if (client) {
            await client.close();
        }
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        dbInstance = client.db(); 
        
        console.log(`Connected to database: ${dbInstance.databaseName}`);
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

const getDB = async () => {
    if (!dbInstance) {
        await connectDB();
    }
    return dbInstance;
};

export { connectDB, getDB };