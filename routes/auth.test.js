"use strict";

const request = require("supertest");

const app = require('../app')


const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  } = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



describe('register' , function(){
    const newUser = {
        username: "kevin123",
        email: "user123@user.com",
        password: "p1",
        photourl : 'url1'
    }
    test('create newUser' , async function(){
        const resp = await request(app)
        .post('/auth/register')
        .send({...newUser})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        expect(resp.body).toEqual({
            "token" : expect.any(String)
        })
    })
    test('duplicate User' , async function(){
        const resp = await request(app)
        .post('/auth/register')
        .send({
            username: "u3",
            email: "user1@user.com",
            password: "p1",
        })
        .expect(400)
    })
})


describe('login test' ,function (){
    test('signin success' , async function(){
        const resp = await request(app)
        .post('/auth/login')
        .send({
            username : "u3",
            password : "p1"
        })
        expect(resp.body).toEqual({
            "token" : expect.any(String)
        })
    })

    test('non-exsist user' , async function(){
        const resp = await request(app)
        .post('/auth/login')
        .send({
            username : "u3000",
            password : "p5"
        })
        .expect(401)
    })

    test('wrong password' , async function(){
        const resp = await request(app)
        .post('/auth/login')
        .send({
            username : "u3",
            password : "p5"
        })
        .expect(401)
    })
})