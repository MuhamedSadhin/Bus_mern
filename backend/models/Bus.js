const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  mainRoute: { type: String },
  route: [
    {
      name: { type: String, required: true }, // Name of the sub-stop
      price: { type: Number },
      time: { type: String},
    },
  ],
  totalSeats: { type: Number, default: 50 },
  occupiedSeats: { type: Number, default: 0 },
  driverName: { type: String },
  driverPhone: { type: String },
  students: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }, // Reference to User

      phoneNumber: { type: String },
      placeToReach: { type: String, required: true },
    },
  ],
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});


module.exports = mongoose.model("Bus", busSchema);
