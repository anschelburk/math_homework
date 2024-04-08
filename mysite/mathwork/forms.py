from django import forms
from .models import MathAssignment

class MathAssignmentForm(forms.ModelForm):
    class Meta:
        model = MathAssignment
        fields = [fieldname for fieldname in MathAssignment._meta.get_fields()]
        widgets = {
            'problems': forms.Textarea(attrs={'cols': 80, 'rows': 20}),
        }