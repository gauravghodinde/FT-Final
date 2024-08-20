import { Schema, model } from "mongoose";

const pendingActionSchema = new Schema(
  {
   
    repairRequestId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "RepairRequest",
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
    comment: {
        type: String,
    },
    response: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PendingAction = model("PendingAction", pendingActionSchema);

