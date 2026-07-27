import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interface/user.interface";



const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: false },
    avatar: { type: String, required: false },
    role: { type: String, enum: RoleEnum, default: RoleEnum.USER },
    favorites: [{ type:Schema.Types.ObjectId, ref: "Place" }],
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    // =========================
        // MANAGER
        // =========================

        companyName: {
            type: String,
        },

        businessPhones: [
            {
                type: String,
            },
        ],

        businessAddress: {

            country: {
                type: String,
            },

            city: {
                type: String,
            },

            street: {
                type: String,
            },

            buildingNumber: {
                type: String,
            },

            zipCode: {
                type: String,
            },

            office: {
                type: String,
            },
        },

        description: {
            type: String,
        },

        website: {
            type: String,
        },


  
  },
  {
    timestamps: true,
    versionKey: false,
    },
  );

export const User = model<IUser>("User", userSchema);