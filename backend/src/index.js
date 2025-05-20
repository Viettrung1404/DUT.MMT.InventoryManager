import express from 'express';

import router from './routes/app.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import templateEngineConfig from './config/templateEngine.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { connectDB, getDB } from './config/db.config.js';
import cors from 'cors';


const startApp = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
    const port = 3000;
    app.use(express.json());
    app.use('/', router);

    app.use(cors({
        origin: ['http://localhost:19006', 'exp://192.168.1.5:19000'], // Thêm origin của Expo
        credentials: true
    }));
    
    app.use(express.static(path.join(__dirname, '/public')));

    templateEngineConfig(app);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
}

const runApp = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        await startApp();
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

runApp()

