/**
 * Display first given param, second param tells wether page should be uploaded after pressing closeButton
 * @param reloadAfter string "true" means page will be reloaded, dont ask me why its not boolean
 */
export function displayMsg(msg, reloadAfter) {
    var hidden_comment = document.getElementById("hiddenComment");
    showModal(hidden_comment);
    if (msg) {
        document.getElementById("hiddenP").innerHTML = msg;
    } else {
        document.getElementById("hiddenP").innerHTML = "Нет информации";
    }
    document.getElementById("closeButton").addEventListener("click", function () {
        hideModal(hidden_comment);
        if (reloadAfter == "true") 
            location.reload();
        
    });
}

export function showModal(id) {
    $(id).fadeIn("slow");
}

export function hideModal(id) {
    $(id).fadeOut("slow");
}

