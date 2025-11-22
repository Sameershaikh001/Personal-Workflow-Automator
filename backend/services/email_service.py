# backend/services/email_service.py
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.port = int(os.getenv('SMTP_PORT', 587))
        self.sender_email = os.getenv('SENDER_EMAIL')
        self.password = os.getenv('EMAIL_PASSWORD')
    
    def send_email(self, to_email, subject, body):
        try:
            message = MIMEMultipart()
            message['From'] = self.sender_email
            message['To'] = to_email
            message['Subject'] = subject
            message.attach(MIMEText(body, 'html'))
            
            server = smtplib.SMTP(self.smtp_server, self.port)
            server.starttls()
            server.login(self.sender_email, self.password)
            server.send_message(message)
            server.quit()
            
            return {"success": True, "message": "Email sent successfully"}
        except Exception as e:
            return {"success": False, "error": str(e)}