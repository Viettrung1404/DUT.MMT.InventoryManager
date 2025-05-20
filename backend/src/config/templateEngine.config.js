import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templateEngineConfig = (app) => {
    app.set('views engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
}

export default templateEngineConfig;