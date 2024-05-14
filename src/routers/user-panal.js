import { Router } from "express";
import path from "path"; // Import path module for resolving file paths
import { fileURLToPath } from 'url'; // Import fileURLToPath function from 'url' module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = Router();

router.get("/welcome", (req, res) => {
    const welcome = path.join(__dirname, "../frontend/drug_front.html");
    res.sendFile(welcome);
  });

export default router;
