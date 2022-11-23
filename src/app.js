//app.js para configurar la plicacion de express
import express from "express";
import cors from "cors";
import morgan from "morgan";
import pkg from '../package.json';
// Routes
import languageRoutes from "./routes/language.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Settings
app.set("port", 4000);
app.set("pkg",pkg);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());//para entender entradas json

// Routes
app.use("/api/languages", languageRoutes);
app.use("/api/auth", authRoutes);

app.get("/",(req,res)=>{
    res.json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

export default app;
