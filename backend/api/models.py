from django.db import models

# Create your models here.
class Question(models.Model):
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    score = models.IntegerField(choices=[(i, i) for i in range(5)])
