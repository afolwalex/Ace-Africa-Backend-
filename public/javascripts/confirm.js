let confirmClick = document.getElementById("confirm")
confirmClick.addEventListener("click", event => {
    event.preventDefault()
    let choice = confirm("Are you sure you want to delete?")
    if (choice){
        window.location.href = choice
    }
})