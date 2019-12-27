import express, { json } from "express";
import morgan from "morgan";
import clienteRoutes from "./routes/cliente.route";

const app = express();

// settings

app.set("port", process.env.PORT || 4000);

// middlewares

app.use(morgan("dev"));
app.use(json());

// routes
app.use("/api/cliente", clienteRoutes);

export default app;