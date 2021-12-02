const socket = io();

  const addMsn = () => {
    let msn = {
      author:{
        mail: document.querySelector("#mail").value,
        name: document.querySelector("#name").value,
        lastName: document.querySelector("#lastName").value,
        age: document.querySelector("#age").value,
        alias: document.querySelector("#alias").value,
        avatar: document.querySelector("#avatar").value,
      },
      msn: document.querySelector("#message").value
    };
    
    socket.emit("client:msn", msn);
    return false;
  };

   socket.on("server:msn", (data) => {
    render(data);
  });

  const render = (data) => {
  let hs = new Date()
  let html = 
  data.map((x) => {
    console.log(x);
    return ` <div class="container d-flex justify-content-start py-4">
    <h3 class="email">${x.author.mail}</h3> <p class="hs" >${hs}:</p> 
    <p class="msn">Nombre: ${x.author.name}</p> 
    <p class="msn">${x.author.lastName}</p> 
    <p class="msn">Edad: ${x.author.age}</p> 
    <p class="msn">Alias: ${x.author.alias}</p>
    <img class="img" src="${x.author.avatar}" alt=""> 
    <p class="msn">${x.msn}</p> 
    
    </div>` 
    })
    .join("");
    document.querySelector("#box").innerHTML = html;
  };
 

  const getName = () =>{
    let user = {
      user: document.querySelector("#user").value
    }
    console.log(`el usuario es ${user}`);
}