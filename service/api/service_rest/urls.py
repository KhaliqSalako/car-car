from django.urls import path
from .views import api_appointment, api_servicetechnician, api_appointments, api_servicetechnicians





urlpatterns = [
    path("service_technician/", api_servicetechnicians, name="api_servicetechnicians"),
    path("service_appointment/", api_appointments, name="api_appointments"),
    path("service_technician/<int:employee_number>/", api_servicetechnician, name="service_technician"),
    path("service_appointment/<int:pk>/", api_appointment, name="appointment"),
]
