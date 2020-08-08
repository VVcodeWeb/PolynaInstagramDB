
 function displayMsg(msg, reloadAfter) {
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
function showModal(id) {
    $(id).fadeIn("slow");
}

function hideModal(id) {
    $(id).fadeOut("slow");
}

/**
 * <p> Pops up div with 2 buttons yes or no, if pressed yes sends delete request on server with given url
 * <p> After response recieved calls {@link displayMsg(result, true)}
 * @param {*} url is binded to corresponding url in the table
 */
function submitDeleteForm(url) {
    var div_delete = document.getElementById("hiddenDelete");
    showModal(div_delete);
    document.getElementById("acceptButton").addEventListener("click", function () {
        $.ajax({
            url: `/account?url=${url}`,
            type: "delete",
            success: function (result) {
                displayMsg(`${result}`, "true");
            },
            error: function (req, msg, error) {
                displayMsg(`${msg}. ${error}`, "false");
            }
        });
        hideModal(div_delete);
    });
    document.getElementById("declineButton").addEventListener("click", function () {
        hideModal(div_delete);
    });
}

$(document).ready(function () {
    $("#datatableDB").tablesorter();
    $(".imgInAddition").on("click", function (event) {
        if($(this).attr("data-url")){
            submitDeleteForm($(this).attr("data-url"))
        } else 
            displayMsg($(this).attr("data-description"), "noe")
    })
    $.ajax({
        url: "/users/status",
        type: "get",
        success: function () {
            $("#logout_button").css("display", "inline");
        }
    });
    $("#logout_button").on("click", function (event) {
        $.ajax({
            url: "/users/logout",
            type: "get",
            success: function () {
                location.reload();
            },
            error: function () {
                alert("Someting went wrong, try again. If you see this, its rly weird");
                location.reload();
            }
        });
    });
    var header_db = $(".header_db")
    var helper = {
        value: -10
    }
    anime({
        targets: helper,
        duration: 750,
        value: 25,
        easing: "linear",
        round: 1,
        update: function (a) {
            header_db.css("background", `radial-gradient(40% ${
                a.animations[0].currentValue
            }% at bottom,#C12600,#e66465, #9198e5)`)
        }
    })

    anime({
        targets: ".nav_links, .welcome_msg_db",
        translateY: [
            -300, 0
        ],
        opacity: [
            0, 1
        ],
        direction: "normal",
        easing: "linear",
        duration: 750

    })
    anime({
        targets: ".search",
        translateX: [
            -300, 0
        ],
        opacity: [
            0, 1
        ],
        direction: "normal",
        easing: "linear",
        duration: 850
    });
});
