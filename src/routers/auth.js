import { Router } from "express";
import { login } from "../controllers/auth/login.js";
import { user } from "../controllers/auth/user.js";
import { new_user } from "../controllers/auth/signup.js";
import { forgot_data } from "../controllers/auth/forgot_password.js";
import { change_pssword } from "../controllers/auth/change_password.js";
import { verify } from "../controllers/auth/check_otp.js";
import path from "path"; // Import path module for resolving file paths
import { fileURLToPath } from 'url'; // Import fileURLToPath function from 'url' module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = Router();

// Serve login page HTML
router.get("/login-page", (req, res) => {
  const loginPagePath = path.join(__dirname, "../frontend/login_page.html");
  res.sendFile(loginPagePath);
});
// Handle login admin POST request
router.post("/login-admin", login);

// Handle login user POST request
router.post("/login-user", user);

router.get("/sign-up", (req, res) => {
  const loginPagePath = path.join(__dirname, "../frontend/signup.html");
  res.sendFile(loginPagePath);
});
// Handle sign-up POST request
router.post("/sign-up", new_user);

router.get("/forgot-password", (req, res) => {
  const loginPagePath = path.join(__dirname, "../frontend/forgot_password.html");
  res.sendFile(loginPagePath);
});
// Handle forgot password POST request
router.post("/forgot-password", forgot_data);

router.get("/otp_verification", (req, res) => {
  const loginPagePath = path.join(__dirname, "../frontend/forgot_otp.html");
  res.sendFile(loginPagePath);
});
// Handle OTP verification POST request
router.post("/otp_verification", verify);

// Handle change password PATCH request
router.patch("/change-password", change_pssword);

export default router;
