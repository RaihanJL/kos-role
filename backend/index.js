import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import "./scheduler/paymentReminder.js";
import "./scheduler/generatePayments.js";
import rulesRoute from "./routes/RulesRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto", // Set to true if using HTTPS
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.185.29:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(PaymentRoute);
app.use(rulesRoute);
// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running...`);
});
