import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/dbConnect";
import app from "./app";
import cron from "node-cron";
import { processReminders } from "./services/cron.service";

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });

  // Automatically process reminders every 1 minute during local development
  if (process.env.NODE_ENV !== "production") {
    console.log("🕒 Local Development Cron started (Runs every 1 minute)");
    cron.schedule("* * * * *", async () => {
      console.log("🕒 Triggering local cron tick...");
      try {
        await processReminders();
      } catch (e) {
        console.error("Local cron failed:", e);
      }
    });
  }
};

startServer();
