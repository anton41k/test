function hidden_field(data_field,input_field,input_name,model_name,pk,field_type){
     document.getElementById(input_field).hidden = false;
     if(!$('div.'+input_field).text())
     {
        block_form(data_field);
        $.get(("/manage/save/"+model_name+"/"+input_name+"/"+field_type+"/"+pk),
            function(data){
                unblock_form(data_field);
                document.getElementById(data_field).hidden = true;
                $("."+input_field).html(data);
                var size=$('input#'+field_type+input_name+pk).val().length;
                $('input#'+field_type+input_name+pk).attr('size',size);
                if(field_type=='DateField')
                {
                    $('input#DateField'+input_name+pk).after("<img id='DateField"+pk+"' src='/static/img/icon_calendar.gif'><script type='text/javascript'>calendar.set('DateField"+pk+"','"+input_name+"','"+input_name+pk+"'); </\script>");//
                }
                else{
                    $('input#'+field_type+input_name+pk).focus();
                    }
            });
     }
     else{
         document.getElementById(data_field).hidden = true;
         if(field_type!='DateField'){$('input#'+field_type+input_name+pk).focus();}
         }

}

function onblur_field(div_field,form_field,date){
    document.getElementById(div_field).hidden = false;
    document.getElementById(form_field).hidden = true;
    if(date && date=='DateField')
       {$('.calendar-box').hide();}
}
function block_form(id) {
    if(!id){id = ''}
    $("#load"+id).show();
    $('input').attr('disabled', true);
    }

function unblock_form(id) {
    if(!id){id = ''}
    $('#load'+id).hide();
    $('input').removeAttr('disabled');
            }
function add_form(model_name){
    block_form();
    document.getElementById('input_image').hidden = true;
    document.getElementById('form_save').hidden = false;
    $.get(("/manage/add/"+model_name),
        function(data){
            unblock_form();
            $(".add_form").html(data);
            $('input#DateField').after("<img id='DateFieldall' src='/static/img/icon_calendar.gif'><script type='text/javascript'>calendar.set('DateFieldall','DateField','total_form'); </script>");

});
}



function Form_valid(field_type,ru_field_name,field_name,pk,id,form_id){
        if(!field_name){field_name='',pk='',id='',form_id=''}
        if(field_type=='all'){
            var events='blur';
            var param='input#CharField,input#IntegerField,input#DateField';
            css_param='none';
            }
        else{events='focus keyup'
             var param='input#'+field_type+field_name+pk
             css_param='block';
            }
        $('body').on(events,param, function(eventObject){
             var idi = $(this).attr('id');
             var val = $(this).val();
             var ths = $(this)
             var len=(!val.length) ? 1:val.length;
             if(field_type!='all'){$(this).attr('size',len);}
            each_id(idi,val,ths,ru_field_name,field_name,pk);
        }); // end keyup()
    if(field_type != 'DateField'){

        $('body').on('blur','input#'+field_type+field_name+pk, function(){
              var idi = $(this).attr('id');

              $('.error-box'+idi).css({'display': 'none'});
              onblur_field(id,form_id)
            });
        }
    else{
        $(document).click(function (event) {
                var str=(!$(event.target).attr('id')) ? String($(event.target).attr('id')):$(event.target).attr('id');
                if ($(event.target).closest('#'+form_id).length == 0 && str.indexOf(id)==-1 && $(event.target).attr('id')!='calendarday') {
                    onblur_field(id,form_id)
                }
            });
        }
};
function each_id(idi,val,ths,ru_field_name,field_name,pk){
            if(!pk){pk = ''}
            if(ru_field_name)
                 {ru_field_name=ru_field_name.split('_').join(' ') }
             else
                  {ru_field_name = $("label[for="+idi+"]").text();
                      };
             if(!field_name && !$("div").is('.error-box'+idi))
                 {ths.after("<img id='error_img' class='error_img"+idi+"' width=20px src='/static/img/icon_error.gif'/'/\><div style='display:none' id='error-box' class='error-box"+idi+" total-error-box'></div>");}
           switch(idi)
           {
                 case 'CharField'+field_name+pk:
                    var rv_name = /^[a-zA-Zа-яА-Я]+\s*[a-zA-Zа-яА-Я]+$/;
                    if(val.length > 2 && val != '' && rv_name.test(val) && val.length < 50)
                    {
                       ths.removeClass('error').addClass('not_error'+field_name+pk);
                       ths.css({'border':'1px solid green','border-radius': '3px','background-color':' silver','color': '#000','margin':'0px'});
                       $('.error-boxCharField'+field_name+pk).html('').css({'display': 'none'});
                       $('.error_img'+idi).css({'display': 'none'});
                    }
                    else
                    {
                       ths.removeClass('not_error'+field_name+pk).addClass('error');
                       ths.css({'border':'1px solid red','border-radius': '3px','background-color':' grey','color': '#fff'});
                       $('.error-boxCharField'+field_name+pk).html('&bull; поле "'+ru_field_name+'" обязательно для заполнения<br> &bull; длина имени должна составлять не менее двух символов<br> &bull; поле должно содержать только русские или латинские буквы').css({'color':'red','font-size':'10px','display':css_param});
                       $('.error_img'+idi).show();
                    }
                break;
                 case 'IntegerField'+field_name+pk:
                    var rv_name = /^[0-9]+$/;
                    if(val != '' && rv_name.test(val))
                    {
                       ths.removeClass('error').addClass('not_error'+field_name+pk);
                       ths.css({'border':'1px solid green','border-radius': '3px','background-color':' silver','color': '#000','margin':'0px'});
                       $('.error-boxIntegerField'+field_name+pk).html('').css({'display': 'none'});
                       $('.error_img'+idi).css({'display': 'none'});
                    }
                    else
                    {
                       ths.removeClass('not_error'+field_name+pk).addClass('error');
                       ths.css({'border':'1px solid red','border-radius': '3px','background-color':' grey','color': '#fff'});
                       $('.error-boxIntegerField'+field_name+pk).html('&bull; поле "'+ru_field_name+'" обязательно для заполнения<br>&bull; поле должно содержать только цифры').css({'color':'red','font-size':'10px','display':css_param});
                       $('.error_img'+idi).show();
                    }
                break;
                    case 'DateField'+field_name+pk:
                    var rv_name = /^(18|19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)$/;
                    if( $.trim($('input#DateField').text()) != "" ){alert(1)}
                    if(val != '' && rv_name.test(val))
                    {
                       ths.removeClass('error').addClass('not_error'+field_name+pk);
                       ths.css({'border':'1px solid green','border-radius': '3px','background-color':' silver','color': '#000','margin':'0px'});
                       $('.error-boxDateField'+field_name+pk).html('').css({'display': 'none'});
                       $('.error_img'+idi).css({'display': 'none'});
                    }
                    else
                    {
                       ths.removeClass('not_error'+field_name+pk).addClass('error');
                       ths.css({'border':'1px solid red','border-radius': '3px','background-color':' grey','color': '#fff'});
                       $('.error-boxDateField'+field_name+pk).html('&bull; поле "'+ru_field_name+'" обязательно для заполнения<br>&bull; дата должна быть в формате yyyy-mm-dd').css({'color':'red','font-size':'10px','display':css_param});
                       $('.error_img'+idi).show();
                    }
                break;

           } // end switch(...)}
           }

function Form_submit(id,form_id,field_name,field_type,pk){
         $('form#'+form_id).submit(function(e){
             e.preventDefault();
             var  form = $('form#'+form_id);
             var action=$(this).attr('action');
             if($('.not_error'+field_name+pk).length > 0)
             {
                 $.ajax({
                        url: action,
                        type: 'post',
                        data: form.serialize(),
                        beforeSend: function(xhr, textStatus){
                            block_form(id)
                        },
                        success: function(data){
                            $("#"+id).html(data);
                            unblock_form(id);
                            if(field_type=='DateField'){date='DateField'}else{date=''}
                            onblur_field(id,form_id,date);
                       }
                }); // end ajax({...})
            }
            else
            {
              return false;
            }
       }); // end submit()
       };// end script

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
                beforeSend: function(xhr, textStatus){
                    block_form()
                    },
                success:function (){
                    model('manage/json/'+model_name+'/');
                    unblock_form();}
                });
            }
        else
            {block_form();
                $('form.form_save :text').each(function(i,elem) {
                    var id=$(elem).attr('id');
                    if(id){
                        var val = $(elem).val();
                        var ths = $(elem)
                        each_id(id,val,ths)

                }
                });
            unblock_form();
            return false;
            }
});
}

