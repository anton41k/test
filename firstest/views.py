# -*- encoding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.db.models.loading import cache
from django.core import serializers
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils import simplejson
from firstest.models import *
from firstest.forms import *
import datetime
from django.core.serializers.json import DjangoJSONEncoder
from collections import OrderedDict
from firstest.JSON import *
from django.conf import settings

def manage_json(request, model_name=None,field_name=None):
	if model_name:
		sv(data,settings.JSON_DIRS+"model_config.json")
		jsonf=ld(settings.JSON_DIRS+"model_config.json")
		model = cache.app_models['firstest'][model_name]
		f={'pk':None,'model':model_name,'fields':{}}
		l=[]
		for y in model.objects.all():
			for x in model._meta.fields:
				type_field=''
				if x.name != 'id':
					for i in jsonf[model._meta.object_name]['field']:
						if unicode(i['id'])==x.name:
							type_field=i['type']
					f['fields'][x.verbose_name]=[{'names':{x.name:y.__dict__[x.name]},'type':type_field}]
			f['pk']=y.pk
			l.append(f)
			f={'pk':None,'model':model_name,'fields':{}}
		result = simplejson.dumps(l, cls=DjangoJSONEncoder)
	else:
		payload = {key:value._meta.verbose_name_plural for key,value in cache.app_models['firstest'].iteritems()}
		result = simplejson.dumps(payload)
	return HttpResponse(result, content_type='application/json')

def manage_add(request, model_name=None, field_name=None, field_type=None, pk_model=None):
	model = cache.app_models['firstest'][model_name]
	if field_name:
		fields = [field_name]
		print pk_model
		get_model = model.objects.get(pk=pk_model)
		data_field = getattr(get_model, field_name)
		dict_initial = {field_name: data_field}
		id = field_type + '%s' + pk_model
	else:
		fields = [field.name for field in model._meta.fields]
		dict_initial = {}
		get_model = model()
		id = '%s' 
	fields_form(field_meta = fields)
	for forma in form_list:
		if forma().instance._meta.verbose_name == model_name:
			form = forma
	if request.method == 'POST':
		form_data = form(request.POST,instance = get_model)
		if form_data.is_valid():
			if field_name:
				field_model = form_data.save(commit=False)
				setattr(field_model, field_name, request.POST[field_name])
				field_model.save()
				return HttpResponse(request.POST[field_name])
			else:
				form_data.save()
	return HttpResponse(form(label_suffix='', auto_id=id,initial = dict_initial).as_p())


