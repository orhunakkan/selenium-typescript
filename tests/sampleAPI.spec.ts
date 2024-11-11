import axios from 'axios';
import {beforeAll, describe, expect, it} from 'vitest';
import {getPayloads} from '../utilities/sampleUtility';

const baseURL = 'https://reqres.in/api';

describe('Reqres API Tests', () => {

    let requestPayloads: any;

    beforeAll(async () => {
        requestPayloads = await getPayloads();
    });

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
        const response = await axios.post(`${baseURL}/users`, requestPayloads.newUser);
        expect(response.status).toBe(201); // Check if the status code is 201
        expect(response.data).toHaveProperty('name', requestPayloads.newUser.name); // Check if the response has the correct name
        expect(response.data).toHaveProperty('job', requestPayloads.newUser.job); // Check if the response has the correct job
    });

    // Test to update a user using PUT
    it('should update a user', async () => {
        const response = await axios.put(`${baseURL}/users/2`, requestPayloads.updatedUserPut);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('name', requestPayloads.updatedUserPut.name); // Check if the response has the updated name
        expect(response.data).toHaveProperty('job', requestPayloads.updatedUserPut.job); // Check if the response has the updated job
    });

    // Test to update a user using PATCH
    it('should update a user with PATCH', async () => {
        const response = await axios.patch(`${baseURL}/users/2`, requestPayloads.updatedUserPatch);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('name', requestPayloads.updatedUserPatch.name); // Check if the response has the updated name
        expect(response.data).toHaveProperty('job', requestPayloads.updatedUserPatch.job); // Check if the response has the updated job
    });

    // Test to delete a user
    it('should delete a user', async () => {
        const response = await axios.delete(`${baseURL}/users/2`);
        expect(response.status).toBe(204); // Check if the status code is 204
    });

    // Test to register a user successfully
    it('should register a user successfully', async () => {
        const response = await axios.post(`${baseURL}/register`, requestPayloads.newUserRegister);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('id'); // Check if the response has an 'id' property
        expect(response.data).toHaveProperty('token'); // Check if the response has a 'token' property
    });

    // Test to handle failed user registration
    it('should fail to register a user', async () => {
        try {
            await axios.post(`${baseURL}/register`, requestPayloads.failedUserRegister);
        } catch (error: any) {
            expect(error.response.status).toBe(400); // Check if the status code is 400
            expect(error.response.data).toHaveProperty('error'); // Check if the response has an 'error' property
        }
    });

    // Test to log in a user successfully
    it('should login a user successfully', async () => {
        const response = await axios.post(`${baseURL}/login`, requestPayloads.userLogin);
        expect(response.status).toBe(200); // Check if the status code is 200
        expect(response.data).toHaveProperty('token'); // Check if the response has a 'token' property
    });

    // Test to handle failed user login
    it('should fail to login a user', async () => {
        try {
            await axios.post(`${baseURL}/login`, requestPayloads.failedUserLogin);
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