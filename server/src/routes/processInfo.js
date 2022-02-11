/* const express = require("express");
const CPUs = require("os").cpus().length

const { Router } = express;
const router = new Router();

const cluster = require("cluster")


function isPrime(num) {
    if ([2,3].includes(num)) {
        return true
    } else if ([[2,3].some((n)=> num % n == 0)]){
        return false
    } else{
        let i = 5, w = 2
        while (i ** 2 <= num) {
            if (num % 2 == 0) {
                return false
            }
            i += w
            w = 6 - w
        }
    }
    return true
}

if(cluster.isMaster && cluster.isPrimary){
    for (let i = 0; i < CPUs; i++) {
        cluster.fork()   
    }
    cluster.on("exit", (worker)=>{
        console.log("worker" + worker.process.pid);
        cluster.fork()
    })
} else{
    router.get("/primes", (req, res)=>{
        const primes = []
        const max = Number(req.query.max) || 1000

        for (let i = 0; i < max; i++) {
            if(isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })
}

router.get("/", (req, res)=>{
    const processObj = {
        Directorio: process.cwd(),
        Sistema: process.platform,
        Node: process.version,
        MemoriaRSS: process.memoryUsage(),
        ProcessId: process.pid,
        NumeroCpus: CPUs
    }
    let info = processObj
    res.send(info)
})


module.exports = router;
 */