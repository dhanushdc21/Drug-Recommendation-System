import { Router } from "express";
import auth from "./auth.js";
import admin from "./admin-panal.js";
import user from "./user-panal.js";

const router = Router();

router.use("/auth", auth);  // To authenticate the specific users.

router.use("/admin-panel", admin)  //  To move to the admin panel to add delete products.

router.use("/user-panel", user)  // To move to the user panel to add products.

export default router;