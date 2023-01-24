from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .encoders import AutomobileVOEncoder, ServiceAppointmentEncoder, ServiceTehcnicianEncoder
# Create your views here.
from .models import AutomobileVO, ServiceAppointment, ServiceTechnician

@require_http_methods(["GET", "POST"])
def api_servicetechnicians(request):
    if request.method == "GET":
        servicetechnician = ServiceTechnician.objects.all()
        return JsonResponse(
            {"servicetechnician": servicetechnician},
            encoder=ServiceTehcnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            service_technician = ServiceTechnician.objects.create(**content)
            return JsonResponse(
                servicetechnician,
                encoder=ServiceTehcnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the service technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_servicetechnician(request, pk):
    if request.method == "GET":
        try:
            service_technician = ServiceTechnician.objects.get(id=pk)
            return JsonResponse(
                service_technician,
                encoder=ServiceTehcnicianEncoder,
                safe=False
            )
        except ServiceTechnician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            service_technician = ServiceTechnician.objects.get(id=pk)
            service_technician.delete()
            return JsonResponse(
                service_technician,
                encoder=ServiceTehcnicianEncoder,
                safe=False,
            )
        except ServiceTechnician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            service_appointment = ServiceTechnician.objects.get(id=pk)
            return JsonResponse(
                service_appointment,
                encoder=ServiceTehcnicianEncoder,
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
            technician = ServiceTechnician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
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