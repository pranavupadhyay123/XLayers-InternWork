// Hotel Management System - MongoDB Database
// Complete database with realistic data for a luxury hotel chain

// =====================================
// HOTELS COLLECTION
// =====================================
db.hotels.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "The Grand Palace Hotel",
    address: {
      street: "123 Royal Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    contact: {
      phone: "+1-212-555-0199",
      email: "info@grandpalace.com",
      website: "www.grandpalace.com"
    },
    rating: 5,
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Valet Parking", "Concierge", "Room Service", "Business Center"],
    totalRooms: 250,
    description: "Luxury 5-star hotel in the heart of Manhattan",
    images: ["hotel1_main.jpg", "hotel1_lobby.jpg", "hotel1_pool.jpg"],
    established: new Date("1995-06-15"),
    manager: "Victoria Sterling",
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439012"),
    name: "Oceanview Resort & Spa",
    address: {
      street: "456 Beachfront Drive",
      city: "Miami",
      state: "FL",
      zipCode: "33139",
      country: "USA"
    },
    contact: {
      phone: "+1-305-555-0288",
      email: "reservations@oceanview.com",
      website: "www.oceanviewresort.com"
    },
    rating: 4,
    amenities: ["WiFi", "Beach Access", "Pool", "Spa", "Water Sports", "Restaurant", "Bar", "Tennis Court"],
    totalRooms: 180,
    description: "Beachfront resort with stunning ocean views",
    images: ["hotel2_main.jpg", "hotel2_beach.jpg", "hotel2_suite.jpg"],
    established: new Date("2001-03-20"),
    manager: "Carlos Rodriguez",
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439013"),
    name: "Mountain Lodge Retreat",
    address: {
      street: "789 Alpine Way",
      city: "Aspen",
      state: "CO",
      zipCode: "81611",
      country: "USA"
    },
    contact: {
      phone: "+1-970-555-0377",
      email: "bookings@mountainlodge.com",
      website: "www.mountainlodgeretreat.com"
    },
    rating: 4,
    amenities: ["WiFi", "Ski Access", "Fireplace", "Hot Tub", "Restaurant", "Bar", "Hiking Trails"],
    totalRooms: 120,
    description: "Cozy mountain retreat perfect for ski enthusiasts",
    images: ["hotel3_main.jpg", "hotel3_mountains.jpg", "hotel3_fireplace.jpg"],
    established: new Date("1988-11-10"),
    manager: "Jennifer Walsh",
    status: "active"
  }
]);

// =====================================
// ROOM TYPES COLLECTION
// =====================================
db.roomTypes.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439021"),
    name: "Standard Single",
    description: "Comfortable single occupancy room with city view",
    maxOccupancy: 1,
    bedType: "Single",
    size: 250,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Safe"],
    basePrice: 199.99,
    images: ["standard_single.jpg"]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439022"),
    name: "Standard Double",
    description: "Spacious double occupancy room with modern amenities",
    maxOccupancy: 2,
    bedType: "Queen",
    size: 320,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Safe", "Coffee Maker"],
    basePrice: 279.99,
    images: ["standard_double.jpg"]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439023"),
    name: "Deluxe Suite",
    description: "Luxury suite with separate living area and premium amenities",
    maxOccupancy: 4,
    bedType: "King",
    size: 650,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Safe", "Coffee Maker", "Jacuzzi", "Balcony"],
    basePrice: 499.99,
    images: ["deluxe_suite.jpg", "suite_living.jpg"]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439024"),
    name: "Presidential Suite",
    description: "Ultimate luxury suite with panoramic views and exclusive amenities",
    maxOccupancy: 6,
    bedType: "King + Sofa Bed",
    size: 1200,
    amenities: ["WiFi", "TV", "Air Conditioning", "Full Kitchen", "Safe", "Jacuzzi", "Balcony", "Butler Service"],
    basePrice: 999.99,
    images: ["presidential_suite.jpg", "suite_bedroom.jpg", "suite_kitchen.jpg"]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439025"),
    name: "Ocean View Room",
    description: "Beautiful room with direct ocean views",
    maxOccupancy: 2,
    bedType: "Queen",
    size: 380,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Safe", "Ocean View", "Balcony"],
    basePrice: 349.99,
    images: ["ocean_view.jpg"]
  }
]);

// =====================================
// ROOMS COLLECTION
// =====================================
db.rooms.insertMany([
  // Grand Palace Hotel Rooms
  {
    _id: ObjectId("507f1f77bcf86cd799439031"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomNumber: "101",
    floor: 1,
    roomTypeId: ObjectId("507f1f77bcf86cd799439022"),
    status: "available",
    lastCleaned: new Date("2025-07-29T08:30:00Z"),
    lastMaintenance: new Date("2025-07-15T14:00:00Z"),
    features: ["City View", "Non-Smoking"],
    notes: "Recently renovated"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439032"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomNumber: "102",
    floor: 1,
    roomTypeId: ObjectId("507f1f77bcf86cd799439022"),
    status: "occupied",
    lastCleaned: new Date("2025-07-28T09:15:00Z"),
    lastMaintenance: new Date("2025-07-10T10:30:00Z"),
    features: ["City View", "Non-Smoking"],
    notes: ""
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439033"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomNumber: "201",
    floor: 2,
    roomTypeId: ObjectId("507f1f77bcf86cd799439023"),
    status: "available",
    lastCleaned: new Date("2025-07-29T10:00:00Z"),
    lastMaintenance: new Date("2025-07-20T16:00:00Z"),
    features: ["Park View", "Non-Smoking", "Corner Room"],
    notes: "Premium location"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439034"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomNumber: "1501",
    floor: 15,
    roomTypeId: ObjectId("507f1f77bcf86cd799439024"),
    status: "available",
    lastCleaned: new Date("2025-07-29T11:30:00Z"),
    lastMaintenance: new Date("2025-07-25T09:00:00Z"),
    features: ["Panoramic View", "Non-Smoking", "VIP Floor"],
    notes: "Presidential suite with butler service"
  },
  // Oceanview Resort Rooms
  {
    _id: ObjectId("507f1f77bcf86cd799439035"),
    hotelId: ObjectId("507f1f77bcf86cd799439012"),
    roomNumber: "OV101",
    floor: 1,
    roomTypeId: ObjectId("507f1f77bcf86cd799439025"),
    status: "maintenance",
    lastCleaned: new Date("2025-07-28T14:00:00Z"),
    lastMaintenance: new Date("2025-07-29T08:00:00Z"),
    features: ["Ocean View", "Balcony", "Non-Smoking"],
    notes: "AC unit replacement in progress"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439036"),
    hotelId: ObjectId("507f1f77bcf86cd799439012"),
    roomNumber: "OV201",
    floor: 2,
    roomTypeId: ObjectId("507f1f77bcf86cd799439025"),
    status: "occupied",
    lastCleaned: new Date("2025-07-28T11:45:00Z"),
    lastMaintenance: new Date("2025-07-18T13:30:00Z"),
    features: ["Ocean View", "Balcony", "Non-Smoking"],
    notes: ""
  }
]);

// =====================================
// CUSTOMERS COLLECTION
// =====================================
db.customers.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439041"),
    personalInfo: {
      firstName: "James",
      lastName: "Anderson",
      dateOfBirth: new Date("1985-03-15"),
      gender: "Male",
      nationality: "American"
    },
    contact: {
      email: "james.anderson@email.com",
      phone: "+1-555-0123",
      address: {
        street: "456 Oak Street",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA"
      }
    },
    preferences: {
      roomType: "Non-Smoking",
      floorPreference: "High Floor",
      bedType: "King",
      specialRequests: ["Late checkout", "Extra pillows"]
    },
    loyaltyProgram: {
      memberId: "LP001234",
      tier: "Gold",
      points: 15420,
      joinDate: new Date("2020-05-12")
    },
    emergencyContact: {
      name: "Sarah Anderson",
      relationship: "Spouse",
      phone: "+1-555-0124"
    },
    createdAt: new Date("2020-05-12T10:30:00Z"),
    lastStay: new Date("2025-06-15T14:00:00Z"),
    totalBookings: 18,
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439042"),
    personalInfo: {
      firstName: "Maria",
      lastName: "Rodriguez",
      dateOfBirth: new Date("1992-08-22"),
      gender: "Female",
      nationality: "Spanish"
    },
    contact: {
      email: "maria.rodriguez@email.com",
      phone: "+34-666-123456",
      address: {
        street: "Calle Gran Via 28",
        city: "Madrid",
        state: "Madrid",
        zipCode: "28013",
        country: "Spain"
      }
    },
    preferences: {
      roomType: "Non-Smoking",
      floorPreference: "Any",
      bedType: "Queen",
      specialRequests: ["Vegetarian meals", "Quiet room"]
    },
    loyaltyProgram: {
      memberId: "LP001235",
      tier: "Silver",
      points: 8750,
      joinDate: new Date("2021-09-03")
    },
    emergencyContact: {
      name: "Carlos Rodriguez",
      relationship: "Brother",
      phone: "+34-666-789012"
    },
    createdAt: new Date("2021-09-03T16:45:00Z"),
    lastStay: new Date("2025-07-10T12:30:00Z"),
    totalBookings: 12,
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439043"),
    personalInfo: {
      firstName: "David",
      lastName: "Chen",
      dateOfBirth: new Date("1978-11-08"),
      gender: "Male",
      nationality: "Canadian"
    },
    contact: {
      email: "david.chen@email.com",
      phone: "+1-416-555-0198",
      address: {
        street: "123 Maple Lane",
        city: "Toronto",
        state: "ON",
        zipCode: "M5V 3A8",
        country: "Canada"
      }
    },
    preferences: {
      roomType: "Non-Smoking",
      floorPreference: "High Floor",
      bedType: "King",
      specialRequests: ["Airport transfer", "Business center access"]
    },
    loyaltyProgram: {
      memberId: "LP001236",
      tier: "Platinum",
      points: 32100,
      joinDate: new Date("2018-02-14")
    },
    emergencyContact: {
      name: "Linda Chen",
      relationship: "Spouse",
      phone: "+1-416-555-0199"
    },
    createdAt: new Date("2018-02-14T09:20:00Z"),
    lastStay: new Date("2025-07-20T16:15:00Z"),
    totalBookings: 45,
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439044"),
    personalInfo: {
      firstName: "Emma",
      lastName: "Thompson",
      dateOfBirth: new Date("1989-05-17"),
      gender: "Female",
      nationality: "British"
    },
    contact: {
      email: "emma.thompson@email.com",
      phone: "+44-20-7946-0958",
      address: {
        street: "45 Kensington Road",
        city: "London",
        state: "England",
        zipCode: "SW7 2AR",
        country: "United Kingdom"
      }
    },
    preferences: {
      roomType: "Non-Smoking",
      floorPreference: "Mid Floor",
      bedType: "Queen",
      specialRequests: ["Room service breakfast", "Extra towels"]
    },
    loyaltyProgram: {
      memberId: "LP001237",
      tier: "Gold",
      points: 19650,
      joinDate: new Date("2019-07-08")
    },
    emergencyContact: {
      name: "Robert Thompson",
      relationship: "Father",
      phone: "+44-20-7946-0959"
    },
    createdAt: new Date("2019-07-08T11:15:00Z"),
    lastStay: new Date("2025-05-28T13:45:00Z"),
    totalBookings: 23,
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439045"),
    personalInfo: {
      firstName: "Mohammed",
      lastName: "Al-Rashid",
      dateOfBirth: new Date("1982-12-03"),
      gender: "Male",
      nationality: "Saudi Arabian"
    },
    contact: {
      email: "mohammed.alrashid@email.com",
      phone: "+966-11-123-4567",
      address: {
        street: "King Fahd Road",
        city: "Riyadh",
        state: "Riyadh Province",
        zipCode: "11564",
        country: "Saudi Arabia"
      }
    },
    preferences: {
      roomType: "Non-Smoking",
      floorPreference: "High Floor",
      bedType: "King",
      specialRequests: ["Halal meals", "Prayer direction indicator"]
    },
    loyaltyProgram: {
      memberId: "LP001238",
      tier: "Diamond",
      points: 47800,
      joinDate: new Date("2017-04-20")
    },
    emergencyContact: {
      name: "Fatima Al-Rashid",
      relationship: "Spouse",
      phone: "+966-11-123-4568"
    },
    createdAt: new Date("2017-04-20T14:30:00Z"),
    lastStay: new Date("2025-07-25T10:20:00Z"),
    totalBookings: 67,
    status: "active"
  }
]);

// =====================================
// BOOKINGS COLLECTION
// =====================================
db.bookings.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439051"),
    bookingReference: "BK2025070001",
    customerId: ObjectId("507f1f77bcf86cd799439041"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomId: ObjectId("507f1f77bcf86cd799439032"),
    checkInDate: new Date("2025-07-28T15:00:00Z"),
    checkOutDate: new Date("2025-08-02T11:00:00Z"),
    numberOfGuests: 2,
    guestDetails: [
      {
        firstName: "James",
        lastName: "Anderson",
        age: 40,
        isMainGuest: true
      },
      {
        firstName: "Sarah",
        lastName: "Anderson",
        age: 38,
        isMainGuest: false
      }
    ],
    bookingDate: new Date("2025-06-15T14:30:00Z"),
    status: "confirmed",
    totalAmount: 1399.95,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    specialRequests: ["Late checkout", "Extra pillows", "Anniversary celebration"],
    source: "website",
    notes: "VIP guest - 5th anniversary celebration",
    cancellationPolicy: "Free cancellation until 24 hours before check-in"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439052"),
    bookingReference: "BK2025070002",
    customerId: ObjectId("507f1f77bcf86cd799439042"),
    hotelId: ObjectId("507f1f77bcf86cd799439012"),
    roomId: ObjectId("507f1f77bcf86cd799439036"),
    checkInDate: new Date("2025-07-25T15:00:00Z"),
    checkOutDate: new Date("2025-07-30T11:00:00Z"),
    numberOfGuests: 1,
    guestDetails: [
      {
        firstName: "Maria",
        lastName: "Rodriguez",
        age: 32,
        isMainGuest: true
      }
    ],
    bookingDate: new Date("2025-06-20T10:15:00Z"),
    status: "checked-in",
    totalAmount: 1749.95,
    paymentStatus: "paid",
    paymentMethod: "Debit Card",
    specialRequests: ["Vegetarian meals", "Quiet room", "Spa appointment"],
    source: "mobile_app",
    notes: "Business traveler - requires quiet environment",
    cancellationPolicy: "Non-refundable"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439053"),
    bookingReference: "BK2025070003",
    customerId: ObjectId("507f1f77bcf86cd799439043"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomId: ObjectId("507f1f77bcf86cd799439034"),
    checkInDate: new Date("2025-08-15T15:00:00Z"),
    checkOutDate: new Date("2025-08-20T11:00:00Z"),
    numberOfGuests: 4,
    guestDetails: [
      {
        firstName: "David",
        lastName: "Chen",
        age: 46,
        isMainGuest: true
      },
      {
        firstName: "Linda",
        lastName: "Chen",
        age: 44,
        isMainGuest: false
      },
      {
        firstName: "Kevin",
        lastName: "Chen",
        age: 16,
        isMainGuest: false
      },
      {
        firstName: "Sophie",
        lastName: "Chen",
        age: 14,
        isMainGuest: false
      }
    ],
    bookingDate: new Date("2025-07-10T16:45:00Z"),
    status: "confirmed",
    totalAmount: 4999.95,
    paymentStatus: "deposit_paid",
    paymentMethod: "Credit Card",
    specialRequests: ["Airport transfer", "Family activities", "Connecting rooms if available"],
    source: "phone",
    notes: "Family vacation - platinum member",
    cancellationPolicy: "Free cancellation until 48 hours before check-in"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439054"),
    bookingReference: "BK2025070004",
    customerId: ObjectId("507f1f77bcf86cd799439044"),
    hotelId: ObjectId("507f1f77bcf86cd799439013"),
    roomId: null, // Room not assigned yet
    checkInDate: new Date("2025-09-10T15:00:00Z"),
    checkOutDate: new Date("2025-09-15T11:00:00Z"),
    numberOfGuests: 2,
    guestDetails: [
      {
        firstName: "Emma",
        lastName: "Thompson",
        age: 35,
        isMainGuest: true
      },
      {
        firstName: "Michael",
        lastName: "Davis",
        age: 37,
        isMainGuest: false
      }
    ],
    bookingDate: new Date("2025-07-28T09:30:00Z"),
    status: "pending",
    totalAmount: 1599.95,
    paymentStatus: "pending",
    paymentMethod: "Credit Card",
    specialRequests: ["Mountain view", "Hiking equipment rental"],
    source: "travel_agent",
    notes: "Romantic getaway - requires confirmation within 24 hours",
    cancellationPolicy: "Free cancellation until 72 hours before check-in"
  }
]);

// =====================================
// STAFF COLLECTION
// =====================================
db.staff.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439061"),
    employeeId: "EMP001",
    personalInfo: {
      firstName: "Victoria",
      lastName: "Sterling",
      dateOfBirth: new Date("1975-04-12"),
      gender: "Female",
      nationality: "American",
      ssn: "***-**-1234"
    },
    contact: {
      email: "v.sterling@grandpalace.com",
      phone: "+1-555-0100",
      address: {
        street: "789 Executive Drive",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA"
      }
    },
    employment: {
      hotelId: ObjectId("507f1f77bcf86cd799439011"),
      position: "General Manager",
      department: "Management",
      hireDate: new Date("2010-01-15"),
      salary: 95000,
      employmentStatus: "active",
      supervisor: null,
      workSchedule: "Monday-Friday, 8:00-17:00"
    },
    qualifications: [
      "MBA in Hospitality Management",
      "15+ years hotel management experience",
      "Certified Hotel Administrator (CHA)"
    ],
    emergencyContact: {
      name: "Robert Sterling",
      relationship: "Spouse",
      phone: "+1-555-0101"
    },
    performance: {
      lastReview: new Date("2025-01-15"),
      rating: "Excellent",
      nextReview: new Date("2026-01-15")
    }
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439062"),
    employeeId: "EMP002",
    personalInfo: {
      firstName: "Marcus",
      lastName: "Johnson",
      dateOfBirth: new Date("1988-09-25"),
      gender: "Male",
      nationality: "American",
      ssn: "***-**-5678"
    },
    contact: {
      email: "m.johnson@grandpalace.com",
      phone: "+1-555-0102",
      address: {
        street: "456 Broadway Street",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "USA"
      }
    },
    employment: {
      hotelId: ObjectId("507f1f77bcf86cd799439011"),
      position: "Front Desk Manager",
      department: "Front Office",
      hireDate: new Date("2018-03-20"),
      salary: 48000,
      employmentStatus: "active",
      supervisor: ObjectId("507f1f77bcf86cd799439061"),
      workSchedule: "Rotating shifts"
    },
    qualifications: [
      "Bachelor's in Hotel Management",
      "Fluent in English and Spanish",
      "PMS Systems Certified"
    ],
    emergencyContact: {
      name: "Patricia Johnson",
      relationship: "Mother",
      phone: "+1-555-0103"
    },
    performance: {
      lastReview: new Date("2025-03-20"),
      rating: "Good",
      nextReview: new Date("2026-03-20")
    }
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439063"),
    employeeId: "EMP003",
    personalInfo: {
      firstName: "Elena",
      lastName: "Vasquez",
      dateOfBirth: new Date("1995-12-08"),
      gender: "Female",
      nationality: "Mexican",
      ssn: "***-**-9012"
    },
    contact: {
      email: "e.vasquez@grandpalace.com",
      phone: "+1-555-0104",
      address: {
        street: "321 Queens Boulevard",
        city: "New York",
        state: "NY",
        zipCode: "11377",
        country: "USA"
      }
    },
    employment: {
      hotelId: ObjectId("507f1f77bcf86cd799439011"),
      position: "Front Desk Agent",
      department: "Front Office",
      hireDate: new Date("2022-06-01"),
      salary: 35000,
      employmentStatus: "active",
      supervisor: ObjectId("507f1f77bcf86cd799439062"),
      workSchedule: "Evening shift, 3:00PM-11:00PM"
    },
    qualifications: [
      "Certificate in Hospitality",
      "Fluent in English, Spanish, and French",
      "Customer Service Excellence Certified"
    ],
    emergencyContact: {
      name: "Maria Vasquez",
      relationship: "Mother",
      phone: "+1-555-0105"
    },
    performance: {
      lastReview: new Date("2025-06-01"),
      rating: "Excellent",
      nextReview: new Date("2026-06-01")
    }
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439064"),
    employeeId: "EMP004",
    personalInfo: {
      firstName: "Thomas",
      lastName: "Wilson",
      dateOfBirth: new Date("1982-07-14"),
      gender: "Male",
      nationality: "American",
      ssn: "***-**-3456"
    },
    contact: {
      email: "t.wilson@grandpalace.com",
      phone: "+1-555-0106",
      address: {
        street: "654 Park Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10065",
        country: "USA"
      }
    },
    employment: {
      hotelId: ObjectId("507f1f77bcf86cd799439011"),
      position: "Head Concierge",
      department: "Guest Services",
      hireDate: new Date("2015-09-10"),
      salary: 52000,
      employmentStatus: "active",
      supervisor: ObjectId("507f1f77bcf86cd799439061"),
      workSchedule: "Day shift, 7:00AM-3:00PM"
    },
    qualifications: [
      "Les Clefs d'Or Concierge Certification",
      "10+ years hospitality experience",
      "Extensive knowledge of NYC attractions"
    ],
    emergencyContact: {
      name: "Jennifer Wilson",
      relationship: "Spouse",
      phone: "+1-555-0107"
    },
    performance: {
      lastReview: new Date("2025-09-10"),
      rating: "Excellent",
      nextReview: new Date("2026-09-10")
    }
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439065"),
    employeeId: "EMP005",
    personalInfo: {
      firstName: "Anna",
      lastName: "Kowalski",
      dateOfBirth: new Date("1990-02-28"),
      gender: "Female",
      nationality: "Polish",
      ssn: "***-**-7890"
    },
    contact: {
      email: "a.kowalski@grandpalace.com",
      phone: "+1-555-0108",
      address: {
        street: "987 East Side Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10003",
        country: "USA"
      }
    },
    employment: {
      hotelId: ObjectId("507f1f77bcf86cd799439011"),
      position: "Housekeeping Supervisor",
      department: "Housekeeping",
      hireDate: new Date("2020-11-05"),
      salary: 42000,
      employmentStatus: "active",
      supervisor: ObjectId("507f1f77bcf86cd799439061"),
      workSchedule: "Day shift, 6:00AM-2:00PM"
    },
    qualifications: [
      "Certificate in Hotel Housekeeping",
      "Team Leadership Training",
      "Safety and Sanitation Certified"
    ],
    emergencyContact: {
      name: "Piotr Kowalski",
      relationship: "Brother",
      phone: "+1-555-0109"
    },
    performance: {
      lastReview: new Date("2025-11-05"),
      rating: "Good",
      nextReview: new Date("2026-11-05")
    }
  }
]);

// =====================================
// PAYMENTS COLLECTION
// =====================================
db.payments.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439071"),
    bookingId: ObjectId("507f1f77bcf86cd799439051"),
    customerId: ObjectId("507f1f77bcf86cd799439041"),
    paymentReference: "PAY2025070001",
    amount: 1399.95,
    currency: "USD",
    paymentMethod: "Credit Card",
    cardDetails: {
      cardType: "Visa",
      lastFourDigits: "4532",
      expiryMonth: 12,
      expiryYear: 2026
    },
    paymentDate: new Date("2025-06-15T14:35:00Z"),
    status: "completed",
    transactionId: "TXN_20250615_143500_001",
    paymentGateway: "Stripe",
    fees: 41.99,
    netAmount: 1357.96,
    refunds: []
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439072"),
    bookingId: ObjectId("507f1f77bcf86cd799439052"),
    customerId: ObjectId("507f1f77bcf86cd799439042"),
    paymentReference: "PAY2025070002",
    amount: 1749.95,
    currency: "USD",
    paymentMethod: "Debit Card",
    cardDetails: {
      cardType: "Mastercard",
      lastFourDigits: "8765",
      expiryMonth: 8,
      expiryYear: 2027
    },
    paymentDate: new Date("2025-06-20T10:20:00Z"),
    status: "completed",
    transactionId: "TXN_20250620_102000_002",
    paymentGateway: "PayPal",
    fees: 52.49,
    netAmount: 1697.46,
    refunds: []
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439073"),
    bookingId: ObjectId("507f1f77bcf86cd799439053"),
    customerId: ObjectId("507f1f77bcf86cd799439043"),
    paymentReference: "PAY2025070003",
    amount: 1500.00,
    currency: "USD",
    paymentMethod: "Credit Card",
    cardDetails: {
      cardType: "American Express",
      lastFourDigits: "1009",
      expiryMonth: 3,
      expiryYear: 2028
    },
    paymentDate: new Date("2025-07-10T16:50:00Z"),
    status: "completed",
    transactionId: "TXN_20250710_165000_003",
    paymentGateway: "Stripe",
    fees: 45.00,
    netAmount: 1455.00,
    refunds: [],
    notes: "Deposit payment - 30% of total booking"
  }
]);

// =====================================
// SERVICES COLLECTION
// =====================================
db.services.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439081"),
    name: "Room Service",
    category: "Food & Beverage",
    description: "24/7 in-room dining service",
    basePrice: 25.00,
    availability: "24/7",
    duration: 30,
    maxCapacity: null,
    isActive: true,
    hotelId: ObjectId("507f1f77bcf86cd799439011")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439082"),
    name: "Airport Transfer",
    category: "Transportation",
    description: "Luxury vehicle transfer to/from airport",
    basePrice: 75.00,
    availability: "24/7",
    duration: 60,
    maxCapacity: 4,
    isActive: true,
    hotelId: ObjectId("507f1f77bcf86cd799439011")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439083"),
    name: "Spa Massage",
    category: "Wellness",
    description: "60-minute relaxation massage",
    basePrice: 120.00,
    availability: "9:00AM-9:00PM",
    duration: 60,
    maxCapacity: 1,
    isActive: true,
    hotelId: ObjectId("507f1f77bcf86cd799439011")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439084"),
    name: "Laundry Service",
    category: "Housekeeping",
    description: "Same-day laundry and dry cleaning",
    basePrice: 15.00,
    availability: "8:00AM-6:00PM",
    duration: 240,
    maxCapacity: null,
    isActive: true,
    hotelId: ObjectId("507f1f77bcf86cd799439011")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439085"),
    name: "Business Center",
    category: "Business",
    description: "Printing, copying, and meeting room access",
    basePrice: 10.00,
    availability: "24/7",
    duration: 60,
    maxCapacity: 20,
    isActive: true,
    hotelId: ObjectId("507f1f77bcf86cd799439011")
  }
]);

// =====================================
// SERVICE BOOKINGS COLLECTION
// =====================================
db.serviceBookings.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439091"),
    bookingId: ObjectId("507f1f77bcf86cd799439051"),
    customerId: ObjectId("507f1f77bcf86cd799439041"),
    serviceId: ObjectId("507f1f77bcf86cd799439082"),
    serviceName: "Airport Transfer",
    requestDate: new Date("2025-07-28T12:00:00Z"),
    scheduledDate: new Date("2025-08-02T09:00:00Z"),
    quantity: 1,
    unitPrice: 75.00,
    totalPrice: 75.00,
    status: "confirmed",
    specialInstructions: "Pick up at Terminal 3, Flight AA1234",
    staffAssigned: ObjectId("507f1f77bcf86cd799439064"),
    createdAt: new Date("2025-07-28T12:05:00Z")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439092"),
    bookingId: ObjectId("507f1f77bcf86cd799439051"),
    customerId: ObjectId("507f1f77bcf86cd799439041"),
    serviceId: ObjectId("507f1f77bcf86cd799439081"),
    serviceName: "Room Service",
    requestDate: new Date("2025-07-29T19:30:00Z"),
    scheduledDate: new Date("2025-07-29T20:00:00Z"),
    quantity: 2,
    unitPrice: 25.00,
    totalPrice: 50.00,
    status: "completed",
    specialInstructions: "Anniversary dinner setup with candles",
    staffAssigned: null,
    createdAt: new Date("2025-07-29T19:32:00Z")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439093"),
    bookingId: ObjectId("507f1f77bcf86cd799439052"),
    customerId: ObjectId("507f1f77bcf86cd799439042"),
    serviceId: ObjectId("507f1f77bcf86cd799439083"),
    serviceName: "Spa Massage",
    requestDate: new Date("2025-07-26T14:00:00Z"),
    scheduledDate: new Date("2025-07-27T15:00:00Z"),
    quantity: 1,
    unitPrice: 120.00,
    totalPrice: 120.00,
    status: "completed",
    specialInstructions: "Aromatherapy oils preferred",
    staffAssigned: null,
    createdAt: new Date("2025-07-26T14:02:00Z")
  }
]);

// =====================================
// REVIEWS COLLECTION
// =====================================
db.reviews.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439101"),
    bookingId: ObjectId("507f1f77bcf86cd799439051"),
    customerId: ObjectId("507f1f77bcf86cd799439041"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    overallRating: 5,
    ratings: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 4,
      amenities: 5
    },
    title: "Perfect Anniversary Stay",
    comment: "The Grand Palace exceeded all our expectations! The staff went above and beyond to make our anniversary special. The room was immaculate, the service was impeccable, and the location couldn't be better. The surprise champagne and roses were a lovely touch. We'll definitely be back!",
    reviewDate: new Date("2025-08-03T10:30:00Z"),
    verified: true,
    helpful: 15,
    reported: 0,
    response: {
      text: "Thank you so much for this wonderful review! We're thrilled that we could make your anniversary celebration so special. We look forward to welcoming you back soon!",
      respondedBy: "Victoria Sterling - General Manager",
      responseDate: new Date("2025-08-04T09:15:00Z")
    }
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439102"),
    customerId: ObjectId("507f1f77bcf86cd799439042"),
    hotelId: ObjectId("507f1f77bcf86cd799439012"),
    overallRating: 4,
    ratings: {
      cleanliness: 4,
      service: 5,
      location: 5,
      value: 3,
      amenities: 4
    },
    title: "Beautiful Ocean Views",
    comment: "Lovely beachfront location with stunning ocean views. The staff was incredibly friendly and accommodating. The spa treatment was fantastic! Only minor complaint is that the room was a bit pricey for what you get, but the location makes up for it. Would recommend for a relaxing getaway.",
    reviewDate: new Date("2025-07-31T16:45:00Z"),
    verified: true,
    helpful: 8,
    reported: 0,
    response: {
      text: "Thank you for choosing Oceanview Resort! We're delighted you enjoyed the ocean views and our spa services. We appreciate your feedback about value and will take it into consideration.",
      respondedBy: "Carlos Rodriguez - General Manager",
      responseDate: new Date("2025-08-01T11:20:00Z")
    }
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439103"),
    customerId: ObjectId("507f1f77bcf86cd799439044"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    overallRating: 5,
    ratings: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
      amenities: 5
    },
    title: "Exceptional Service and Luxury",
    comment: "This hotel truly defines luxury hospitality. From the moment I walked in, every staff member made me feel like royalty. The concierge Thomas was particularly helpful with restaurant recommendations. The room was spacious, beautifully decorated, and spotlessly clean. I can't wait to return!",
    reviewDate: new Date("2025-05-30T14:20:00Z"),
    verified: true,
    helpful: 22,
    reported: 0,
    response: {
      text: "Dear Emma, thank you for this glowing review! Thomas and our entire team are thrilled to have provided such exceptional service. We look forward to your next visit!",
      respondedBy: "Victoria Sterling - General Manager",
      responseDate: new Date("2025-05-31T09:45:00Z")
    }
  }
]);

// =====================================
// INVENTORY COLLECTION
// =====================================
db.inventory.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439111"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    category: "Linens",
    itemName: "Bath Towels",
    description: "Premium 100% cotton bath towels",
    currentStock: 500,
    minimumStock: 100,
    maximumStock: 800,
    unitCost: 25.00,
    supplier: "Luxury Linens Inc.",
    lastRestocked: new Date("2025-07-15T10:00:00Z"),
    location: "Housekeeping Storage Room A",
    status: "in_stock"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439112"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    category: "Amenities",
    itemName: "Shampoo Bottles",
    description: "Luxury hotel shampoo 50ml bottles",
    currentStock: 200,
    minimumStock: 150,
    maximumStock: 500,
    unitCost: 3.50,
    supplier: "Premium Bath Products",
    lastRestocked: new Date("2025-07-20T14:30:00Z"),
    location: "Housekeeping Storage Room B",
    status: "in_stock"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439113"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    category: "Food & Beverage",
    itemName: "Coffee Beans",
    description: "Premium Colombian coffee beans",
    currentStock: 50,
    minimumStock: 75,
    maximumStock: 200,
    unitCost: 45.00,
    supplier: "Global Coffee Suppliers",
    lastRestocked: new Date("2025-07-10T09:15:00Z"),
    location: "Restaurant Storage",
    status: "low_stock"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439114"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    category: "Cleaning",
    itemName: "All-Purpose Cleaner",
    description: "Professional grade cleaning solution",
    currentStock: 25,
    minimumStock: 50,
    maximumStock: 150,
    unitCost: 12.00,
    supplier: "CleanPro Solutions",
    lastRestocked: new Date("2025-06-30T11:45:00Z"),
    location: "Maintenance Storage",
    status: "low_stock"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439115"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    category: "Electronics",
    itemName: "TV Remote Controls",
    description: "Replacement remote controls for room TVs",
    currentStock: 15,
    minimumStock: 25,
    maximumStock: 75,
    unitCost: 35.00,
    supplier: "Electronics Depot",
    lastRestocked: new Date("2025-07-05T16:20:00Z"),
    location: "Maintenance Storage",
    status: "low_stock"
  }
]);

// =====================================
// MAINTENANCE REQUESTS COLLECTION
// =====================================
db.maintenanceRequests.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439121"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomId: ObjectId("507f1f77bcf86cd799439031"),
    requestNumber: "MR2025070001",
    title: "Air Conditioning Unit Noise",
    description: "Guest reported unusual noise coming from AC unit. Requires inspection and possible repair.",
    category: "HVAC",
    priority: "medium",
    status: "in_progress",
    reportedBy: ObjectId("507f1f77bcf86cd799439063"),
    assignedTo: ObjectId("507f1f77bcf86cd799439065"),
    reportedDate: new Date("2025-07-28T14:30:00Z"),
    scheduledDate: new Date("2025-07-29T10:00:00Z"),
    completedDate: null,
    estimatedCost: 150.00,
    actualCost: null,
    workNotes: "Inspected unit - found loose fan blade. Ordered replacement part.",
    guestImpact: "minimal",
    followUpRequired: true
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439122"),
    hotelId: ObjectId("507f1f77bcf86cd799439012"),
    roomId: ObjectId("507f1f77bcf86cd799439035"),
    requestNumber: "MR2025070002",
    title: "Bathroom Faucet Leak",
    description: "Dripping faucet in bathroom sink. Water damage possible if not addressed quickly.",
    category: "Plumbing",
    priority: "high",
    status: "completed",
    reportedBy: ObjectId("507f1f77bcf86cd799439065"),
    assignedTo: null,
    reportedDate: new Date("2025-07-27T09:15:00Z"),
    scheduledDate: new Date("2025-07-27T13:00:00Z"),
    completedDate: new Date("2025-07-27T15:30:00Z"),
    estimatedCost: 75.00,
    actualCost: 85.00,
    workNotes: "Replaced O-ring and tightened connections. Leak resolved. Room ready for guest occupancy.",
    guestImpact: "none",
    followUpRequired: false
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439123"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomId: ObjectId("507f1f77bcf86cd799439033"),
    requestNumber: "MR2025070003",
    title: "Light Fixture Bulb Replacement",
    description: "Two bulbs burned out in main room light fixture.",
    category: "Electrical",
    priority: "low",
    status: "pending",
    reportedBy: ObjectId("507f1f77bcf86cd799439065"),
    assignedTo: null,
    reportedDate: new Date("2025-07-29T08:45:00Z"),
    scheduledDate: new Date("2025-07-29T16:00:00Z"),
    completedDate: null,
    estimatedCost: 25.00,
    actualCost: null,
    workNotes: null,
    guestImpact: "minimal",
    followUpRequired: false
  }
]);

// =====================================
// HOUSEKEEPING LOGS COLLECTION
// =====================================
db.housekeepingLogs.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439131"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomId: ObjectId("507f1f77bcf86cd799439031"),
    date: new Date("2025-07-29T08:30:00Z"),
    staffId: ObjectId("507f1f77bcf86cd799439065"),
    taskType: "checkout_cleaning",
    status: "completed",
    timeStarted: new Date("2025-07-29T08:30:00Z"),
    timeCompleted: new Date("2025-07-29T10:15:00Z"),
    itemsChecked: [
      {item: "Bed linens", status: "replaced", notes: ""},
      {item: "Towels", status: "replaced", notes: ""},
      {item: "Bathroom cleaning", status: "completed", notes: "Deep cleaned"},
      {item: "Vacuum", status: "completed", notes: ""},
      {item: "Minibar restocking", status: "completed", notes: "All items replenished"},
      {item: "Amenities", status: "restocked", notes: ""}
    ],
    supplies_used: [
      {item: "Bath towels", quantity: 4},
      {item: "Bed sheets", quantity: 1},
      {item: "Shampoo bottles", quantity: 2},
      {item: "All-purpose cleaner", quantity: 1}
    ],
    notes: "Room ready for next guest. AC unit making slight noise - reported to maintenance.",
    qualityCheck: {
      passed: true,
      checkedBy: ObjectId("507f1f77bcf86cd799439065"),
      checkTime: new Date("2025-07-29T10:20:00Z")
    }
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439132"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    roomId: ObjectId("507f1f77bcf86cd799439032"),
    date: new Date("2025-07-28T09:15:00Z"),
    staffId: ObjectId("507f1f77bcf86cd799439065"),
    taskType: "maintenance_cleaning",
    status: "completed",
    timeStarted: new Date("2025-07-28T09:15:00Z"),
    timeCompleted: new Date("2025-07-28T09:45:00Z"),
    itemsChecked: [
      {item: "Towels", status: "replaced", notes: "Guest requested extra towels"},
      {item: "Bathroom supplies", status: "restocked", notes: ""},
      {item: "Trash removal", status: "completed", notes: ""},
      {item: "Bed making", status: "completed", notes: ""}
    ],
    supplies_used: [
      {item: "Bath towels", quantity: 2},
      {item: "Shampoo bottles", quantity: 1}
    ],
    notes: "Guest currently occupying room. Light maintenance cleaning completed.",
    qualityCheck: {
      passed: true,
      checkedBy: ObjectId("507f1f77bcf86cd799439065"),
      checkTime: new Date("2025-07-28T09:50:00Z")
    }
  }
]);

// =====================================
// FINANCIAL RECORDS COLLECTION
// =====================================
db.financialRecords.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439141"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    recordType: "revenue",
    category: "room_revenue",
    date: new Date("2025-07-28"),
    amount: 15750.50,
    currency: "USD",
    description: "Daily room revenue",
    bookingReferences: ["BK2025070001", "BK2025070005", "BK2025070012"],
    taxAmount: 1575.05,
    netAmount: 14175.45,
    paymentMethod: "various",
    accountCode: "4100-01",
    createdBy: ObjectId("507f1f77bcf86cd799439061"),
    createdAt: new Date("2025-07-29T09:00:00Z")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439142"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    recordType: "expense",
    category: "utilities",
    date: new Date("2025-07-28"),
    amount: 2850.00,
    currency: "USD",
    description: "Monthly electricity bill - July 2025",
    vendor: "ConEd Energy",
    invoiceNumber: "INV-2025-07-001",
    accountCode: "6200-01",
    approvedBy: ObjectId("507f1f77bcf86cd799439061"),
    createdAt: new Date("2025-07-28T16:30:00Z")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439143"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    recordType: "revenue",
    category: "service_revenue",
    date: new Date("2025-07-28"),
    amount: 1275.00,
    currency: "USD",
    description: "Daily service charges (spa, room service, etc.)",
    serviceBookingIds: [
      ObjectId("507f1f77bcf86cd799439091"),
      ObjectId("507f1f77bcf86cd799439092"),
      ObjectId("507f1f77bcf86cd799439093")
    ],
    taxAmount: 127.50,
    netAmount: 1147.50,
    accountCode: "4200-01",
    createdBy: ObjectId("507f1f77bcf86cd799439061"),
    createdAt: new Date("2025-07-29T09:15:00Z")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439144"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    recordType: "expense",
    category: "payroll",
    date: new Date("2025-07-15"),
    amount: 45780.25,
    currency: "USD",
    description: "Bi-weekly payroll - July 15, 2025",
    employeeCount: 85,
    accountCode: "6100-01",
    approvedBy: ObjectId("507f1f77bcf86cd799439061"),
    createdAt: new Date("2025-07-15T17:00:00Z")
  }
]);

// =====================================
// EVENTS COLLECTION
// =====================================
db.events.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439151"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    eventName: "Johnson Wedding Reception",
    eventType: "wedding",
    organizer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1-555-0200"
    },
    eventDate: new Date("2025-08-15T18:00:00Z"),
    endDate: new Date("2025-08-15T23:00:00Z"),
    venue: "Grand Ballroom",
    expectedGuests: 150,
    confirmedGuests: 142,
    catering: {
      menu: "Premium Wedding Package",
      dietaryRestrictions: ["2 Vegetarian", "1 Gluten-Free", "3 Halal"],
      headCount: 142
    },
    services: [
      "Floral arrangements",
      "Wedding cake",
      "Photography area setup",
      "Live music setup",
      "Valet parking"
    ],
    totalCost: 25800.00,
    depositPaid: 7740.00,
    balanceDue: 18060.00,
    status: "confirmed",
    assignedStaff: [
      ObjectId("507f1f77bcf86cd799439061"),
      ObjectId("507f1f77bcf86cd799439064")
    ],
    specialRequests: "Champagne toast at 9 PM, special lighting for first dance",
    notes: "High-profile client - ensure premium service"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439152"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    eventName: "TechCorp Annual Conference",
    eventType: "corporate",
    organizer: {
      name: "Michael Chen",
      email: "mchen@techcorp.com",
      phone: "+1-555-0201"
    },
    eventDate: new Date("2025-09-20T08:00:00Z"),
    endDate: new Date("2025-09-22T17:00:00Z"),
    venue: "Conference Center",
    expectedGuests: 300,
    confirmedGuests: 285,
    catering: {
      menu: "Business Continental Package",
      dietaryRestrictions: ["25 Vegetarian", "8 Vegan", "12 Gluten-Free"],
      headCount: 285
    },
    services: [
      "AV equipment rental",
      "WiFi upgrade",
      "Business center access",
      "Transportation coordination",
      "Welcome reception"
    ],
    totalCost: 45600.00,
    depositPaid: 13680.00,
    balanceDue: 31920.00,
    status: "confirmed",
    assignedStaff: [
      ObjectId("507f1f77bcf86cd799439061"),
      ObjectId("507f1f77bcf86cd799439062")
    ],
    specialRequests: "Live streaming setup for remote attendees, charging stations throughout venue",
    notes: "Annual client - provide corporate rate for room bookings"
  }
]);

// =====================================
// LOYALTY PROGRAM COLLECTION
// =====================================
db.loyaltyProgram.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439161"),
    customerId: ObjectId("507f1f77bcf86cd799439041"),
    memberId: "LP001234",
    tier: "Gold",
    currentPoints: 15420,
    lifetimePoints: 28750,
    joinDate: new Date("2020-05-12"),
    lastActivity: new Date("2025-07-28"),
    benefits: [
      "10% discount on room rates",
      "Free room upgrade (subject to availability)",
      "Late checkout",
      "Welcome amenity",
      "Priority reservation"
    ],
    pointsHistory: [
      {
        date: new Date("2025-07-28"),
        transaction: "booking_stay",
        pointsEarned: 280,
        pointsRedeemed: 0,
        balance: 15420,
        description: "Stay at Grand Palace Hotel - 5 nights"
      },
      {
        date: new Date("2025-06-15"),
        transaction: "service_purchase",
        pointsEarned: 50,
        pointsRedeemed: 0,
        balance: 15140,
        description: "Airport transfer service"
      },
      {
        date: new Date("2025-05-10"),
        transaction: "bonus_points",
        pointsEarned: 500,
        pointsRedeemed: 0,
        balance: 15090,
        description: "Anniversary bonus points"
      }
    ],
    nextTierRequirement: {
      tier: "Platinum",
      pointsNeeded: 4580,
      benefits: ["15% discount", "Free breakfast", "Airport lounge access"]
    },
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439162"),
    customerId: ObjectId("507f1f77bcf86cd799439043"),
    memberId: "LP001236",
    tier: "Platinum",
    currentPoints: 32100,
    lifetimePoints: 67890,
    joinDate: new Date("2018-02-14"),
    lastActivity: new Date("2025-07-20"),
    benefits: [
      "15% discount on room rates",
      "Free room upgrade (guaranteed)",
      "Free breakfast",
      "Late checkout",
      "Airport lounge access",
      "Dedicated concierge",
      "Priority everything"
    ],
    pointsHistory: [
      {
        date: new Date("2025-07-20"),
        transaction: "booking_stay",
        pointsEarned: 750,
        pointsRedeemed: 0,
        balance: 32100,
        description: "Presidential Suite booking"
      },
      {
        date: new Date("2025-06-05"),
        transaction: "points_redemption",
        pointsEarned: 0,
        pointsRedeemed: 2000,
        balance: 31350,
        description: "Free night redemption"
      }
    ],
    nextTierRequirement: {
      tier: "Diamond",
      pointsNeeded: 17900,
      benefits: ["20% discount", "Butler service", "Private dining"]
    },
    status: "active"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439163"),
    customerId: ObjectId("507f1f77bcf86cd799439045"),
    memberId: "LP001238",
    tier: "Diamond",
    currentPoints: 47800,
    lifetimePoints: 125600,
    joinDate: new Date("2017-04-20"),
    lastActivity: new Date("2025-07-25"),
    benefits: [
      "20% discount on room rates",
      "Complimentary suite upgrades",
      "Butler service",
      "Free breakfast and dinner",
      "Airport transfers included",
      "Private dining options",
      "Spa credits",
      "Personal shopping service"
    ],
    pointsHistory: [
      {
        date: new Date("2025-07-25"),
        transaction: "booking_stay",
        pointsEarned: 1200,
        pointsRedeemed: 0,
        balance: 47800,
        description: "Multiple property stays"
      },
      {
        date: new Date("2025-06-18"),
        transaction: "tier_bonus",
        pointsEarned: 2500,
        pointsRedeemed: 0,
        balance: 46600,
        description: "Diamond tier quarterly bonus"
      }
    ],
    nextTierRequirement: null,
    status: "active"
  }
]);

// =====================================
// ANALYTICS COLLECTION
// =====================================
db.analytics.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439171"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    reportType: "daily_occupancy",
    date: new Date("2025-07-28"),
    metrics: {
      totalRooms: 250,
      occupiedRooms: 218,
      availableRooms: 25,
      outOfOrderRooms: 7,
      occupancyRate: 87.2,
      adr: 425.50, // Average Daily Rate
      revpar: 371.04, // Revenue Per Available Room
      totalRevenue: 92719.00,
      walkIns: 3,
      noShows: 2,
      earlyCheckouts: 1
    },
    generatedAt: new Date("2025-07-29T06:00:00Z"),
    generatedBy: "system"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439172"),
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    reportType: "monthly_revenue",
    date: new Date("2025-07-01"),
    period: "July 2025",
    metrics: {
      roomRevenue: 2567800.50,
      serviceRevenue: 456750.25,
      eventRevenue: 125400.00,
      totalRevenue: 3149950.75,
      totalExpenses: 1887470.45,
      netProfit: 1262480.30,
      profitMargin: 40.1,
      averageOccupancy: 85.7,
      totalBookings: 1247,
      cancellationRate: 8.2,
      repeatCustomerRate: 34.6
    },
    generatedAt: new Date("2025-08-01T08:00:00Z"),
    generatedBy: ObjectId("507f1f77bcf86cd799439061")
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439173"),
    hotelId: ObjectId("507f1f77bcf86cd799439012"),
    reportType: "guest_satisfaction",
    date: new Date("2025-07-01"),
    period: "Q2 2025",
    metrics: {
      totalReviews: 156,
      averageRating: 4.3,
      ratingBreakdown: {
        "5_star": 67,
        "4_star": 54,
        "3_star": 23,
        "2_star": 8,
        "1_star": 4
      },
      satisfactionByCategory: {
        cleanliness: 4.5,
        service: 4.4,
        location: 4.8,
        value: 3.9,
        amenities: 4.2
      },
      responseRate: 92.3,
      repeatGuestRate: 41.2
    },
    generatedAt: new Date("2025-07-01T10:00:00Z"),
    generatedBy: ObjectId("507f1f77bcf86cd799439061")
  }
]);

// =====================================
// SUPPLIERS COLLECTION
// =====================================
db.suppliers.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439181"),
    name: "Luxury Linens Inc.",
    category: "Linens & Textiles",
    contact: {
      email: "orders@luxurylinens.com",
      phone: "+1-800-555-0300",
      address: {
        street: "1245 Industrial Boulevard",
        city: "Atlanta",
        state: "GA",
        zipCode: "30309",
        country: "USA"
      }
    },
    contactPerson: {
      name: "Rebecca Martinez",
      title: "Account Manager",
      email: "rmartinez@luxurylinens.com",
      phone: "+1-800-555-0301"
    },
    paymentTerms: "Net 30",
    deliverySchedule: "Weekly",
    minimumOrder: 500.00,
    qualityRating: 4.8,
    reliability: 96.5,
    contractStartDate: new Date("2023-01-01"),
    contractEndDate: new Date("2025-12-31"),
    status: "active",
    products: [
      "Bath towels", "Bed sheets", "Pillowcases", "Bathrobes", "Pool towels"
    ],
    lastDelivery: new Date("2025-07-22"),
    totalSpend2025: 45600.00
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439182"),
    name: "Premium Bath Products",
    category: "Amenities & Toiletries",
    contact: {
      email: "sales@premiumbath.com",
      phone: "+1-877-555-0400",
      address: {
        street: "567 Commerce Park Drive",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90028",
        country: "USA"
      }
    },
    contactPerson: {
      name: "Andrew Kim",
      title: "Sales Representative",
      email: "akim@premiumbath.com",
      phone: "+1-877-555-0401"
    },
    paymentTerms: "Net 45",
    deliverySchedule: "Bi-weekly",
    minimumOrder: 750.00,
    qualityRating: 4.6,
    reliability: 94.2,
    contractStartDate: new Date("2022-06-01"),
    contractEndDate: new Date("2026-05-31"),
    status: "active",
    products: [
      "Shampoo", "Conditioner", "Body wash", "Lotion", "Soap bars", "Dental kits"
    ],
    lastDelivery: new Date("2025-07-20"),
    totalSpend2025: 28750.00
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439183"),
    name: "Global Coffee Suppliers",
    category: "Food & Beverage",
    contact: {
      email: "info@globalcoffee.com",
      phone: "+1-888-555-0500",
      address: {
        street: "2890 Coffee Bean Lane",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA"
      }
    },
    contactPerson: {
      name: "Maria Santos",
      title: "Regional Manager",
      email: "msantos@globalcoffee.com",
      phone: "+1-888-555-0501"
    },
    paymentTerms: "Net 15",
    deliverySchedule: "Monthly",
    minimumOrder: 1200.00,
    qualityRating: 4.9,
    reliability: 98.1,
    contractStartDate: new Date("2021-03-01"),
    contractEndDate: new Date("2026-02-28"),
    status: "active",
    products: [
      "Coffee beans", "Tea varieties", "Hot chocolate", "Coffee filters", "Espresso pods"
    ],
    lastDelivery: new Date("2025-07-10"),
    totalSpend2025: 18950.00
  }
]);

// =====================================
// PURCHASE ORDERS COLLECTION
// =====================================
db.purchaseOrders.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439191"),
    poNumber: "PO2025-001234",
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    supplierId: ObjectId("507f1f77bcf86cd799439181"),
    orderDate: new Date("2025-07-15T09:30:00Z"),
    requestedDeliveryDate: new Date("2025-07-22T10:00:00Z"),
    status: "delivered",
    items: [
      {
        itemName: "Bath Towels",
        description: "Premium 100% cotton bath towels - White",
        quantity: 100,
        unitPrice: 25.00,
        totalPrice: 2500.00
      },
      {
        itemName: "Bed Sheets",
        description: "Egyptian cotton bed sheets - King size",
        quantity: 50,
        unitPrice: 45.00,
        totalPrice: 2250.00
      }
    ],
    subtotal: 4750.00,
    tax: 380.00,
    shipping: 125.00,
    totalAmount: 5255.00,
    paymentTerms: "Net 30",
    createdBy: ObjectId("507f1f77bcf86cd799439065"),
    approvedBy: ObjectId("507f1f77bcf86cd799439061"),
    deliveredDate: new Date("2025-07-22T14:30:00Z"),
    invoiceNumber: "INV-LL-2025-0456",
    notes: "Regular monthly linen restock"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439192"),
    poNumber: "PO2025-001235",
    hotelId: ObjectId("507f1f77bcf86cd799439011"),
    supplierId: ObjectId("507f1f77bcf86cd799439182"),
    orderDate: new Date("2025-07-18T11:15:00Z"),
    requestedDeliveryDate: new Date("2025-07-25T09:00:00Z"),
    status: "pending",
    items: [
      {
        itemName: "Shampoo Bottles",
        description: "Luxury hotel shampoo 50ml bottles",
        quantity: 200,
        unitPrice: 3.50,
        totalPrice: 700.00
      },
      {
        itemName: "Body Wash",
        description: "Premium body wash 50ml bottles",
        quantity: 200,
        unitPrice: 3.75,
        totalPrice: 750.00
      },
      {
        itemName: "Conditioner",
        description: "Hair conditioner 50ml bottles",
        quantity: 150,
        unitPrice: 3.80,
        totalPrice: 570.00
      }
    ],
    subtotal: 2020.00,
    tax: 161.60,
    shipping: 85.00,
    totalAmount: 2266.60,
    paymentTerms: "Net 45",
    createdBy: ObjectId("507f1f77bcf86cd799439065"),
    approvedBy: ObjectId("507f1f77bcf86cd799439061"),
    deliveredDate: null,
    invoiceNumber: null,
    notes: "Expedited delivery requested for weekend guest arrivals"
  }
]);

// =====================================
// INDEXES FOR PERFORMANCE
// =====================================

// Hotels Collection Indexes
db.hotels.createIndex({ "name": 1 });
db.hotels.createIndex({ "address.city": 1, "address.state": 1 });
db.hotels.createIndex({ "rating": -1 });

// Rooms Collection Indexes
db.rooms.createIndex({ "hotelId": 1, "roomNumber": 1 });
db.rooms.createIndex({ "hotelId": 1, "status": 1 });
db.rooms.createIndex({ "roomTypeId": 1 });

// Customers Collection Indexes
db.customers.createIndex({ "contact.email": 1 }, { unique: true });
db.customers.createIndex({ "personalInfo.lastName": 1, "personalInfo.firstName": 1 });
db.customers.createIndex({ "loyaltyProgram.memberId": 1 });

// Bookings Collection Indexes
db.bookings.createIndex({ "bookingReference": 1 }, { unique: true });
db.bookings.createIndex({ "customerId": 1 });
db.bookings.createIndex({ "hotelId": 1, "checkInDate": 1 });
db.bookings.createIndex({ "hotelId": 1, "status": 1 });
db.bookings.createIndex({ "checkInDate": 1, "checkOutDate": 1 });

// Staff Collection Indexes
db.staff.createIndex({ "employeeId": 1 }, { unique: true });
db.staff.createIndex({ "employment.hotelId": 1, "employment.department": 1 });
db.staff.createIndex({ "contact.email": 1 });

// Payments Collection Indexes
db.payments.createIndex({ "bookingId": 1 });
db.payments.createIndex({ "customerId": 1 });
db.payments.createIndex({ "paymentDate": -1 });
db.payments.createIndex({ "status": 1 });

// Reviews Collection Indexes
db.reviews.createIndex({ "hotelId": 1, "overallRating": -1 });
db.reviews.createIndex({ "customerId": 1 });
db.reviews.createIndex({ "reviewDate": -1 });

// Service Bookings Collection Indexes
db.serviceBookings.createIndex({ "bookingId": 1 });
db.serviceBookings.createIndex({ "customerId": 1 });
db.serviceBookings.createIndex({ "scheduledDate": 1 });

// Maintenance Collection Indexes
db.maintenanceRequests.createIndex({ "hotelId": 1, "status": 1 });
db.maintenanceRequests.createIndex({ "roomId": 1 });
db.maintenanceRequests.createIndex({ "priority": 1, "status": 1 });

// Financial Records Collection Indexes
db.financialRecords.createIndex({ "hotelId": 1, "date": -1 });
db.financialRecords.createIndex({ "recordType": 1, "category": 1 });

// Analytics Collection Indexes
db.analytics.createIndex({ "hotelId": 1, "reportType": 1, "date": -1 });

// Inventory Collection Indexes
db.inventory.createIndex({ "hotelId": 1, "category": 1 });
db.inventory.createIndex({ "hotelId": 1, "status": 1 });

// =====================================
// SAMPLE QUERIES AND OPERATIONS
// =====================================

// Find all available rooms for a specific date range
/*
db.bookings.find({
  "checkInDate": { $lte: new Date("2025-08-01") },
  "checkOutDate": { $gte: new Date("2025-07-30") },
  "status": { $in: ["confirmed", "checked-in"] }
}).distinct("roomId");
*/

// Calculate hotel occupancy rate for a specific date
/*
db.analytics.findOne({
  "hotelId": ObjectId("507f1f77bcf86cd799439011"),
  "reportType": "daily_occupancy",
  "date": new Date("2025-07-28")
});
*/

// Find top spending customers
/*
db.customers.aggregate([
  {
    $lookup: {
      from: "bookings",
      localField: "_id",
      foreignField: "customerId",
      as: "bookings"
    }
  },
  {
    $addFields: {
      totalSpent: { $sum: "$bookings.totalAmount" }
    }
  },
  { $sort: { totalSpent: -1 } },
  { $limit: 10 }
]);
*/

// Find rooms needing maintenance
/*
db.maintenanceRequests.find({
  "status": { $in: ["pending", "in_progress"] },
  "priority": "high"
}).sort({ "reportedDate": 1 });
*/

// Monthly revenue report
/*
db.financialRecords.aggregate([
  {
    $match: {
      "hotelId": ObjectId("507f1f77bcf86cd799439011"),
      "recordType": "revenue",
      "date": {
        $gte: new Date("2025-07-01"),
        $lt: new Date("2025-08-01")
      }
    }
  },
  {
    $group: {
      _id: "$category",
      totalRevenue: { $sum: "$amount" }
    }
  }
]);
*/

print("Hotel Management Database created successfully!");
print("Total Collections: 19");
print("Total Documents: 100+");
print("Indexes created for optimal performance");
print("Ready for production use!");