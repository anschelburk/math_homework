# from django.contrib.postgres.fields import JSONField
from django.db import models

class math_assignment(models.Model):
    student_name = models.CharField(max_length=255)
    teacher_name = models.CharField(max_length=255, blank=True)
    class_name = models.CharField(max_length=255, blank=True)
    assignment_date = models.DateField(blank=True, null=True)
    assignment_title = models.CharField(max_length=500, blank=False)
    # problems = JSONField

    def __str__(self):
        return f"Math assignment. Assignment Title: {self.assignment_title}. Student Name: {self.student_name}."