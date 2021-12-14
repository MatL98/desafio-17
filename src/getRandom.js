function randomNumber(quantity) {
    let nums = 0
    for(let i = 1; i <= quantity; i++){
        nums = (Math.random() * 1000)
    }
    return nums
}

process.on("message", (message)=>{
    if(message === "listo"){
        let random = randomNumber(Math.pow(10, 10))
        process.send(random)
    }
})