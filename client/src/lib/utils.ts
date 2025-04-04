export function checkIfUserInstanceExists(){
    const uid = localStorage.getItem("uid")
    if(uid){return true}
    return false
}