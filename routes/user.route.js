import { Router } from "express";
import {
  changePassword,
  getCurrentUser,
  login,
  logoutUser,
  refreshToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImages,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(login);

// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshToken").post(verifyJWT, refreshToken);
router.route("/change-Password").post(verifyJWT, changePassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);
router
  .route("/update-user-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/update-user-cover-images")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImages);

export default router;
