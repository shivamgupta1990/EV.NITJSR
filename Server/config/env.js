import dotenv from "dotenv";

// force load env
dotenv.config({ path: ".env" });

if (!process.env.CLOUDINARY_API_KEY) {
  console.error("❌ CLOUDINARY_API_KEY is missing");
}

export {}; // ESM safety
