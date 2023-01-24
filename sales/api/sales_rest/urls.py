from django.urls import path

from .views import (
    api_salespersons,
    api_salesperson,
    api_potential_customers,
    
)

urlpatterns = [
    path(
        "salespersons/",
        api_salespersons,
        name="api_salespersons",
    ),
    path(
        "salesperson/<int:pk>/",
        api_salesperson,
        name="api_salesperson",
    ),
]
