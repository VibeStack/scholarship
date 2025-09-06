import dotenv from "dotenv";
import mongoose from "mongoose";
import { Student } from "../models/student.model.js"; // adjust path
import connectDB from "../db/index.js";

dotenv.config({ path: "./.env" });

const studentsData = [
  {
    applicantId: "APP12347",
    name: "Rahul Sharma",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    dob: new Date("2005-05-14"),
    batch: "2020-2024",
    course: "B.Tech",
    branch: "CSE",
    leet: "Non-Leet",
    contactNo: "9876543210",
    aadhaar: "123456789012",
    email: "rahul.sharma@example.com",
    bank: {
      name: "State Bank of India",
      accountNo: "1234567890",
      ifsc: "SBIN0001234",
    },
    category: {
      caste: "OBC",
      subCaste: "Yadav",
      familyIncome: 350000,
    },
    hostel: "Hosteller",
    affidavitBy: "Father",
    maintenanceAllowance: {
      months: 12,
      rate: 1000,
      total: 12000,
    },
    fees: {
      tuitionFee: 60000,
      otherFee: 10000,
      totalFeeClaim: 70000,
    },
    yearWise: {
      "2020-21": {
        feePaid: 30000,
        credited: {
          amount: 20000,
          bank: "Punjab National Bank",
          accountNo: "9876543210",
          date: new Date("2021-07-15"),
        },
        granted40: 12000,
        granted60: 18000,
      },
      "2021-22": {
        feePaid: 32000,
        credited: {
          amount: 21000,
          bank: "Punjab National Bank",
          accountNo: "9876543210",
          date: new Date("2022-07-15"),
        },
        granted40: 12500,
        granted60: 19000,
      },
      "2022-23": {
        feePaid: 35000,
        credited: {
          amount: 22000,
          bank: "Punjab National Bank",
          accountNo: "9876543210",
          date: new Date("2023-07-15"),
        },
        granted40: 13000,
        granted60: 20000,
      },
      "2023-24": {
        feePaid: 37000,
        credited: {
          amount: 23000,
          bank: "Punjab National Bank",
          accountNo: "9876543210",
          date: new Date("2024-07-15"),
        },
        granted40: 13500,
        granted60: 21000,
      },
    },
    remarks: "Eligible for scholarship under OBC quota",
  },
  {
    applicantId: "APP12346",
    name: "Anika Verma",
    fatherName: "Suresh Verma",
    motherName: "Meena Verma",
    dob: new Date("2004-08-20"),
    batch: "2020-2024",
    course: "B.Tech",
    branch: "ECE",
    leet: "Leet",
    contactNo: "9876543211",
    aadhaar: "123456789013",
    email: "anika.verma@example.com",
    bank: {
      name: "HDFC Bank",
      accountNo: "1234567891",
      ifsc: "HDFC0001234",
    },
    category: {
      caste: "SC",
      subCaste: "Chamar",
      familyIncome: 250000,
    },
    hostel: "Day Scholar",
    affidavitBy: "Mother",
    maintenanceAllowance: {
      months: 12,
      rate: 1200,
      total: 14400,
    },
    fees: {
      tuitionFee: 60000,
      otherFee: 12000,
      totalFeeClaim: 72000,
    },
    yearWise: {
      "2020-21": {
        feePaid: 30000,
        credited: {
          amount: 20000,
          bank: "HDFC Bank",
          accountNo: "1234567891",
          date: new Date("2021-07-15"),
        },
        granted40: 12000,
        granted60: 18000,
      },
      "2021-22": {
        feePaid: 31000,
        credited: {
          amount: 21000,
          bank: "HDFC Bank",
          accountNo: "1234567891",
          date: new Date("2022-07-15"),
        },
        granted40: 12500,
        granted60: 19000,
      },
      "2022-23": {
        feePaid: 33000,
        credited: {
          amount: 22000,
          bank: "HDFC Bank",
          accountNo: "1234567891",
          date: new Date("2023-07-15"),
        },
        granted40: 13000,
        granted60: 20000,
      },
      "2023-24": {
        feePaid: 35000,
        credited: {
          amount: 23000,
          bank: "HDFC Bank",
          accountNo: "1234567891",
          date: new Date("2024-07-15"),
        },
        granted40: 13500,
        granted60: 21000,
      },
    },
    remarks: "Eligible for scholarship under SC quota",
  }
];

const seedStudents = async () => {
  try {
    await connectDB();

    for (const studentData of studentsData) {
      const exists = await Student.findOne({ applicantId: studentData.applicantId });
      if (exists) {
        console.log(`⚠️ Student ${studentData.name} already exists`);
      } else {
        const student = new Student(studentData);
        await student.save();
        console.log(`✅ Student ${studentData.name} inserted successfully`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding students:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedStudents();
