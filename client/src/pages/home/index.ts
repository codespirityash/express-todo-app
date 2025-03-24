import { checkIfUserInstanceExists } from "../../lib/utils"
const userExists = checkIfUserInstanceExists()
console.log(userExists)
setTimeout(() => {
    if(!userExists){
        window.location.href = "/auth"
    }
},1000)