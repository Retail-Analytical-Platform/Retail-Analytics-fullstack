import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import overviewRoutes from "./routes/overview.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "retail-analytics-backend", timestamp: new Date() });
});

// Overview routes
app.use("/api/overview", overviewRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

