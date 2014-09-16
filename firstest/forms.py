# -*- coding: utf-8 -*-
from django import forms
from firstest.models import *
from django.forms import ModelForm
from django.db.models.loading import cache
from firstest.JSON import *
from django.conf import settings

model=ld(settings.JSON_DIRS+"model_config.json")
widgets = {'CharField':'TextInput','IntegerField':'TextInput','DateField':'DateInput'}
form_list = []

def fields_form(field_meta = None):
	
	attr={'__module__': __name__}
	for key, value in model.iteritems():
		for k,val in value.iteritems():
			if k == 'field':
				for field in val:
					if field['id'] in field_meta:
						if len(field_meta) == 1:
							label = ''
							data={'attrs':{'size':'15','name':field['id']}}
						else:
							label = field['description']['verbose_name']
							data={'attrs':{'size':'20','id':field['type'],'name':field['id']}}
						widget_form = forms.__dict__[widgets[field['type']]](**data)
						kwargs = {'label':label,'widget':widget_form}
						attr[field['id']] = forms.__dict__[field['type']](**kwargs)
		form = type(str(key + 'Form'), (ModelForm,), attr)
		form._meta.model = cache.app_models['firstest'][key.lower()]
		form._meta.fields = field_meta
		form_list.append(form)




		
