import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import clienteRoutes from "./routes/cliente.route";
import empleadoRoutes from "./routes/empleado.route";
import fiadorRoutes from "./routes/fiador.route";
import departamentoRoutes from "./routes/departamento.route";
import marcaRoutes from "./routes/marca.route";
import sucursalRoutes from "./routes/sucursal.route";
import tipoActivoRoutes from "./routes/tipo_activo.route";
import politicaRoutes from "./routes/politica.route";
import garantiaRoutes from "./routes/garantia.route";
import creditoRoutes from "./routes/credito.route";
import creditoFiadorRoutes from "./routes/credito_fiador.route";
import cuotaRoutes from "./routes/cuota.route";
import activoFijoRoutes from "./routes/activo_fijo.route";
import activoFijoBajaRoutes from "./routes/activo_fijo_baja.route";

const app = express();

// settings

app.set("port", process.env.PORT || 4000);

// middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(json());

// routes
app.use("/api/cliente", clienteRoutes);
app.use("/api/empleado", empleadoRoutes);
app.use("/api/fiador", fiadorRoutes);
app.use("/api/departamento", departamentoRoutes);
app.use("/api/marca", marcaRoutes);
app.use("/api/sucursal", sucursalRoutes);
app.use("/api/tipoactivo", tipoActivoRoutes);
app.use("/api/politica", politicaRoutes);
app.use("/api/garantia", garantiaRoutes);
app.use("/api/credito", creditoRoutes);
app.use("/api/creditofiador", creditoFiadorRoutes);
app.use("/api/cuota", cuotaRoutes);
app.use("/api/activofijo", activoFijoRoutes);
app.use("/api/activofijobaja", activoFijoBajaRoutes);

export default app;