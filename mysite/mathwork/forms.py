from django import forms
from .models import MathAssignment

class MathAssignmentForm(forms.ModelForm):
    class Meta:
        model = MathAssignment
        fields = "__all__"
        widgets = {
            'problems': forms.Textarea(attrs={'cols': 80, 'rows': 20}),
        }