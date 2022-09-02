const express=require('express')
const dotenv = require('dotenv').config();
const cors=require('cors')
const routes = require('./routes/sampleRoute');
const cookieParser=require("cookie-parser")
const app=express()

const colors=require('colors')
const connectDB = require('./config/db')
app.use(express.json())
app.use(cors({  origin: true,
    credentials: true, allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie']
  
  }));
app.use(cookieParser())
// express middleware handling the form parsing
app.use(express.urlencoded({extended: false}));
connectDB();





app.use('/api/admin',require("./routes/adminRoutes"))
//app.use('/api/medicine',require("./routes/medicineRoutes"))
app.use('/api/medicine',require("./routes/routes.productDbAdmin"))

const {errorHandler}=require("./middleware/error")

app.use('/api/users',require("./routes/userRoutes"))
app.use(errorHandler)


// reorder medicine

//METHOD : GET
//TEST METHOD TO CHECK IF SERVER RESPONDS
app.get('/',(req,res)=>{
    console.log("hello GET ROUTE")
    res.send("GET ROUTE WORKS")
})
routes(app)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))