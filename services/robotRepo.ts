import { openDatabaseAsync } from '@/db';
import { Robot } from '@/model/Robot';

export type RobotInput = Omit<Robot, 'id' | 'created_at' | 'updated_at' | 'archived'>;
export type RobotUpdate = Partial<Omit<Robot, 'id' | 'created_at'>>;

// Crée un robot
export async function create(robotInput: RobotInput): Promise<Robot | null> {
    const db = await openDatabaseAsync();
    const now = Date.now();
    const archived = 0;
    const id = Math.random().toString(36).slice(2, 12);
    await db.getAllAsync(
        'INSERT INTO robots (id, name, label, year, type, created_at, updated_at, archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, robotInput.name, robotInput.label, robotInput.year, robotInput.type, now, now, archived]
    );
    const rows = await db.getAllAsync<Robot>('SELECT * FROM robots WHERE id = ? AND archived = 0', [id]);
    return rows[0] ?? null;
}

// Met à jour un robot
export async function update(id: string, changes: RobotUpdate): Promise<Robot | null> {
    const db = await openDatabaseAsync();
    const now = Date.now();
    const fields = Object.keys(changes);
    if (fields.length === 0) {
        const rows = await db.getAllAsync<Robot>('SELECT * FROM robots WHERE id = ? AND archived = 0', [id]);
        return rows[0] ?? null;
    }
    const setClause = fields.map(f => `${f} = ?`).join(', ') + ', updated_at = ?';
    const values = fields.map(f => (changes as any)[f]);
    values.push(now);
    values.push(id);
    await db.getAllAsync(`UPDATE robots SET ${setClause} WHERE id = ?`, values);
    const rows = await db.getAllAsync<Robot>('SELECT * FROM robots WHERE id = ? AND archived = 0', [id]);
    return rows[0] ?? null;
}

// Supprime un robot
export async function remove(id: string): Promise<void> {
    const db = await openDatabaseAsync();
    await db.getAllAsync('UPDATE robots SET archived = 1, updated_at = ? WHERE id = ?', [Date.now(), id]);
}

// Récupère un robot par id
export async function getById(id: string): Promise<Robot | null> {
    const db = await openDatabaseAsync();
    const rows = await db.getAllAsync<Robot>('SELECT * FROM robots WHERE id = ? AND archived = 0', [id]);
    return rows[0] ?? null;
}

// Liste paginée/filtrée/triée
export async function list({ q = '', sort = 'created_at DESC', limit = 20, offset = 0 }: { q?: string; sort?: string; limit?: number; offset?: number }): Promise<Robot[]> {
    const db = await openDatabaseAsync();
    let where = 'archived = 0';
    let params: any[] = [];
    if (q) {
        where += ' AND (name LIKE ? OR label LIKE ?)';
        params.push(`%${q}%`, `%${q}%`);
    }
    const sql = `SELECT * FROM robots WHERE ${where} ORDER BY ${sort} LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    return db.getAllAsync<Robot>(sql, params);
}
