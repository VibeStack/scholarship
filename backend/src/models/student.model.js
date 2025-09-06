import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    applicantId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: { type: Date, required: true },
    batch: { type: String, required: true },

    course: { type: String, required: true },
    branch: { type: String, required: true },
    leet: { type: String, enum: ["Leet", "Non-Leet"], required: true },

    contactNo: { type: String, required: true },
    aadhaar: { type: String, required: true },
    email: { type: String, required: true },
    bank: {
      name: { type: String, required: true },
      accountNo: { type: String, required: true },
      ifsc: { type: String, required: true },
    },

    category: {
      caste: { type: String, required: true },
      subCaste: { type: String, required: true },
      familyIncome: { type: Number, required: true },
    },

    hostel: { type: String, required: true },
    affidavitBy: { type: String, required: true },

    maintenanceAllowance: {
      months: { type: Number, required: true },
      rate: { type: Number, required: true },
      total: { type: Number, required: true },
    },

    fees: {
      tuitionFee: { type: Number, required: true },
      otherFee: { type: Number, required: true },
      totalFeeClaim: { type: Number, required: true },
    },

    // Map for dynamic year-wise data
    yearWise: {
      type: Map,
      of: new mongoose.Schema({
        feePaid: { type: Number, required: true },
        credited: {
          amount: { type: Number, required: true },
          bank: { type: String, required: true },
          accountNo: { type: String, required: true },
          date: { type: Date, required: true },
        },
        granted40: { type: Number, required: true },
        granted60: { type: Number, required: true },
      }),
    },

    remarks: { type: String },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
