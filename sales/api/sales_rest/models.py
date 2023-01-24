from django.db import models
from django.core.validators import MinLengthValidator
#from phonenumber_field.modelfields import PhoneNumberField


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True, validators=[MinLengthValidator(17, "VIN number must be 17 characters")])


class SalesPerson(models.Model):
    name = models.CharField(max_length=255)
    employee_number = models.PositiveSmallIntegerField(unique=True)


class PotentialCustomer(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=30, unique=True)


class SalesRecord(models.Model):
    automobile = models.ForeignKey (
        AutomobileVO,
        related_name="vehicle",
        on_delete=models.PROTECT,
    )

    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="employee",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        PotentialCustomer,
        related_name="purchaser",
        on_delete=models.PROTECT,
    )

    price = models.CharField(max_length=255)
