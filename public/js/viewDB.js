$(function() {
    $("#datatableDB").tablesorter();
  });

/** 
 * Display first given param, second param tells wether page should be uploaded after pressing closeButton 
 * @param reloadAfter string "true" means page will be reloaded, dont ask me why its not boolean
*/
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


/**
 * <p> Pops up div with 2 buttons yes or no, if pressed yes sends delete request on server with given url
 * <p> After response recieved calls {@link displayMsg(result, true)}
 * @param {*} url is static, binded to corresponding url in the table 
 */
function submitDeleteForm(url){
    var divDelete = document.getElementById("hiddenDelete")
    divDelete.style.display = "block"
    document.getElementById("acceptButton").addEventListener("click", function(){
        $.ajax({
            url: `/account?url=${url}`,
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
