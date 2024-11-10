import axios from 'axios';
import {describe, expect, it} from 'vitest';

const baseURL = 'https://reqres.in/api';

describe('Reqres API Tests', () => {

    // Test to fetch a list of users
    it('should fetch a list of users', async () => {
        const response = await axios.get(`${baseURL}/users?page=2`);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('data'); // Check if the response has a 'data' property
        expect(Array.isArray(response.data.data)).toBe(true); // Check if 'data' is an array
    });

    // Test to fetch a single user by ID
    it('should fetch a single user', async () => {
        const response = await axios.get(`${baseURL}/users/2`);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('data'); // Check if the response has a 'data' property
        expect(response.data.data).toHaveProperty('id', 2); // Check if the user ID is 2
    });

    // Test to handle fetching a non-existent user
    it('should return 404 for a non-existent user', async () => {
        try {
            await axios.get(`${baseURL}/users/23`);
        } catch (error: any) {
            expect(error.response.status).toBe(404); // Check if the status code is 404
        }
    });

    // Test to create a new user
    it('should create a new user', async () => {
        const newUser = {
            name: 'morpheus',
            job: 'leader'
        };
        const response = await axios.post(`${baseURL}/users`, newUser);
        expect(response.status).toBe(201); // Check if the status code is 201
        expect(response.data).toHaveProperty('name', newUser.name); // Check if the response has the correct name
        expect(response.data).toHaveProperty('job', newUser.job); // Check if the response has the correct job
    });

    // Test to update a user using PUT
    it('should update a user', async () => {
        const updatedUser = {
            name: 'morpheus',
            job: 'zion resident'
        };
        const response = await axios.put(`${baseURL}/users/2`, updatedUser);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('name', updatedUser.name); // Check if the response has the updated name
        expect(response.data).toHaveProperty('job', updatedUser.job); // Check if the response has the updated job
    });

    // Test to update a user using PATCH
    it('should update a user with PATCH', async () => {
        const updatedUser = {
            name: 'morpheus',
            job: 'zion resident'
        };
        const response = await axios.patch(`${baseURL}/users/2`, updatedUser);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('name', updatedUser.name); // Check if the response has the updated name
        expect(response.data).toHaveProperty('job', updatedUser.job); // Check if the response has the updated job
    });

    // Test to delete a user
    it('should delete a user', async () => {
        const response = await axios.delete(`${baseURL}/users/2`);
        expect(response.status).toBe(204); // Check if the status code is 204
    });

    // Test to register a user successfully
    it('should register a user successfully', async () => {
        const newUser = {
            email: 'eve.holt@reqres.in',
            password: 'pistol'
        };
        const response = await axios.post(`${baseURL}/register`, newUser);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('id'); // Check if the response has an 'id' property
        expect(response.data).toHaveProperty('token'); // Check if the response has a 'token' property
    });

    // Test to handle failed user registration
    it('should fail to register a user', async () => {
        const newUser = {
            email: 'sydney@fife'
        };
        try {
            await axios.post(`${baseURL}/register`, newUser);
        } catch (error: any) {
            expect(error.response.status).toBe(400); // Check if the status code is 400
            expect(error.response.data).toHaveProperty('error'); // Check if the response has an 'error' property
        }
    });

    // Test to log in a user successfully
    it('should login a user successfully', async () => {
        const user = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        };
        const response = await axios.post(`${baseURL}/login`, user);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('token'); // Check if the response has a 'token' property
    });

    // Test to handle failed user login
    it('should fail to login a user', async () => {
        const user = {
            email: 'peter@klaven'
        };
        try {
            await axios.post(`${baseURL}/login`, user);
        } catch (error: any) {
            expect(error.response.status).toBe(400); // Check if the status code is 400
            expect(error.response.data).toHaveProperty('error'); // Check if the response has an 'error' property
        }
    });

    // Test to fetch a list of resources
    it('should fetch a list of resources', async () => {
        const response = await axios.get(`${baseURL}/unknown`);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('data'); // Check if the response has a 'data' property
        expect(Array.isArray(response.data.data)).toBe(true); // Check if 'data' is an array
    });

    // Test to fetch a single resource by ID
    it('should fetch a single resource', async () => {
        const response = await axios.get(`${baseURL}/unknown/2`);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('data'); // Check if the response has a 'data' property
        expect(response.data.data).toHaveProperty('id', 2); // Check if the resource ID is 2
    });

    // Test to handle fetching a non-existent resource
    it('should return 404 for a non-existent resource', async () => {
        try {
            await axios.get(`${baseURL}/unknown/23`);
        } catch (error: any) {
            expect(error.response.status).toBe(404); // Check if the status code is 404
        }
    });

    // Test to fetch a delayed response
    it('should fetch a delayed response', async () => {
        const response = await axios.get(`${baseURL}/users?delay=3`);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('data'); // Check if the response has a 'data' property
        expect(Array.isArray(response.data.data)).toBe(true); // Check if 'data' is an array
    });
});