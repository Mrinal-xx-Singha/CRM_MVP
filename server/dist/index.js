"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnect_1 = require("./db/dbConnect");
const app_1 = __importDefault(require("./app"));
const node_cron_1 = __importDefault(require("node-cron"));
const cron_service_1 = require("./services/cron.service");
const startServer = async () => {
    await (0, dbConnect_1.connectDB)();
    const PORT = process.env.PORT || 8000;
    app_1.default.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
    // Automatically process reminders every 1 minute during local development
    if (process.env.NODE_ENV !== "production") {
        console.log("🕒 Local Development Cron started (Runs every 1 minute)");
        node_cron_1.default.schedule("* * * * *", async () => {
            console.log("🕒 Triggering local cron tick...");
            try {
                await (0, cron_service_1.processReminders)();
            }
            catch (e) {
                console.error("Local cron failed:", e);
            }
        });
    }
};
startServer();
