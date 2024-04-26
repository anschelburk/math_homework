from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("assignment/", views.assignment_view, name="math_assignmment"),
    path("drawing/", views.drawing_view, name="drawing"),
    path("mathkeyboard/", views.math_keyboard, name="math_keyboard"),
]