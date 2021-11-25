const socket = io();

socket.on("message", (data) => {
  console.log(data);
  render(data);
  socket.emit("message-client", "Muchas gracias por su respuesta");
});

const render = (data) => {
  let hs = new Date()
  let html = data
  .map((x) => {
    return ` <div class="container d-flex justify-content-start py-4">
    <h3 class="email">${x.mail}</h3> <p class="hs" >${hs}:</p> 
    <p class="msn">${x.name}</p> 
    <p class="msn">${x.lastName}</p> 
    <p class="msn">${x.age}</p> 
    <p class="msn">${x.alias}</p> 
    <p class="msn">${x.avatar}</p> 
    <p class="msn">${x.msn}</p> 
    
    </div>`
    })
    .join("");
    document.querySelector("#box").innerHTML = html;
  };
  
  const addMsn = () => {
    let data = {
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
    let ms = document.querySelector("#message").value = " "
    
    socket.emit("new-message", data);
    return false;
  };