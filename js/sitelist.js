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
                    "<td> <a href=\""+allData[index].url+"\" target=\"_blank\">"+ allData[index].name+"</a></td>"+
                    "<td> "+ allData[index].description+"</td>"+
                    "<td> <div class=\"btn-group\">"+
                    "<button onclick=\"getOne(\'"+index+"\')\" class=\"btn btn-sm btn-warning\">Editar</button>"+
                    "<button onclick=\"deleteRow(\'"+index+"\')\" class=\"btn btn-sm btn-danger\">Eliminar</button>"+
                    "</div> </td>"+
                    "</tr>";
        }
        formData.html(rows);
    })
}

function getOne(index){
    getOneRow = refData.child(index);
    getOneRow.once("value", function(snap){
        var data = snap.val();
        $("input[name='top']").val(data.top);
        $("input[name='name']").val(data.name);
        $("input[name='url']").val(data.url);
        $("input[name='description']").val(data.description);
        $("button[name='button']").val("editar");
    });
}

function deleteRow(index){
    rowtoDelete = refData.child(index);
    rowtoDelete.remove();
}
