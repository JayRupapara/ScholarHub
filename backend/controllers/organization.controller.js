import bcrypt from "bcryptjs";
import Organization from '../models/organization.model.js';
import jwt from "jsonwebtoken";

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
        return res.status(500).json({ message: 'Error logging in'+error });
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
