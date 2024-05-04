  import {Router} from "express"
import { login } from "../controllers/auth/login.js";
import { user } from "../controllers/auth/user.js";
import { new_user } from "../controllers/auth/signup.js";
import { forgot_data } from "../controllers/auth/forgot_password.js";
import { change_pssword } from "../controllers/auth/change_password.js";
import { verify } from "../controllers/auth/check_otp.js";

const router = Router()


router.post("/login-admin", login)  // To login as admin into the admin portal.

router.post("/login-user", user)   //  To login as user itno the user portal.

router.post("/sign-up", new_user)  //  To signup and create an account as a new user.

router.post("/forgot-password", forgot_data)  // To create enw password and so on.

router.post("/otp_verification", verify)  //  To verify the  otp sent.

router.patch("/change-password", change_pssword)  // To change the password of the verified user.
export default router
