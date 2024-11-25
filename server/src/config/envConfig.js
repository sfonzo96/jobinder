import { configDotenv } from "dotenv";

configDotenv();

export default function getEnvironment() {
    return {
        PORT: process.env.PORT,
        JWT_SECRET: process.env.JWT_SECRET,
        GMAIL_SENDER: process.env.GMAIL_SENDER,
        GMAIL_API_AUTH: process.env.GMAIL_API_AUTH,
        MONGO_URL: process.env.MONGO_URL,
        COOKIES_SECRET: process.env.COOKIES_SECRET,
    };
}
