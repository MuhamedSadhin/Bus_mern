const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/roleMiddleware");
const {
  createBus,
  getBuses,
  getBusStudents,
  registerToBus,
  getProfile,
  getAllBuses,
  singleBus,
  getUserSeats,
  getReservedSeat,
  registerStudent,
  getBookedSeatsOfUser,
} = require("../controllers/busController");

const router = express.Router();

// router.use(protect); // Protect all routes

router.post("/create", createBus); 
router.post("/:busId/register", protect, registerStudent);
router.get("/profile", protect, getProfile);
router.get("/getBookedSeat", protect, getBookedSeatsOfUser);
router.get("/getAllBus", getAllBuses);
router.get("/:id", singleBus);
router.get("/:busId/seats", getUserSeats);


//admin routes
router.get("/reserved/:busId", getReservedSeat);

module.exports = router;
