

const getName = () =>{
    const user = document.querySelector("#user").value
    return user
}

const setName = (data) =>{
    let setHtml = data.map((n) =>{
        return `<h2>${n.name}</h2>`
    })
    document.querySelector(".name").innerHTML = setHtml
}