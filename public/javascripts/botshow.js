
  //Show Bot Chat Screen
  let bot =  document.querySelector("#acebot")
  let showChat = document.querySelector(".show-popup")
  bot.addEventListener("click", event => {
      event.preventDefault()
      if(showChat.style.display = "none"){
          showChat.style.display = "block"
      }else {
          showChat.style.display = ""
      }
      
  })
  
  //Close Bot Chat Screen
  let closeScreen = document.querySelector("#close-screen")
  closeScreen.addEventListener("click", event => {
      event.preventDefault()
      showChat.style.display = "none"
  
  })