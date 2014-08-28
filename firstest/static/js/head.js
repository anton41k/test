function hidden_field(data_field,input_field,input_name,model_name,pk,field_type){
     document.getElementById(data_field).hidden = true;
     document.getElementById(input_field).hidden = false; 
     $.get(("/manage/save/"+model_name+"/"+input_name+"/"+field_type+"/"+pk),
	function(data){
	$("."+input_field).html(data);});


}

function onblur_field(div_field,form_field,date){
    document.getElementById(div_field).hidden = false;
    document.getElementById(form_field).hidden = true;
    if(date!='' && date=='DateField')
       {calendar.hideCalendar()}
}

function add_form(model_name){
     document.getElementById('input_image').hidden = true;
     document.getElementById('form_save').hidden = false;
     $.get(("/manage/add/"+model_name),
	function(data){
	$(".add_form").html(data); 
});
}

function form_save(model_name) {
	$(".form_save").submit(function(e){e.preventDefault();
        var  form = $('form.form_save');
        var action=$(this).attr('action');
        var len = $('form.form_save p').size()
        if($('.not_error').length == len)
        {
	$.ajax({
                type:"POST",
                url:action,
		data:form.serialize(),
		success:model('manage/json/'+model_name+'/')});}
        else
            {
              return false;
            }
});
}

