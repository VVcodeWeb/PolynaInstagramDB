$(function() {
    $("#datatableDB").tablesorter();
  });

function showModal(id) {
    $(id).fadeIn('slow');
}

function hideModal(id) {
     $(id).fadeOut('slow');
}  

/** 
 * Display first given param, second param tells wether page should be uploaded after pressing closeButton 
 * @param reloadAfter string "true" means page will be reloaded, dont ask me why its not boolean
*/
function displayMsg(msg, reloadAfter) {
    var hidden_comment = document.getElementById('hiddenComment');
    showModal(hidden_comment)
    if(msg){
        document.getElementById("hiddenP").innerHTML = msg
    } else {
        document.getElementById("hiddenP").innerHTML = "Нет информации"
    }
    document.getElementById("closeButton").addEventListener("click", function(){
        hideModal(hidden_comment)
        if(reloadAfter == "true")
            location.reload()
   
    })
}


/**
 * <p> Pops up div with 2 buttons yes or no, if pressed yes sends delete request on server with given url
 * <p> After response recieved calls {@link displayMsg(result, true)}
 * @param {*} url is binded to corresponding url in the table 
 */
function submitDeleteForm(url){
    var div_delete = document.getElementById("hiddenDelete")
    showModal(div_delete)
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
        hideModal(div_delete)
    })
    document.getElementById("declineButton").addEventListener("click", function(){
        hideModal(div_delete)
    })
}
