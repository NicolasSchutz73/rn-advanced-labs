import * as SQLite from 'expo-sqlite';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DB_NAME = 'robots.db';
const MIGRATIONS_DIR = join(__dirname, 'migrations');

export async function openDatabaseAsync() {
    const db = await SQLite.openDatabaseAsync(DB_NAME);

    // Récupère la version actuelle
    const [{ user_version }] = await db.getAllAsync<{ user_version: number }>('PRAGMA user_version;');

    // Liste et trie les migrations
    const migrationFiles = readdirSync(MIGRATIONS_DIR)
        .filter(f => f.match(/^\d+_.*\.sql$/))
        .sort();

    for (let i = user_version; i < migrationFiles.length; i++) {
        const migrationPath = join(MIGRATIONS_DIR, migrationFiles[i]);
        const sql = readFileSync(migrationPath, 'utf-8');
        await db.execAsync(sql);
        await db.execAsync(`PRAGMA user_version = ${i + 1};`);
    }

    return db;
}