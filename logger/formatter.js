import chalk from "chalk";

function formatMessage(level, msg) {
  const timestemp = new Date().toISOString();

  switch (level) {
    case "info":
      return chalk.blue(`[${timestemp}], INFO: ${msg}`);
    case "warning":
      return chalk.yellow(`[${timestemp}], WARNING: ${msg}`);
    case "error":
      return msg instanceof Error
        ? chalk.red(
            `[${timestemp}]\nError type: ${msg.name}\nError message: ${
              msg.message
            }${msg.cause ? `\nError cause: ${msg.cause}` : ""}\nError stack: ${
              msg.stack
            }`
          )
        : chalk.red(`[${timestemp}], ERROR: ${msg}`);
    default:
      return chalk.gray(`[${timestemp}], UNKNOWN: ${msg}`);
  }
}

export default formatMessage;
