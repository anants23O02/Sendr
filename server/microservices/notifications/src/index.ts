import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import triggerRoutes from "./routes/trigger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Routes
app.use("/api/trigger", triggerRoutes);

app.get("/", (_req, res) => {
  res.send("Notification Microservice is up and running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
