require("dotenv").config();

const MONGO_DB_URI: string = process.env.MONGO_DB_URI as string;
const PORT = process.env.SERVER_PORT;

export { MONGO_DB_URI, PORT };
