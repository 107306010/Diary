import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response, Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import DiaryRoutes from "../routes/diary";


// Routes

// load variables stored in .env
dotenv.config();

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());

// use 'router' to handle each request
app.use("/api/diaries", DiaryRoutes);

const port = process.env.PORT || 8000;

if (!process.env.MONGO_URL) {
  throw new Error("Unexpected error: Missing MongoDB url");
}
const MONGO_URL: string = process.env.MONGO_URL;

// connect to MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    // move app.listen() to here to make sure DB connection is established
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
    // print the msg if connection of DB is successful
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
     // Catch any errors that occurred while starting the server
    console.log(error.message);
  });
