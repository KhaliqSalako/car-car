from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .encoders import AutomobileVOEncoder, ServiceAppointmentEncoder, ServiceTechnicianEncoder
from .models import AutomobileVO, ServiceAppointment, ServiceTechnician


@require_http_methods(["GET", "POST"])
def api_servicetechnicians(request):
    if request.method == "GET":
        service_technicians = ServiceTechnician.objects.all()
        return JsonResponse(
            {"service_technicians": service_technicians},
            encoder=ServiceTechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            service_technician = ServiceTechnician.objects.create(**content)
            return JsonResponse(
                service_technician,
                encoder=ServiceTechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the service technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_servicetechnician(request, employee_number):
    if request.method == "GET":
        try:
            service_technician = ServiceTechnician.objects.get(employee_number=employee_number)
            return JsonResponse(
                service_technician,
                encoder=ServiceTechnicianEncoder,
                safe=False
            )
        except ServiceTechnician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            service_technician = ServiceTechnician.objects.get(employee_number=employee_number)
            service_technician.delete()
            return JsonResponse(
                service_technician,
                encoder=ServiceTechnicianEncoder,
                safe=False,
            )
        except ServiceTechnician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            service_technician = ServiceTechnician.objects.get(employee_number=employee_number)

            props = ["technician_name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(service_technician, prop, content[prop])
            service_technician.save()
            return JsonResponse(
                service_technician,
                encoder=ServiceTechnicianEncoder,
                safe=False,
            )
        except ServiceTechnician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = ServiceTechnician.objects.get(employee_number=content["assigned_technician"])
            content["assigned_technician"] = technician
            appointment = ServiceAppointment.objects.create(**content)

            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )

        except ServiceTechnician.DoesNotExist:
            response = JsonResponse({"message": "Technician entered does not exist"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_appointment(request, pk):
    if request.method == "GET":
        try:
            model = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                model,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            model = ServiceAppointment.objects.get(id=pk)
            model.delete()
            return JsonResponse(
                model,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else:
        try:
            content = json.loads(request.body)
            ServiceAppointment.objects.filter(id=pk).update(**content)
            appointment = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )

        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 404
            return response
