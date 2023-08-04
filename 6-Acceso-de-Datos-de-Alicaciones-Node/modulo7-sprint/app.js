import Server from './models/Server.js';
import dotenv from 'dotenv';
import * as path from 'path';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const server = new Server(__dirname);
server.listen();
