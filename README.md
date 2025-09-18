# TaskManager – מערכת ניהול משימות מקצועית

מערכת זו פותחה עבור ניהול משימות מתקדם, עם דגש על אבטחה, נגישות, גלובליות, ותשתית DevOps מלאה.

## תיאור הפרויקט
TaskManager היא מערכת מבוססת Django (Backend) ו-React (Frontend) לניהול משימות, הרשאות, סינון מתקדם, ותיעוד API. המערכת כוללת ממשק משתמש מודרני, REST API, הרשאות לפי משתמשים, ניהול קבצים, ותמיכה מלאה ב-Docker, CI/CD, PostgreSQL.

## פיצ'רים עיקריים
- ניהול משימות מלא: יצירה, עריכה, מחיקה, סינון לפי תאריך, דחיפות, תגיות וסטטוס
- הרשאות לפי משתמשים ותפקידים
- דשבורד סטטיסטיקות (ניתן להרחבה)
- תמיכה בשxxx (עברית/אנגלית)
- עיצוב רספונסיבי ונגישות מלאה
- אינטגרציה עם דטהבייס PostgreSQL
- תיעוד API אוטומטי (Swagger)
- CI/CD אוטומטי עם GitHub Actions
- הרצה מקומית או בענן (Docker, Heroku, Vercel)

## דוגמה ל-flow מלא
1. הרשמה והתחברות
2. יצירת משימה חדשה
3. סינון משימות לפי דחיפות/תאריך
4. עריכת משימה קיימת
5. מחיקת משימה
6. צפייה בדשבורד סטטיסטיקות

## דמו חי
לאחר העלאה לענן יתווסף כאן קישור לדמו החי של הפרויקט.

## טכנולוגיות עיקריות
- Django 4
- Django REST Framework
- React 18
- PostgreSQL
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Tailwind CSS
- Material UI

## הוראות התקנה והרצה
### דרישות מוקדמות
- Python 3.10+
- Node.js 18+
- Docker (מומלץ)
- PostgreSQL (אם לא מריצים דרך Docker)

### התקנה מקומית
1. **Clone הריפוזיטורי:**
   ```bash
   git clone https://github.com/PHolzman7487/task-manager-2025.git
   cd task-manager-2025
   ```
2. **התקנת תלויות Backend:**
   ```bash
   cd python-task-manager
   pip install -r requirements.txt
   ```
3. **התקנת תלויות Frontend:**
   ```bash
   cd frontend
   npm install
   ```
4. **הרצת Django:**
   ```bash
   cd python-task-manager
   python manage.py migrate
   python manage.py runserver
   ```
5. **הרצת React:**
   ```bash
   cd frontend
   npm start
   ```

### הרצה עם Docker
1. **בניית והרצת המערכת:**
   ```bash
   docker-compose up --build
   ```
2. **המערכת תעלה בכתובת:**
   - Backend: http://localhost:8000
   - Frontend: http://localhost:3000

## דוגמאות API
- הרשמה: `POST /api/register/`
- התחברות: `POST /api/login/`
- משימות: `GET /api/tasks/`, `POST /api/tasks/`, `PUT /api/tasks/:id/`, `DELETE /api/tasks/:id/`
- סינון: `GET /api/tasks/?priority=high&due_date=2025-09-17`

## תיעוד API
- תיעוד Swagger/DRF Docs זמין בכתובת: `/api/docs/`

## הרשאות וניהול משתמשים
- הרשאות מבוססות Django Groups
- ניהול משתמשים, הרשאות API, תצוגה דינמית ב-React

## CI/CD
- תהליך אוטומטי לבדיקות, בנייה, ו-deploy דרך GitHub Actions

## הנגשה וגלובליות
- תמיכה מלאה בעברית ואנגלית
- רספונסיביות לכל סוגי המסכים
- הנגשה מלאה (WCAG)


## תרומה ויצירת קשר
- Pull Requests ו-Issues מתקבלים בשמחה!
- מייל: p4127487@gmail.com

---
© פניני הולצמן 2025. כל הזכויות שמורות.
