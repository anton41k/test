# -*- encoding: utf-8 -*-
import codecs
import json

def sv(obj,p):
    """сохранение объекта"""
    with codecs.open(p,"w") as f:
        json.dump(obj,f,indent=2)

def ld(p):
    """загрузка объекта"""
    with codecs.open(p,"r") as f:
        return json.load(f)

data={
	'Users':{
		'unicode':'name',
		'meta':
			{'verbose_name_plural':u'Посетители','ordering':['pk']},
		'field':[
			{'id':'name', 'type':'CharField', 
				'description':{'verbose_name':u'Имя', 'max_length':50}
			},
			{'id':'paycheck', 'type':'IntegerField', 
				'description':{'verbose_name':u'Зарплата'}
			},
			{'id':'description', 'type':'DateField', 
				'description':{'verbose_name':u'Дата поступления'}
			},
				]
			},	
	'Rooms':{
		'unicode':'name',
		'meta':
			{'verbose_name_plural':u'Комнаты','ordering':['pk']},
		'field':[
			{'id':'name', 'type':'CharField', 
				'description':{'max_length':50, 'verbose_name':u'Отдел'}
			},
			{'id':'spots', 'type':'IntegerField', 
				'description':{'verbose_name':u'Вместимость'}
			},

				]
			},		
}
