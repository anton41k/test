# -*- encoding: utf-8 -*-
"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""
from django.db.models.loading import cache
from django.test.client import Client
from django.test import TestCase
from django.utils import timezone
import random, string
from django.core.urlresolvers import reverse

CharField = ''.join(random.sample(string.lowercase, 8))
IntegerField = random.randint(100,50000)
DateField = timezone.now()
model_users = cache.app_models['firstest']['users']
model_rooms = cache.app_models['firstest']['rooms']

class UsersTestCase(TestCase):
	def setUp(self):
		self.users = model_users.objects.create(name = CharField, paycheck = IntegerField, description = DateField)
	def tearDown(self):
		self.users = None
	def testObjectAsString(self):
		self.assertEqual(str(self.users), CharField)
	def testSaveObject(self):
		self.users.save()
		obj=model_users.objects.get(name = CharField)
		self.assertEqual(obj.name, CharField)
	def testDeleteObject(self):
		self.users.save()
		obj=model_users.objects.filter(name = CharField).delete()
		self.assertNotEqual(obj, CharField)

class RoomsTestCase(TestCase):
	def setUp(self):
		self.rooms = model_rooms.objects.create(name = CharField, spots = IntegerField)
	def tearDown(self):
		self.rooms = None
	def testObjectAsString(self):
		self.assertEqual(str(self.rooms), CharField)
	def testSaveObject(self):
		self.rooms.save()
		obj=model_rooms.objects.get(name = CharField)
		self.assertEqual(obj.name, CharField)
	def testDeleteObject(self):
		self.rooms.save()
		obj=model_rooms.objects.filter(name = CharField).delete()
		self.assertNotEqual(obj, CharField)

class TemplateTestCase(TestCase):
	def setUp(self):
		self.client=Client()
	def testManagePage(self):
		response1=self.client.get( "/" )
		self.assertTemplateUsed( response1, 'index.html')
		self.assertEqual(response1.status_code, 200)
		response2=self.client.get( "/manage/add/users/" )
		self.assertEqual(response2.status_code, 200)
		response3=self.client.get( "/manage/json/users/" )
		self.assertEqual(response3.status_code, 200)
		response4=self.client.get( "/manage/save/users/name/CharField/1/" )
		self.assertEqual(response4.status_code, 200)
	def tearDown(self):
		self.client=None


