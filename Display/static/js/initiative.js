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