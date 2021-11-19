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
    <h3 class="email">${x.mail}</h3> <p class="hs" >${hs}:</p> <p class="msn">${x.msn}</p> 
    </div>`
    })
    .join("");
    document.querySelector("#box").innerHTML = html;
  };
  
  const addMsn = () => {
    let msg = {
      mail: document.querySelector("#mail").value,
      msn: document.querySelector("#message").value,
    };
    let ms = document.querySelector("#message").value = " "
    
    socket.emit("new-message", msg);
    return false;
  };