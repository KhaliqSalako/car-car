from django.contrib import admin
from .models import ServiceAppointment, ServiceTechnician, AutomobileVO


admin.site.register(ServiceAppointment)
admin.site.register(ServiceTechnician)
admin.site.register(AutomobileVO)
