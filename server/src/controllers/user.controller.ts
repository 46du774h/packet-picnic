import type { Request, Response } from "express";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { googleClient } from "../config/google.js";
import { env } from "../config/env.js";
import { googlePayloadSchema } from "../schemas/user.schema.js";
import { File } from "../models/file.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

export const googleLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const result = googlePayloadSchema.safeParse(payload);

    if (!result.success) {
      throw new ApiError(401, "Invalid Google credential");
    }

    const googleUser = result.data;

    const email = googleUser.email.toLowerCase();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: googleUser.sub,
        name: googleUser.name || "Google User",
        email,
        picture: googleUser.picture || null,
      }); 
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            createdAt: user.createdAt,
          },
          token,
        },
        "Google login successful"
      )
    );
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          picture: req.user.picture,
          createdAt: req.user.createdAt,
        },
        "User fetched successfully"
      )
    );
  }
);

export const updateCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          createdAt: user.createdAt,
        },
        "Profile updated successfully"
      )
    );
  }
);

export const deleteCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const files = await File.find({ owner: req.user._id });
    for (const file of files) {
      await deleteFromCloudinary(
        file.cloudinaryPublicId,
        file.cloudinaryResourceType
      );
    }

    await File.deleteMany({ owner: req.user._id });
    await User.findByIdAndDelete(req.user._id);

    return res.status(200).json(
      new ApiResponse(200, null, "Account deleted successfully")
    );
  }
);