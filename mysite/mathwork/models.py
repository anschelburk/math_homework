# from django.contrib.postgres.fields import JSONField
from django.db import models

class MathAssignment(models.Model):
    assignment_title = models.CharField(max_length=500, blank=False)
    student_name = models.CharField(max_length=255)
    assignment_date = models.DateField(blank=True, null=True)
    teacher_name = models.CharField(max_length=255, blank=True)
    class_name = models.CharField(max_length=255, blank=True)
    problems = models.TextField(blank=True)
    # problems_hidden = JSONField

    def __str__(self):
        return f"Math assignment. Assignment Title: {self.assignment_title}. Student Name: {self.student_name}."