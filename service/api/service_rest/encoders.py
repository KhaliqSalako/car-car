from common.json import ModelEncoder
from .models import AutomobileVO, ServiceAppointment, ServiceTechnician

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin"
    ]


class ServiceTechnicianEncoder(ModelEncoder):
    model = ServiceTechnician
    properties = [
        "technician_name",
        "employee_number",
    ]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "date",
        "assigned_technician",
        "reason_for_service",
        "vip",
        "is_finished",
    ]
    encoders = {"assigned_technician" : ServiceTechnicianEncoder(),}
