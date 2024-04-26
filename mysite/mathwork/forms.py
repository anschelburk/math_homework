from django import forms
from . import models

class MathAssignmentForm(forms.ModelForm):
    class Meta:
        model = models.MathAssignment
        fields = "__all__"
        widgets = {
            'problems': forms.Textarea(attrs={'cols': 80, 'rows': 20}),
        }

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = models.ImageModel
        fields = ["image"]