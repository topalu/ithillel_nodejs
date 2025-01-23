import chalk from "chalk";

function formatMessage(level, msg) {

    const timestemp = new Date().toISOString()

    switch(level) {
        case 'info':
            return chalk.blue(`[${timestemp}], INFO: ${msg}`)

        case 'warning':
            return chalk.yellow(`[${timestemp}], WARNING: ${msg}`)

        case 'error':
            return chalk.red(`[${timestemp}], ERROR: ${msg}`)

        default:
        return chalk.gray(`[${timestemp}], UNKNOW: ${msg}`)

    }

}

export default formatMessage