import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoute from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(`request method is ${req.method} and url is ${req.url}`)
  next()
})
app.use(rateLimiter)

app.use("/api/notes", notesRoute)
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  });
})
