import React from "react";
import express from 'express';

const connect = require("../../../config/db");
const request = require("supertest");

const app=express()
beforeEach(async() => {
    await connect();
  });

const runTests = () => {
  describe("Test the home page", () => {
    test("It should give a 200 response.", async () => {
      let res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
    });
  });
};

connect()
  .then(_ => app.listen(process.env.PORT))
  .then(runTests)
  .catch(err => {
    console.error(`Could not connect to mongodb`, err);
  });


// import React from "react";
// import remed from "../../../models/adminmedicine"
// import express from 'express'
// import reroute from "../../../routes/adminRoutes"
// import request from "request";
// const mongoose = require("mongoose");
// const db =require("../../../index")

// const app=express()
// app.use(express.json())
// app.use('api/admin/getreorderedmedicine',reroute)

// describe('first test case',()=>{
//     it('success',async ()=>{
//         const {body, statusCode} = await request(app).get('/api/admin/getreorderedmedicine')
//         expect(body).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     itemName:expect.any(String),
//                     price:expect.any(String),
//                     quantity:expect.any(Number),
//                 })
//             ])
//         )
//         expect(statusCode).toBe(200)
//     })
// })
