import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {Database, open} from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database;

describe('SQLite Database Tests', () => {

    // Before all tests, open the database connection and set up the initial data
    beforeAll(async () => {
        db = await open({
            filename: ':memory:', // Use an in-memory database for testing
            driver: sqlite3.Database
        });
        console.log('Database connection opened.');
        await db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, job TEXT)'); // Create the "users" table
        console.log('Table "users" created.');
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['morpheus', 'leader']); // Insert initial data
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['neo', 'the one']);
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['trinity', 'hacker']);
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['smith', 'agent']);
        await db.run('INSERT INTO users (name, job) VALUES (?, ?)', ['oracle', 'prophet']);
        console.log('Initial data inserted into "users" table.');
    });

    // After all tests, close the database connection
    afterAll(async () => {
        await db.close();
        console.log('Database connection closed.');
    });

    // Test to retrieve all users from the database
    it('should retrieve all users from the database', async () => {
        const result = await db.all('SELECT * FROM users'); // Retrieve all users
        console.log('Retrieved all users:', result);
        expect(Array.isArray(result)).toBe(true); // Check if the result is an array
        expect(result.length).toBe(5); // Check if the array length is 5
        expect(result[0]).toHaveProperty('name', 'morpheus'); // Check if the first user is "morpheus"
        expect(result[0]).toHaveProperty('job', 'leader'); // Check if the first user's job is "leader"
    });

    // Test to retrieve a user by ID from the database
    it('should retrieve a user by ID from the database', async () => {
        const result = await db.get('SELECT * FROM users WHERE id = ?', [1]); // Retrieve user with ID 1
        console.log('Retrieved user by ID:', result);
        expect(result).toHaveProperty('name', 'morpheus'); // Check if the user's name is "morpheus"
        expect(result).toHaveProperty('job', 'leader'); // Check if the user's job is "leader"
    });

    // Test to update a user in the database
    it('should update a user in the database', async () => {
        await db.run('UPDATE users SET name = ?, job = ? WHERE id = ?', ['neo', 'the one', 1]); // Update user with ID 1
        const result = await db.get('SELECT * FROM users WHERE id = ?', [1]); // Retrieve the updated user
        console.log('Updated user:', result);
        expect(result).toHaveProperty('name', 'neo'); // Check if the user's name is "neo"
        expect(result).toHaveProperty('job', 'the one'); // Check if the user's job is "the one"
    });

    // Test to delete a user from the database
    it('should delete a user from the database', async () => {
        await db.run('DELETE FROM users WHERE id = ?', [1]); // Delete user with ID 1
        const result = await db.get('SELECT * FROM users WHERE id = ?', [1]); // Try to retrieve the deleted user
        console.log('Deleted user:', result);
        expect(result).toBeUndefined(); // Check if the result is undefined (user not found)
    });
});