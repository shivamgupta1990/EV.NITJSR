import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    paymentStatus: {
      type: String,
      default: "paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
