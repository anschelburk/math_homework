from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("editor/", views.math_editor, name="math_editor"),
    path("assignment/", views.assignment_view, name="math_assignmment")
]