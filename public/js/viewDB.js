function displayMsg(msg, reloadAfter) {
    var divComment = document.getElementById("hiddenComment")
    divComment.style.display = "block"
    if(msg){
        document.getElementById("hiddenP").innerHTML = msg
    } else {
        document.getElementById("hiddenP").innerHTML = "Нет информации"
    }
    document.getElementById("closeButton").addEventListener("click", function(){
        divComment.style.display = "none"
        if(reloadAfter == "true")
            location.reload()
   
    })
}

function submitForm(url){
    var divDelete = document.getElementById("hiddenDelete")
    divDelete.style.display = "block"
    document.getElementById("acceptButton").addEventListener("click", function(){
        $.ajax({
            url: `/database/account?url=${url}`,
            type: 'delete',
            success: function(result){
                displayMsg(`${result}`, 'true')
            },
            error: function(req, msg, error){
                displayMsg(`${msg} +  ${error}`, 'false')
            }
        })
        divDelete.style.display = "none"
    })
    document.getElementById("declineButton").addEventListener("click", function(){
        divDelete.style.display = "none"
    })
}
