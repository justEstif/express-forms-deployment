import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

export default {
  MONGO_URI: process.env.MONGO_URL ?? "",
  PORT: process.env.PORT || 5000,
};
