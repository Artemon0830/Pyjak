import { model, Schema } from "mongoose";
import { IPlace } from "../interface/place.interface";
import { StatusEnum } from "../enums/status.enum";

const addressSchema = new Schema(
  {
    country: { type: String },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    postalCode: { type: String }
  },
  { _id: false }
);

const workScheduleSchema = new Schema(
  {
    day: { type: String, required: true },
    open: { type: String, required: true },
    closed: { type: String, required: true }
  },
  { _id: false }
);



const placeSchema = new Schema<IPlace>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    address: {
      type: [addressSchema],
      required: true
    },

    phone: {
      type: String
    },

    email: {
      type: String
    },

    website: {
      type: String
    },

   _userId: { type:String, required: true, ref: "User" },

    photos: [
      {
        type: String
      }
    ],
    rating:{type:Number},

    averageCheck: {
      type: Number
    },

    tags: [
      {
        type: String
      }
    ],

    features: [
      {
        type: String
      }
    ],

    workSchedule: {
      type: [workScheduleSchema]
    },
    status:{type:String,enum: StatusEnum, default: StatusEnum.PENDING},
    rejectReason:{type:String}
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Place = model<IPlace>("Place", placeSchema);
