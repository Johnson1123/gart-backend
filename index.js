import express from "express";
const app = express();
import cors from "cors";
import path from "path";
import flash from "connect-flash";
import session from "express-session";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import connection from "./database/db.js";
// import Property from "./model/property.js";
// import authRouter from "./route/authRoute.js";
// import fetchRouter from "./route/fetchRoute.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import User from "./model/User.js";
const __dirname = path.resolve();

dotenv.config();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(flash());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use("/api", authRouter);
// app.use("/api", fetchRouter);
// app.get("/token", (req, res) => {
//   const token = jwt.sign({ id: 7, role: "captain" }, "1123");
//   return res
//     .cookie("access_token", token, {
//       httpOnly: true,
//       secure: false,
//     })
//     .status(200)
//     .json({ message: "Logged in successfully 😊 👌" });
// });
// app.get("/logout", (req, res) => {
//   return res
//     .cookie("access_token", "", {
//       httpOnly: true,
//       expires: new Date(0),
//     })
//     .status(200)
//     .json({
//       message: "logout",
//     });
// });

// app.use("/protect", async (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (token) {
//     try {
//       const decode = jwt.verify(token, "1123");
//       req.user = await User.findId(decode.id).select("-password");
//     } catch (error) {
//       res.status(401).json({
//         message: "invalid token",
//       });
//     }
//   } else {
//     res.status(401).json({
//       message: "no token",
//     });
//   }
// });

const port = 5000;

app.use(notFound);
app.use(errorHandler);
User.sync({ alter: true });
User.sync();

connection
  .sync({ alter: true })
  .then((conn) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
