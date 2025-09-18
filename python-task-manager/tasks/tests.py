
from django.test import TestCase
from .models import Task

class TaskModelTest(TestCase):
	def test_create_task(self):
		from django.contrib.auth import get_user_model
		User = get_user_model()
		user = User.objects.create_user(username="tester", password="123456")
		task = Task.objects.create(title="בדיקה", description="משימה לבדיקה", priority="medium", owner=user)
		self.assertEqual(task.title, "בדיקה")
		self.assertEqual(task.priority, "medium")
		self.assertEqual(task.owner, user)
