from django.db import models
from django.core.validators import MinLengthValidator

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, validators=[MinLengthValidator(17, "MUST BE 17 CHARACTERS")], unique=True)


class ServiceTechnician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField(unique=True)

class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17, validators=[MinLengthValidator(17, "MUST BE 17 CHARACTERS")], unique=True)
    customer_name = models.CharField(max_length=200)
    date = models.DateTimeField()
    assigned_technician = models.ForeignKey(
        ServiceTechnician,
        related_name="services",
        on_delete=models.PROTECT
    )
    reason_for_service = models.TextField()
    vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)




# Create your models here.
