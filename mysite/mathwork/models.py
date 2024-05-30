from django.contrib.auth.models import User
from django.db import models

class MathAssignment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment_title = models.CharField(max_length=500, blank=False)
    student_name = models.CharField(max_length=255)
    assignment_date = models.DateField(blank=True, null=True)
    teacher_name = models.CharField(max_length=255, blank=True)
    class_name = models.CharField(max_length=255, blank=True)
    math_input = models.TextField(blank=True)
    canvas_data = models.TextField(blank=True)
    # problems_hidden = JSONField

    def __str__(self):
        return f"Math assignment. Assignment Title: {self.assignment_title}. Student Name: {self.student_name}."


class Drawing(models.Model):
    name = models.CharField(max_length=100)
    canvas_data = models.TextField()  # Store the JSON data here

    def __str__(self):
        return self.name
