let chatInput = document.querySelector(".chat-input");
let chatWindow = document.querySelector(".chat-window");

let username = prompt("Enter your name:");

chatInput.addEventListener("keypress", function(e){
  if(e.key =="Enter" && chatInput.value){
    let chatDiv = document.createElement("div");
    chatDiv.textContent = `${username} : ${chatInput.value}`;
    chatDiv.classList.add("chat");
    chatDiv.classList.add("right");
    chatWindow.appendChild(chatDiv);
    chatWindow.scrollTo(0,chatWindow.scrollHeight);
    chatInput.value = "";
  }
})