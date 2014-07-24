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

    $.ajax({
        url: '/api/add_char?name=' + name + "&image=" + image + "&hp=" + hp + "&ac=" + ac,
        cache: false,
        dataType: "HTTP",
        type: "GET"
    });
});