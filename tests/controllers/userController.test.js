import { test } from 'vitest'
import request from 'supertest'
import express from 'express'
import userRoutes from '../../src/routes/userRoutes.js'
import app from '../../src/server.js'

test('getProfile', async ({ expect }) => {
    try {
        app.use('/user', userRoutes)

        const response = await request(app)
            .get('/user/1') // replace 1 with a valid user_id
        
        // Check status code
        expect(response.status).toBe(200)
    
        // Check response body
        expect(response.body).toHaveProperty('content')
        expect(response.body.content).toEqual(expect.any(Object)) // if the response is a user object
    } catch (error) {
        console.error(error)
    }
})


test('updateProfile', async ({ expect }) => {
    try {
        app.use('/user', userRoutes)

        const updatedProfile = {
            phone: '1234567890',
            bank_account: '1234567890',
            email: 'testuser@test.com',
            address: 'Test Address',
        }

        const response = await request(app)
            .put('/user/1/edit') // replace 1 with a valid user_id
            .send(updatedProfile)
        
        // Check status code
        expect(response.status).toBe(200)
    
        // Check response body
        expect(response.body).toHaveProperty('content')
        expect(response.body.content).toEqual(expect.any(Object)) // if the response is a user object
    } catch (error) {
        console.error(error)
    }
})

// Sucess case
test('checkOut', async ({ expect }) => {
    try {
        app.use('/user', userRoutes)

        const products = [
            { product_id: 1, quantity: 1 }, // replace with valid product_id and quantity
            // add more products as needed
        ]

        const response = await request(app)
            .post('/user/1/checkout') // replace 1 with a valid user_id
            .send({ products })
        
        // Check status code
        expect(response.status).toBe(200)
    
        // Check response body
        expect(response.body).toHaveProperty('content')
        expect(response.body.content).toEqual(expect.any(Object)) // if the response is an order object
    } catch (error) {
        console.error(error)
    }
})

// Cart is empty
test('checkOut', async ({ expect }) => {
    try {
        app.use('/user', userRoutes)

        const products = [
            { product_id: 1, quantity: 0 }, // replace with valid product_id and quantity
            // add more products as needed
        ]

        const response = await request(app)
            .post('/user/1/checkout') // replace 1 with a valid user_id
            .send({ products })
        
        // Check status code
        expect(response.status).toBe(400)
    
        // Check response body
        expect(response.body).toHaveProperty('content')
        expect(response.body.content).toEqual(expect.any(Object)) // if the response is an order object
    } catch (error) {
        console.error(error)
        
    }
})

test('getOrder', async ({ expect }) => {
    try {
        app.use('/user', userRoutes)

        const userId = 1; // replace 1 with a valid user_id
        const response = await request(app)
            .get(`/user/${userId}/order`)
        
        // Check status code
        expect(response.status).toBe(200)
    
        // Check response body
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual('Success')

        // Check content
        expect(response.body).toHaveProperty('content')
        expect(response.body.content).toEqual(expect.any(Object)) // if the response is an order object

        // Check if the user_id in the response matches the user_id used in the request
        expect(response.body.content.user_id).toEqual(userId)

        // Check other properties
        expect(response.body.content).toHaveProperty('order_id')
        expect(response.body.content).toHaveProperty('order_date')
        expect(response.body.content).toHaveProperty('total_price')
        expect(response.body.content).toHaveProperty('order_quantity')
        expect(response.body.content).toHaveProperty('product_id_products_order_products')
        expect(response.body.content).toHaveProperty('user')

        // Check user properties
        expect(response.body.content.user).toHaveProperty('user_id')
        expect(response.body.content.user).toHaveProperty('user_name')
        expect(response.body.content.user).toHaveProperty('full_name')
        expect(response.body.content.user).toHaveProperty('email')
        expect(response.body.content.user).toHaveProperty('phone')
        expect(response.body.content.user).toHaveProperty('bank_account')

    } catch (error) {
        console.error(error)
        expect(error).toBeNull()
    }
})