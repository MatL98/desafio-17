function randomNumber(quantity) {
    let nums = []
    for(let i = 1; i <= quantity; i++){
        nums[i] = (Math.random() * 1000)
    }
    return nums
}


process.on("message", (message)=>{
    if(message > 1){
        let random = randomNumber(message)
        process.send(random)
    }else{
        let random = randomNumber(Math.pow(10, 8))
        process.send(random)
    }
})