require("dotenv").config();

const MONGO_DB_URI: string = process.env.MONGO_DB_URI as string;
const PORT = process.env.SERVER_PORT;
const JWT_SECRET = process.env.JWT_SECRET as string;

export { JWT_SECRET, MONGO_DB_URI, PORT };
