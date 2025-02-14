import bcrypt from "bcryptjs";
import Organization from '../models/organization.model.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, contactNumber, email, password } = req.body;
    try {
        // Encrypt the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOrganization = new Organization({ name, contactNumber, email, password: hashedPassword });
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

        const token = jwt.sign({ id: organization._id }, process.env.ACCESS_TOKEN);
        res.cookie('accessToken', token, { httpOnly: true });

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in' });
    }
}

