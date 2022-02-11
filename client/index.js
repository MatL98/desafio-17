const axios = require("axios")

const url =  "http://localhost:8081/api/productos/"


const getProducts = () =>{
    axios.get(url).then((response)=>{
        console.log(response.data);
    })
}

getProducts()

let data = {name: "Playsation 5", price: 150000, thumbnail: "foto"}

const setProducts = () =>{
    axios.post(url, data).then((response)=>{
        console.log(response.data);
    })
}

setProducts()