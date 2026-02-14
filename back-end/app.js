import express from "express";
import userRoutes from "./routes/userRoute.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json())
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello world !");
});

app.use("/users", userRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8787;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
