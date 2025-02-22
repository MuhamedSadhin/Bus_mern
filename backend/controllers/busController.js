const { default: mongoose } = require("mongoose");
const Bus = require("../models/Bus");
const User = require("../models/User");

// Create a new bus
exports.createBus = async (req, res) => {
  const { busNumber, route, totalSeats, driverName, driverPhone, mainRoute  } =
    req.body;
  console.log(req.body);

  if (!busNumber || !route) {
    return res
      .status(400)
      .json({ message: "Bus number and route are required" });
  }

  try {
    // Check if the bus number already exists
    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return res.status(400).json({ message: "Bus number already exists" });
    }

    // Create and save the new bus
    const bus = new Bus({
      busNumber,
      route,
      totalSeats,
      driverName,
      driverPhone,
      mainRoute,
    });
    await bus.save();

    res.status(201).json({ message: "Bus created successfully", bus });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




exports.registerStudent = async (req, res) => {
  const { phoneNumber, placeToReach } = req.body;
  const { busId } = req.params;

  try {
    // Validate required fields
    if (!phoneNumber || !placeToReach) {
      return res
        .status(400)
        .json({ message: "Phone number and place to reach are required." });
    }

    // Ensure user ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }
    const userId = new mongoose.Types.ObjectId(req.user._id);
    console.log(userId);

    // Find the bus
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found." });
    }
    console.log(bus);

    // Check if the bus is full
    if (bus.occupiedSeats >= bus.totalSeats) {
      return res.status(400).json({ message: "Bus is full." });
    }

    // Check if user is already registered
    const isAlreadyRegistered = bus.students.some(
      (student) => student.user && student.user.equals(userId) 
    );
    console.log(isAlreadyRegistered);
    

    
    if (isAlreadyRegistered) {
      return res
        .status(400)
        .json({ message: "User is already registered to this bus." });
    }

    // Add student details
    bus.students.push({
      user: userId,
      phoneNumber: phoneNumber.trim(),
      placeToReach: placeToReach.trim(),
    });

    // Increment occupied seats
    bus.occupiedSeats += 1;

    // Save the bus with the new student
    await bus.save();

    res.status(201).json({ message: "Student registered successfully.", bus });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    // Fetch user ID from the authenticated request
    const userId = req.user._id; // Assume req.user is populated by the protect middleware

    // Fetch user data
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all buses where the user is registered
    const buses = await Bus.find({ "students.user": userId }).select(
      "busNumber route students"
    );

    // Prepare the bus registration details
    const busInfo = buses.map((bus) => {
      // Find all entries for this user in the bus's students array
      const userSeats = bus.students
        .filter((student) => student.user.toString() === userId.toString())
        .map((student) => ({
          seatNumber: student.seatNumber,
          placeToReach: student.placeToReach,
        }));

      return {
        busNumber: bus.busNumber,
        route: bus.route,
        seats: userSeats, // List of all seat numbers and places for this user on this bus
      };
    });

    // Response with user data and bus details
    res.status(200).json({
      message: "Profile fetched successfully",
      user,
      busRegistrations: busInfo.length ? busInfo : "No buses registered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.getAllBuses = async (req, res) => {
  try {
    // Fetch all buses with their details
    const buses = await Bus.find().select("-students"); // Exclude 'students' field

    // Check if buses exist
    if (!buses || buses.length === 0) {
      return res.status(404).json({ message: "No buses found" });
    }

    // Respond with the bus data
    res.status(200).json({
      message: "Buses fetched successfully",
      buses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Route to get a single bus by its ID
exports.singleBus = async (req, res) => {
  try {
    const busId = req.params.id;
    const bus = await Bus.findById(busId);
    console.log(bus);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.json(bus.route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getUserSeats = async (req, res) => {
  try {
    const { busId } = req.params;
    const loggedInUserId = req.user.id; // Assuming `req.user` contains the logged-in user's info

    // Find the bus and filter the students array
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Filter the seats for the logged-in user
    const userSeats = bus.students.filter(
      (student) => student.user.toString() === loggedInUserId
    );

    if (userSeats.length > 0) {
      return res.status(200).json({
        seats: userSeats.map(({ seatNumber, placeToReach }) => ({
          seatNumber,
          placeToReach,
        })),
      });
    } else {
      return res.status(404).json({ message: "No seats found for this user." });
    }
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ message: "Server error" });
  }
};







/////////////////////////////////////////
//admin rputes
// Route to fetch specific bus details along with registered students
exports.getReservedSeat = async (req, res) => {
  try {
    const { busId } = req.params;

    // Populate students field with user details (name, email)
    const bus = await Bus.findById(busId).populate({
      path: "students.user",
      select: "name email",
    });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json({
      busNumber: bus.busNumber,
      mainRoute: bus.mainRoute,
      totalSeats: bus.totalSeats,
      occupiedSeats: bus.occupiedSeats,
      driverName: bus.driverName,
      driverPhone: bus.driverPhone,
      route: bus.route, // Added this to return all sub-routes
      students: bus.students
        .filter((student) => student.user) // Ensure user exists
        .map((student) => ({
          name: student.user?.name || "Unknown",
          email: student.user?.email || "Unknown",
          seatNumber: student.seatNumber,
          placeToReach: student.placeToReach,
        })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getBookedSeatsOfUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = req.user.id.toString(); // Ensure it's a string
    console.log("User ID:", userId);

    // Validate userId before querying
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Convert userId to ObjectId when querying
    const buses = await Bus.find({ "students.user": userId }).populate(
      "students.user",
      "name email"
    );

    res.status(200).json(buses);
  } catch (error) {
    console.error("Error fetching booked buses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Cancel Bus Booking
exports.cancelBooking =  async (req, res) => {
  try {
    const { busId } = req.params;
    const userId = req.user.id; // Get logged-in user's ID from token

    // Find the bus and check if the student exists
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const studentIndex = bus.students.findIndex(
      (student) => student.user.toString() === userId
    );

    if (studentIndex === -1) {
      return res.status(400).json({ message: "You are not registered for this bus" });
    }

    // Remove student from the students array
    bus.students.splice(studentIndex, 1);

    // Decrease the occupied seats count
    if (bus.occupiedSeats > 0) {
      bus.occupiedSeats -= 1;
    }

    // Save the updated bus document
    await bus.save();

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateBusDetails = async (req, res) => {
   try {
     const { busId } = req.params;
     const updatedData = req.body;

     // Fetch the existing bus to retain booked students
     const existingBus = await Bus.findById(busId);
     if (!existingBus) {
       return res.status(404).json({ message: "Bus not found" });
     }

     // Preserve booked students
     updatedData.bookedStudents = existingBus.bookedStudents;

     const updatedBus = await Bus.findByIdAndUpdate(busId, updatedData, {
       new: true,
     });

     res.json({ message: "Bus details updated successfully", bus: updatedBus });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error" });
   }
};


exports.BusStatusChange = async (req, res) => {
  try {
    const { busId } = req.params;
    const { status } = req.body; // Expecting "active" or "inactive"

    // Validate the status value before updating
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedBus = await Bus.findByIdAndUpdate(
      busId,
      { status: status },
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json({ message: "Bus status updated successfully", bus: updatedBus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
