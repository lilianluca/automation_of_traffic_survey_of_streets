from django.db import models

# Create your models here.


class Test(models.Model):
    name = models.CharField(max_length=255)
    data = models.CharField(max_length=255)


class MapPoint(models.Model):
    longitude = models.DecimalField(max_digits=17, decimal_places=15)
    latitude = models.DecimalField(max_digits=17, decimal_places=15)
    intensity = models.DecimalField(max_digits=17, decimal_places=15)

    def __str__(self):
        return f"lgd: {self.longitude}, ltd: {self.latitude}, i: {self.intensity}"
