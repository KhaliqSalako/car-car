from django.urls import path

from .views import (
    api_salespersons,
    api_salesperson,
    api_potential_customers,
    api_potential_customer,
    api_sales_records,
    api_sales_record,
)


urlpatterns = [
    path(
        "employees/",
        api_salespersons,
        name="api_salespersons",
    ),
    path(
        "employees/<int:employee_number>/",
        api_salesperson,
        name="api_salesperson",
    ),
    path(
        "customers/",
        api_potential_customers,
        name="api_potential_customers",
    ),
    path(
        "customers/<int:pk>/",
        api_potential_customer,
        name="api_potential_customer",
    ),
    path(
        "sales/",
        api_sales_records,
        name="api_sales_records",
    ),
    path(
        "sales/<int:pk>/",
        api_sales_record,
        name="api_sales_record",
    ),
]
