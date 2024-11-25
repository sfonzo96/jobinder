import getEnvironment from "../config/envConfig.js";
import mongoose from "mongoose";

const env = getEnvironment();

const initDatabase = async () => {
	try {
		await mongoose.connect(env.MONGO_URL);
		console.log("Conectado a la base de datos 🚀");
		return true;
	} catch (err) {
		console.log("Error connecting to the database:", err);
		return false;
	}
};

export default initDatabase;
