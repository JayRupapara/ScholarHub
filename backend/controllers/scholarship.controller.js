import scholarshipSchema from "../models/scholarship.model.js";
import userScholarshipSchema from "../models/userScholarship.model.js";
import { ApiResponse } from "../Utils/apiResponse.util.js";

export const addScholarship = async (req, res) => {
  const {
    scholarshipName,
    amount,
    eligibilityRequirements,
    lastDate,
    duration,
    sahayType,
  } = req.body;
  // const id = req.User.id;
  // console.log(id);
  console.log(req.body);
  const existingScholarship = await userScholarshipSchema.findOne({
    scholarshipName: scholarshipName,
  });
  if (existingScholarship) {
    throw new ApiResponse(409, "Scholarship already exists.");
  }

  try {
    const Scholarship = new userScholarshipSchema({
      scholarshipName: scholarshipName,
      amount: amount,
      eligibilityRequirements: eligibilityRequirements,
      lastDate: lastDate,
      duration: duration,
      sahayType: sahayType,
    });

    if (!Scholarship) {
      throw new ApiResponse(
        500,
        "Something went wrong while creating the Scholarship."
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          Scholarship,
          "Scholarship created Successfully."
        )
      );
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateScholarship = async (req, res) => {
  const {
    scholarshipName,
    amount,
    eligibilityRequirements,
    lastDate,
    duration,
    sahayType,
    paymentMethods,
  } = req.body;
  // const id = req.user._id;

  const existingScholarship = await scholarshipSchema.findOne({
    scholarshipName: scholarshipName,
  });
  if (!existingScholarship) {
    throw new ApiResponse(409, "Scholarship does not exists.");
  }

  const Scholarship = await scholarshipSchema.findOneAndUpdate(
    { scholarshipName: scholarshipName },
    {
      scholarshipName,
      amount,
      eligibilityRequirements,
      lastDate,
      duration,
      sahayType,
      // paymentMethods,
    }
  );
  if (!Scholarship) {
    throw new ApiResponse(
      500,
      "Something went wrong while updating the Scholarship."
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, Scholarship, "Scholarship updated Successfully.")
    );
};
export const showAllScholarships = async (req, res) => {
  // const id = req.user.id;
  const scholarships = await userScholarshipSchema.find();
  if (!scholarships.length) {
    throw new ApiResponse(404, null, "Scholarships not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, scholarships, "list retrieved."));
};
export const deleteScholarship = async (req, res) => {
  const ScholarshipID = req.body.scholarshipID;
  const orgID = req.user.id;
  const exist = await userScholarship.findOne({
    organizationID: orgID,
    scholarshipID: ScholarshipID,
  });
  // const UserID = req.User.id;
  const existingScholarship = await userScholarshipSchema.findById(ScholarshipID);

  try {
    if (!existingScholarship) {
      throw new ApiResponse(
        404,
        "Scholarship not found or does not belong to you."
      );
    }
    await userScholarshipSchema.deleteOne({ _id: ScholarshipID });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Scholarship deleted successfully."));
  } catch (error) {
    console.error("Error deleting the existing Scholarship", error);
  }
};
