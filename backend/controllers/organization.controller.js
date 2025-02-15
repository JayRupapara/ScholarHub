import bcrypt from "bcryptjs";
import Organization from '../models/organization.model.js';
import OrganizationScholarship from "../models/organizationScholarship.model.js";
import UserScholarship from "../models/userScholarship.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const signup = async (req, res) => {
    const { name, contactNumber, email, password, type } = req.body;
    try {
        // Encrypt the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOrganization = new Organization({ name, contactNumber, email, password: hashedPassword, type });
        await newOrganization.save();
        return res.status(201).json({ message: 'Organization signed up successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Error signing up organization' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const organization = await Organization.findOne({ email });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, organization.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const payload = {
            id: organization.id,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN);
        console.log(organization.id)

        res.cookie("accessToken", accessToken, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in' + error });
    }
}

export const getOrganizationDetails = async (req, res) => {
    const id = req.user.id;
    try {
        const organization = await Organization.findById(id).select('-_id -__v -password -createdAt -updatedAt');
        if (!organization) {
            return res.json({ message: 'Organization not found' }).status(404);
        }
        return res.status(200).json(organization);
    } catch (error) {
        return res.json({ message: 'Error retrieving organization details' }).status(500);
    }
}

export const getScholarship = async (req, res) => {
    const id = req.user.id;
    try {
        const scholarships = await OrganizationScholarship.find({ organizationID: id }).populate('scholarshipID');
        if (!scholarships || scholarships.length === 0) {
            return res.status(200).json({ message: 'No scholarships found for this organization', scholarships: [] });
        }
        return res.status(200).json(scholarships);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving scholarships: ' + error.message });
    }
}

export const addsScholarship = async (req, res) => {
    const organizationID = req.user.id;
    const { scholarshipID } = req.body;

    if (!scholarshipID) {
        return res.status(400).json({ message: 'Scholarship ID is required' });
    }

    try {
        const newOrganizationScholarship = new OrganizationScholarship({
            organizationID,
            scholarshipID,
        });

        await newOrganizationScholarship.save();
        return res.status(201).json({ message: 'Scholarship added to organization successfully', scholarship: newOrganizationScholarship });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding scholarship to organization: ' + error.message });
    }
}


export const getScholarshipDashboard = async (req, res) => {
    const organizationID = req.user.id;
    try {
        const organizationScholarships = await OrganizationScholarship.find({ organizationID: organizationID });
        let totalApplications=0

        if (!organizationScholarships || organizationScholarships.length === 0) {
            
        }

        // Extract scholarship IDs
        const scholarshipIDs = organizationScholarships.map(scholarship => scholarship.scholarshipID);

        // Step 2: Find all users associated with these scholarships
        const userScholarships = await UserScholarship.find({ scholarshipID: { $in: scholarshipIDs } })
        console.log(userScholarships)
        totalApplications = userScholarships.length;
        // console.log(userScholarships)
        const oneMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
        const previousApplications = await UserScholarship.countDocuments({
            organizationID,
            createdAt: { $lte: oneMonthsAgo }
        });


        // 2. Active Scholarships
        const activeScholarships = await OrganizationScholarship.countDocuments({
            organizationID,
            status: "active"
        });

        // 3. Recent Applications
        const recentApplications = await UserScholarship.find({ organizationID })
            .sort({ createdAt: -1 })
            .limit(3)
            .populate("userID", "name") // Assuming you have a userID field that references User collection
            .populate("scholarshipID", "name")
            .select("status createdAt");

        // 4. Application Trends for Last 6 Months
        const applicationTrends = await UserScholarship.aggregate([
            {
                $match: {
                    organizationID: organizationID,
                    createdAt: { $gte: oneMonthsAgo }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const trendsData = Array.from({ length: 6 }, (_, i) => {
            const month = new Date().getMonth() - 5 + i;
            const data = applicationTrends.find(t => t._id === (month > 0 ? month : 12 + month));
            return data ? data.count : 0;
        });

        return res.status(200).json({
            totalApplications,
            activeScholarships,
            recentApplications,
            applicationTrends: trendsData
        });
    } catch (error) {
        return res.json({ message: "Error fetching dashboard data: " + error.message }).status(500);
    }
};

export const getAppliedScholarship = async (req, res) => {
    const id = req.user.id;
    try {
        const organizationScholarships = await OrganizationScholarship.find({ organizationID: id });

        if (!organizationScholarships || organizationScholarships.length === 0) {
            return res.status(404).json({ message: 'No scholarships found for this organization' });
        }

        // Extract scholarship IDs
        const scholarshipIDs = organizationScholarships.map(scholarship => scholarship.scholarshipID);

        // Step 2: Find all users associated with these scholarships
        const userScholarships = await UserScholarship.find({ scholarshipID: { $in: scholarshipIDs } })

        // // Extract unique users
        // const users = userScholarships.map(userScholarship => userScholarship.userID)
        // console.log(users)
        return res.status(200).json({ userScholarships });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving scholarships: ' + error.message });
    }
}