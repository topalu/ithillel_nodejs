import Logger from "./logger/logger.js";

const logger = new Logger();

logger.info("Info message");
logger.warning("Warning message");
logger.error("Error message");
logger.error(
  new Error("Message of Error class instance", { cause: "I caused it ^^" })
);

// console.log({
//   APP_ENV: process.env["APP_ENV"],
//   DB_PASS: process.env["DB_PASS"],
//   PID: process.pid,
// });

// const p = process.env;

// setInterval(() => {
//   const timestemp = new Date().toISOString();

//   logger.info(`${timestemp}`);
// }, 10_000);
