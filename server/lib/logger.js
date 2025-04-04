import chalk from "chalk";
import chalkAnimation from "chalk-animation";
export default class Logger {    
    index=0;
    constructor(name="logger"){
        this.name = name
    }
    log(...args){
        console.log(chalk.green(this.index),">",chalk.yellow(this.name),">", ...args)
        this.index++
    }
    heading(value){
        console.log(chalk.green.bold.underline(value))
    }
    headingAnimated(value){
        const a = chalkAnimation.rainbow(value)
        setTimeout(()=>{
            a.start()
        }, 1000)
    }
    info(value){
        console.log(chalk.yellow(value))
    }
}