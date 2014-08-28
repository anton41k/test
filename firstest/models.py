# -*- encoding: utf-8 -*-
from django.db import models
from firstest.JSON import *
from django.conf import settings
from django.utils import timezone
from django.contrib import admin


sv(data,settings.JSON_DIRS+"model_config.json")
model=ld(settings.JSON_DIRS+"model_config.json")


models_list = []
for key, value in model.iteritems():
    models_list.append(type(str(key), (models.Model,), {'__module__': __name__,'__unicode__': lambda self:u'%s'%(self.__dict__[value['unicode']])}))
    for k,val in value.iteritems():
        for model in models_list:
            if model.__name__ == key:
                if k == 'field':
                    for field in val:
                        kwargs = field['description']
                        model.add_to_class(field['id'], models.__dict__[field['type']](**kwargs))
                if k == 'meta':
                    for meta in val:
                        model._meta.__dict__[meta] = val[meta]
                try:
                    admin.site.register(model)
                except:
                    pass
