from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    AutomobileVOEncoder,
    SalesPersonEncoder,
    PotentialCustomerEncoder,
    SalesRecordEncoder
)
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesRecord


@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_salesperson(request, employee_number):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(employee_number=employee_number)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(employee_number=employee_number)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.get(employee_number=employee_number)

            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_potential_customers(request):
    if request.method == "GET":
        potential_customers = PotentialCustomer.objects.all()
        return JsonResponse(
            {"potential_customers": potential_customers},
            encoder=PotentialCustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            pontential_customer = PotentialCustomer.objects.create(**content)
            return JsonResponse(
                pontential_customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the potential customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_potential_customer(request, pk):
    if request.method == "GET":
        try:
            potential_customer = PotentialCustomer.objects.get(id=pk)
            return JsonResponse(
                potential_customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            potential_customer = PotentialCustomer.objects.get(id=pk)
            potential_customer.delete()
            return JsonResponse(
                potential_customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            potential_customer = PotentialCustomer.objects.get(id=pk)

            props = ["name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(potential_customer, prop, content[prop])
            potential_customer.save()
            return JsonResponse(
                potential_customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sales_records(request):
    if request.method == "GET":
        sales_records = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_records": sales_records},
            encoder=SalesRecordEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
            salesperson = SalesPerson.objects.get(employee_number=content["salesperson"])
            content["salesperson"] = salesperson
            customer = PotentialCustomer.objects.get(phone_number=content["customer"])
            content["customer"] = customer
            sale = SalesRecord.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist or SalesPerson.DoesNotExist or PotentialCustomer.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not create the sales record"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_sales_record(request, pk):
    if request.method == "GET":
        try:
            sale = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = SalesRecord.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sale = SalesRecord.objects.get(id=pk)

            props = ["price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
