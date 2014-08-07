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

// Closes Parent of who was clicked.  This way you can have this in a container and it will act as an close 'x'.
$('.close-button').click(function() {
    $(this).parent().hide();
});

$(document).on("change",".hp", function(e){
    current = $(this).val();
    max = $(this).attr("data-hp");
    if (current/max < 0.0){
        $(this).parent().parent().parent().css("background-color","black");
    }

    else if (current/max < 0.25){
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

    var request =  $.ajax({
        url: '/api/add_char?name=' + name + "&image=" + image + "&hp=" + hp + "&ac=" + ac + "&count="+count,
        cache: false,
        success: function(id) {
            for(i=1; i<=count; i++){
                $("#initiative tr:last").after("<tr id="+parseInt(id+i)+" style='background-color:green'>"+
                "<td>"+name+" " + i + "</td>"+
                "<td><img style='max-height: 40px; src='"+image+"'></td>"+
                "<td style='width:150px'>"+
                "    <div class='input-group'>"+
                "        <input type='text' class='form-control hp' value ="+hp+" data-hp= "+hp+ ">"+
                "        <span class='input-group-addon'>/"+hp+"</span>"+
                "    </div>"+
                "</td>"+
                "<td>"+ac+"</td>"+
                "<td><input type='text' class='form-control'></td>"+
                "<td>"+
                "    <button type='button' class='btn btn-default delete' title='Delete This Person'>"+
                "        <span class='glyphicon glyphicon-remove-circle'></span>"+
                "    </button>"+ "</td></tr>");
            }
        }
    });
    $("#overlay").hide();
});

var last_clicked_id = -1; // global var used for editing.
$(document).on("click",".edit", function(e){
    $("#edit-overlay").show();
    var row = $(this).parent().parent();
    id = row.attr('id')
    last_clicked_id = id;
    $.getJSON("/api/get_char?id=" + id, function(data){
        $("#edit-player-name").val(data.name)
        $("#edit-player-image").val(data.img)
        $("#edit-player-hp").val(data.hp)
        $("#edit-player-ac").val(data.ac)
    });
});

// Saves current stats for last_clicked_id
$('#edit-confirm').click(function() {
    var name = $("#edit-player-name").val();
    var image = $("#edit-player-image").val();
    var hp = $("#edit-player-hp").val();
    var ac = $("#edit-player-ac").val();
    var request =  $.ajax({
        url: '/api/edit_char?name=' + name + "&image=" + image + "&hp=" + hp + "&ac=" + ac + "&id=" + last_clicked_id,
        cache: false
    });
});

$(document).on("click",".delete", function(e){
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