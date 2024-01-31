from django.db import models

# Create your models here.

class Todo(models.Model):
    title=models.CharField(max_length=200)
    description=models.CharField(max_length=500)
    completed=models.BooleanField(default=False)

    def __str__(self):
        return self.title