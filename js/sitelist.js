var form = $('#form-site');
var formData = $('#tbody-sites');
var refData;
$(document).ready(function(){
    refData = firebase.database().ref().child('sites');
    getData();
});


form.submit(function(event){
    event.preventDefault();
    refData.push({
        top: event.target.top.value,
        name: event.target.name.value,
        url: event.target.url.value,
        description: event.target.description.value
    });
    $('#form-site')[0].reset();
});

function getData(){
    refData.on('value',function(snap){
        var allData = snap.val();
        var rows = "";
        for (var index in allData) {
            rows += "<tr>"+
                    "<td> "+ allData[index].top+"</td>"+
                    "<td> "+ allData[index].name+"</td>"+
                    "<td> "+ allData[index].url+"</td>"+
                    "<td> "+ allData[index].description+"</td>"+
                    "<td> <div class=\"btn-group\">"+
                    "<a href=\"\" class=\"btn btn-sm btn-warning\">Editar</a>"+
                    "<a href=\"\" class=\"btn btn-sm btn-danger\">Eliminar</a>"+
                    "</div> </td>"+
                    "</tr>";
        }
        formData.html(rows);
    })
}
