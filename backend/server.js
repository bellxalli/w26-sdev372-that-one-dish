import express from 'express';
import cors from 'cors';
import dishesRoutes from './routes/dishes.js';
import path from "path";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use('/api/dishes', dishesRoutes);

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;