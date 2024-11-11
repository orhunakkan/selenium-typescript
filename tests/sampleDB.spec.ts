import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {Database, open} from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database;

describe('SQLite Database Tests', () => {

    beforeAll(async () => {
        db = await open({
            filename: ':memory:',
            driver: sqlite3.Database
        });
        console.log('Database connection opened.');
        await db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, job TEXT)');
        console.log('Table "users" created.');
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['morpheus', 'leader']);
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['neo', 'the one']);
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['trinity', 'hacker']);
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['smith', 'agent']);
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['oracle', 'prophet']);
        console.log('Initial data inserted into "users" table.');
    });

    afterAll(async () => {
        await db.close();
        console.log('Database connection closed.');
    });

    it('should retrieve all users from the database', async () => {
        const result = await db.all('SELECT * FROM users');
        console.log('Retrieved all users:', result);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(5);
        expect(result[0]).toHaveProperty('name', 'morpheus');
        expect(result[0]).toHaveProperty('job', 'leader');
    });

    it('should retrieve a user by ID from the database', async () => {
        const result = await db.get('SELECT * FROM users WHERE id = ?', [1]);
        console.log('Retrieved user by ID:', result);
        expect(result).toHaveProperty('name', 'morpheus');
        expect(result).toHaveProperty('job', 'leader');
    });

    it('should update a user in the database', async () => {
        await db.run('UPDATE users SET name = ?, job = ? WHERE id = ?', ['neo', 'the one', 1]);
        const result = await db.get('SELECT * FROM users WHERE id = ?', [1]);
        console.log('Updated user:', result);
        expect(result).toHaveProperty('name', 'neo');
        expect(result).toHaveProperty('job', 'the one');
    });

    it('should delete a user from the database', async () => {
        await db.run('DELETE FROM users WHERE id = ?', [1]);
        const result = await db.get('SELECT * FROM users WHERE id = ?', [1]);
        console.log('Deleted user:', result);
        expect(result).toBeUndefined();
    });
});