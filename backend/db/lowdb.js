import { Low, JSONFile } from 'lowdb';
import { join } from 'path';

const file = join(process.cwd(), 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { users: [] });

await db.read();
db.data ||= { users: [] };

export default db;
