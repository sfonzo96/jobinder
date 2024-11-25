import bcrypt from "bcrypt";
import getEnvironment from "../config/envConfig.js";
import jwt from "jsonwebtoken";

const env = getEnvironment();

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
	return jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token) => {
	return jwt.verify(token, env.JWT_SECRET);
};

export default {
	hashPassword,
	comparePassword,
	generateToken,
	verifyToken,
};
