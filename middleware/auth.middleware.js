import { User } from "../models/user.model";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new apiError(401, "You are not authorized to access this resource");
    }

    const deCodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(deCodeToken?._id).select(
      "-password -refreshToken "
    );
    if (!user) {
      throw new apiError(401, "You are not authorized to access this resource");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(
      401,
      error?.message || "You are not authorized to access this resource"
    );
  }
});

export { verifyJWT };
