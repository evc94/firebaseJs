var form = $('#form-site');
var refData;
$(document).ready(function(){
    refData = firebase.database().ref().child('sites');
});


form.submit(function(event){
    event.preventDefault();
    refData.push({
        name: event.target.nombre.value
    });
});
