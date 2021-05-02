socket.emit("userConnected", username);

socket.on("leave", function(dataObj){
  console.log("Leave called",dataObj);
  let leaveDiv = document.createElement("div");
  leaveDiv.classList.add("chat");
  leaveDiv.classList.add("leave");
  leaveDiv.textContent = `${dataObj.username} left the chat`;
  chatWindow.append(leaveDiv);
  deleteFromOnlineList(dataObj.id);
})

socket.on("join", function(dataObj){
  let joinDiv = document.createElement("div");
  joinDiv.classList.add("chat");
  joinDiv.classList.add("join");
  joinDiv.textContent = `${dataObj.username} joined the chat`;
  chatWindow.append(joinDiv);
  addOnlineList(dataObj);
})

socket.on("chatLeft", function( chatObj){
  let chatDiv = document.createElement("div");
  chatDiv.classList.add("chat");
  chatDiv.classList.add("left");
  chatDiv.textContent = `${chatObj.username} : ${chatObj.chat}`;
  chatWindow.append(chatDiv);
})

let onlineList = document.querySelector(".online-list");


socket.on("online-list", function(userList){
  userList.forEach(user => {
    if(user.id == socket.id){
      return;
    }
    let userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `
      <div class="user-image">
        <img src="default.png" >
      </div>
      <div class="user-name">${user.username}</div>
    `;
    userDiv.setAttribute("id",user.id);
    onlineList.append(userDiv);
  });
})

function deleteFromOnlineList(id){
  onlineList.querySelector(`[id=${id}]`).remove();
}

function addOnlineList(dataObj){
  let userDiv = document.createElement("div");
  userDiv.classList.add("user");
  userDiv.innerHTML = `
    <div class="user-image">
      <img src="default.png" >
    </div>
    <div class="user-name">${dataObj.username}</div>
  `;
  userDiv.setAttribute("id",dataObj.id);
  onlineList.append(userDiv);
}