import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactMessage

logger = logging.getLogger(__name__)


class ContactAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            name = data.get("name")
            email = data.get("email")
            subject = data.get("subject")
            message = data.get("message")

            if not all([name, email, subject, message]):
                return Response(
                    {"message": "All fields are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Save to database
            ContactMessage.objects.create(
                name=name, email=email, subject=subject, message=message
            )

            # Construct email body
            email_body = f"""
            New Contact Form Submission
            
            Name: {name}
            Email: {email}
            Subject: {subject}
            
            Message:
            {message}
            """

            # For now, we'll just log it since email backend might not be configured
            # In production, this would send an actual email
            logger.info(email_body)

            # Allow sending email if configured
            # if hasattr(settings, 'EMAIL_HOST') and settings.EMAIL_HOST:
            #     send_mail(
            #         f"Portfolio Contact: {subject}",
            #         email_body,
            #         settings.DEFAULT_FROM_EMAIL,
            #         [settings.ADMIN_EMAIL],
            #         fail_silently=False,
            #     )

            return Response(
                {"message": "Message sent successfully"}, status=status.HTTP_201_CREATED
            )

        except Exception as e:
            logger.error(f"Contact form error: {str(e)}")
            return Response(
                {"message": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
