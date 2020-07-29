/** 
 * Need to rewrite listeners for buttons in jQuery format
 * Need to add pop up login window(needed?)
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
        $("#hiddenPa").text(msg)
    } else {
        $("#hiddenPa").text("Нет информации")
    }
    $("#closeButton").on("click", function(){
        hideModal(hidden_comment)
        if(reloadAfter == "true")
            location.reload()
   
    })
}

$("#form_add_account").submit(function (event){
    event.preventDefault()

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
        displayMsg(data, "false")
    })

    posting.fail(function (data){
        console.log(data)
        displayMsg(data.responseJSON.error, "false")
    })
})

})