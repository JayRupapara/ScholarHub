import Scholarship from "../models/scholarship.model.js";

export const advancedSearch = async (req, res) => {
  try {
    const {
      scholarshipName,
      maxIncome,
      disability,
      minPercentage,
      highestQualification,
      category,
      lastDate,
      duration,
      sahayType,
    } = req.query;

    let filters = {};

    if (scholarshipName) {
      filters.$text = { $search: scholarshipName }; // Uses text index
    }
    if (maxIncome) {
      filters["eligibilityRequirements.maxIncome"] = {
        $gte: parseInt(maxIncome),
      };
    }
    if (disability) {
      filters["eligibilityRequirements.disability"] = disability === "true";
    }
    if (minPercentage) {
      filters["eligibilityRequirements.academic.minPercentage"] = {
        $gte: parseFloat(minPercentage),
      };
    }
    if (highestQualification) {
      filters["eligibilityRequirements.academic.highestQualification"] =
        highestQualification;
    }
    if (category) {
      filters["eligibilityRequirements.category"] = category;
    }
    if (lastDate) {
      filters.lastDate = { $gte: new Date(lastDate) };
    }
    if (duration) {
      filters.duration = duration;
    }
    if (sahayType) {
      filters.sahayType = sahayType;
    }

    const scholarships = await Scholarship.find(filters).lean();
    res.status(200).json({ success: true, scholarships });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
