var form = $('#form-site');
var refData;
$(document).ready(function(){
    refData = firebase.database().ref().child('sites');
});


form.submit(function(event){
    event.preventDefault();
    refData.push({
        top: event.target.top.value,
        name: event.target.name.value,
        url: event.target.url.value,
        description: event.target.description.value
    });
});
