/** 
 * Need to rewrite listeners for buttons
 * Need to add pop up login window
 * Need to optimize code and check if its possible not to write displayMsg and etc twice!
 * 
*/



$(document).ready(function() {
    function showModal(id) {
        $(id).fadeIn('slow');
    }
    
    function hideModal(id) {
         $(id).fadeOut('slow');
    }  

function displayMsg(msg, reloadAfter) {
    var hidden_comment = $('#hiddenCommenta');
    showModal(hidden_comment)
    if(msg){
        $("#hiddenPa").innerHTML = msg
    } else {
       $("#hiddenPa").innerHTML = "Нет информации"
    }
    $("#closeButton").addEventListener("click", function(){
        hideModal(hidden_comment)
        if(reloadAfter == "true")
            location.reload()
   
    })
}

$("#form_add_account").submit(function (event){
    event.preventDefault()

    console.log("straight after submit")
    var $form = $(this)
    var url_request = $form.attr('action')

    var posting = $.post(url_request, {
        url: $('#url').val(),
        theme: $('#theme').val(),
        product: $('#product').val(),
        reach: $('#reach').val(),
        cost: $('#cost').val(),
        subscribersIncome: $('#subscribersIncome').val(),
        percentTAgeo: $('#percentTAgeo').val(),
        percentTAsex: $('#percentTAsex').val(),
        percentTAage: $('#percentTAage').val(),
        description: $('#description').val()
    })

    posting.done(function (data){
        console.log("lolad")
        displayMsg(data, "false")
    })

    posting.fail(function (data){
        displayMsg("cant", "false")
        console.log("lol")
    })
})

})