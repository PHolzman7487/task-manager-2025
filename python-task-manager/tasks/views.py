from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        # אחרי עדכון, אם המשימה סומנה כהושלמה ויש לה חזרתיות, צור חדשה
        try:
            instance = self.get_object()
            recurrence = instance.recurrence
            was_completed = instance.completed
            # שליחת התראה במייל אם המשימה דחופה או קרובה
            from datetime import timedelta, date
            user = instance.owner
            if user.email:
                urgent = False
                msg = None
                today = date.today()
                if instance.priority == "high":
                    urgent = True
                    msg = f"משימה דחופה: {instance.title} (תאריך יעד: {instance.due_date})"
                elif instance.due_date and (0 <= (instance.due_date - today).days <= 2):
                    urgent = True
                    msg = f"משימה מתקרבת: {instance.title} (תאריך יעד: {instance.due_date})"
                if urgent and msg:
                    print(f"Trying to send mail to {user.email} with subject 'התראת משימה דחופה/קרובה' and message: {msg}")
                    try:
                        send_mail(
                            subject="התראת משימה דחופה/קרובה",
                            message=msg,
                            from_email="p4127487@gmail.com",
                            recipient_list=[user.email],
                        )
                        print("Mail sent successfully!")
                    except Exception as e:
                        print(f"Mail sending failed: {e}")
            # חזרתיות
            if was_completed and recurrence and recurrence != "none":
                # חשב תאריך יעד חדש
                if instance.due_date:
                    if recurrence == "daily":
                        new_due = instance.due_date + timedelta(days=1)
                    elif recurrence == "weekly":
                        new_due = instance.due_date + timedelta(weeks=1)
                    elif recurrence == "monthly":
                        month = instance.due_date.month + 1
                        year = instance.due_date.year
                        if month > 12:
                            month = 1
                            year += 1
                        day = min(instance.due_date.day, 28)
                        new_due = date(year, month, day)
                    else:
                        new_due = None
                else:
                    new_due = None
                if new_due:
                    Task.objects.create(
                        title=instance.title,
                        description=instance.description,
                        due_date=new_due,
                        priority=instance.priority,
                        owner=instance.owner,
                        file=instance.file,
                        tags=instance.tags,
                        recurrence=instance.recurrence
                    )
        except Exception as e:
            pass  # אפשר להוסיף לוג או הדפסה
        return response

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

@csrf_exempt
def contact(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        message = data.get("message")
        if not all([name, email, phone, message]):
            return JsonResponse({"error": "יש למלא את כל השדות"}, status=400)
        print(f"Trying to send contact mail to p4127487@gmail.com with subject 'פנייה חדשה מהאתר'")
        try:
            send_mail(
                subject="פנייה חדשה מהאתר",
                message=f"שם: {name}\nאימייל: {email}\nטלפון: {phone}\n\n{message}",
                from_email="p4127487@gmail.com",
                recipient_list=["p4127487@gmail.com"],
            )
            print("Contact mail sent successfully!")
        except Exception as e:
            print(f"Contact mail sending failed: {e}")
        return JsonResponse({"success": True})
    return JsonResponse({"error": "Invalid request"}, status=400)