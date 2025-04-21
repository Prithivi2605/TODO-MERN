const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const todoRoutes = require("./views/todoRoutes")

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors({
//     origin: 'http://localhost:5173/', // Replace with the actual client's origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // Allow credentials if needed
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }));

app.use(cors());

// app.use((_, res, next) => {
//     const allowedOrigin = 'http://localhost:5173/'; // Replace with the actual client's origin
//     res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
//     res.setHeader('Vary', 'Origin'); // Important when dynamically setting Access-Control-Allow-Origin
//     next();
//   });

app.get("/", (req, res) => {
    res.json("hello world");
});

app.use("/api/todos", todoRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Something went wrong"});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})