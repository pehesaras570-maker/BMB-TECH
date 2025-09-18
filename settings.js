const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0tBQjJjMHljdkVvZ1ova1g5RkxBbGV2RWp1anUxdStUYVpXRUtyQmhWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdtWDVFbjRudTBsL1Z5ZFhJcDllUmVmc2VyYXFlSXloWFp3V3crNURsMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSUJyaFdrYVpLNHk2MEI2ejIyamRQb0MxMnRYclVnQVhGYkkrWnN6VzNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpbTlpV1FiWEtRZGxBdW1jY3I4NkRGUmdKSyt6L2tXaTdBc1ZBRU5oR0FjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitKeFlXMnNGdHJ2U05LOXNXRldqRU1SRUFaRisrZDBQalN0cVdRSzF5Vms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikp6TnpKL05uU3oyQnNJMkJGNnpKa3BIZ2NjWlhqYURYS0RXK3U3VWxlM3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkNLMEdaVUJOQnVqVFB4cTJ3YURGbXBzeE1hYVRyUmw1WDhDNmNubEZscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzNJRktJbUV5ejcrMy8vT2tEMksvbGFPQzN4OWVwMkUwVFgrT044UzBtbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBEMDBmVERZbVlBcTYwQXdGRFZhR2srdGlSTGVUMEhhTFNWOG1qTzE2VHNmcFpMcTFNV3dlb2FqZ01DSnAzYlpxdkpBcmdrTmd0NmJwMDJLU1ZyakN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc5LCJhZHZTZWNyZXRLZXkiOiJEOHJZcFc1Z0lmbFhBNndxdkNsVWdid1Q5bmNjTC8zb1NFUElvMjVtbVM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMywiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI5OUQzR05QWiIsIm1lIjp7ImlkIjoiOTQ3NzU2ODg2NzM6MTZAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNzQ4OTk5ODU4MDUzMzE6MTZAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMalA4clFGRUpIWnI4WUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI3bzVOMkY3a2VrNUR6R0dxanc0ZUpDaExHNVozaHJ2Mjc1czEyby90TkNFPSIsImFjY291bnRTaWduYXR1cmUiOiI4Mm52YWpId1dtaE1KMldBVit1ZTBmcXdIZzRPaVU4OGVHY1ZTaCtucmlRUWhWMnN2M3NGWitmTUNkWEpNUmRYVGc2RzRFSktiZlJQK01hU3ZtbElEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiK2c0WHJEOVZGNDkvcEgyeW0rQ01SdWNGVEViaGtyaXhLd0VQMDl4N0thNnAvS3g2UXdKWEhMamc1SDNXeVJjZU42UzlXeWFEeDdta3pWNS9BUE5WQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc3NTY4ODY3MzoxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlNk9UZGhlNUhwT1E4eGhxbzhPSGlRb1N4dVdkNGE3OXUrYk5kcVA3VFFoIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTgxOTQ4NDYsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUGlnIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "25576786×××××",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
