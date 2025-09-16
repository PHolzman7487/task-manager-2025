from django.contrib.auth.models import User
from django.db import models



PRIORITY_CHOICES = [
    ("low", "Low"),
    ("medium", "Medium"),
    ("high", "High"),
]

RECURRENCE_CHOICES = [
    ("none", "ללא"),
    ("daily", "יומי"),
    ("weekly", "שבועי"),
    ("monthly", "חודשי"),
]

class Task(models.Model):
    title = models.CharField(max_length=200)  # שם המשימה
    description = models.TextField(blank=True)  # תיאור המשימה
    completed = models.BooleanField(default=False)  # סטטוס המשימה (נעשתה או לא)
    due_date = models.DateField(null=True, blank=True)  # תאריך יעד למשימה
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default="medium"
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tasks",
        default=1
    )
    file = models.FileField(upload_to="tasks/", null=True, blank=True)  # קובץ/תמונה מצורפת

    tags = models.TextField(
        blank=True,
        default="",
        help_text="תגיות מופרדות בפסיק (labels)"
    )

    recurrence = models.CharField(
        max_length=10,
        choices=RECURRENCE_CHOICES,
        default="none",
        help_text="חזרתיות: ללא/יומי/שבועי/חודשי"
    )

    def __str__(self):
        return self.title