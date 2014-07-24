/**
 * Created by albertlwohletz on 7/23/14.
 */
$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $( ".overlay" ).draggable();

});

$('#add-new').click(function() {
    $("#overlay").show();
});

$('.hp').change(function(){
    current = $(this).val();
    max = $(this).attr("data-hp");
    if (current/max < 0.25){
        $(this).parent().parent().parent().css("background-color","red");
    } else if (current/max < 0.50){
        $(this).parent().parent().parent().css("background-color","orange");
    } else if (current/max < 0.75){
        $(this).parent().parent().parent().css("background-color","yellow");
    } else {
        $(this).parent().parent().parent().css("background-color","green");
    }

});

$('#save').click(function() {
    name = $("#player-name").val()
    image = $("#player-image").val()
    hp = $("#player-hp").val()
    ac = $("#player-ac").val()
    count = $("#player-number").val()

    $.ajax({
        url: '/api/add_char?name=' + name + "&image=" + image + "&hp=" + hp + "&ac=" + ac + "&count="+count,
        cache: false,
        dataType: "HTTP",
        type: "GET"
    });
});


jQuery(".delete").click(function(e){
    e.preventDefault();
    var row = $(this).parent().parent();
    id = row.attr('id')
    $.ajax({
        url: '/api/remove_char?id=' + id,
        cache: false,
        dataType: "HTTP",
        type: "GET"
    });
    row.remove();
});