const chalk = require("chalk")
const validator = require("validator")

console.log(chalk.blue.bgGreenBright(validator.isEmail('jav@gmail.com')))
console.log(chalk.bgRed(validator.isMobilePhone('0882345678','id-ID')))
console.log(chalk.bgBlue.italic(validator.isNumeric('0862345678')))

const pesan = chalk`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis sunt nostrum fugit facere corrupti. Et ea ut, repellendus corporis illum ipsum {bgWhite.black itaque possimus} recusandae quae perferendis praesentium veritatis vitae officia?`
console.log(pesan)