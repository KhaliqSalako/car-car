# CarCar

Team:

* Khaliq - Service
* Kenny - Sales

## Design

## Service microservice

I have 3 models named, AuutomobileVO, ServiceTechnician and ServiceAppointment.
AutomobileVO is a Value object with a character field specified to be 17 characters only and unique, it is a value object integrated from the Inventory Microservice.

The ServiceTechnician model has 2 properties named technician_name and employee_number. technician name has a basic argument of being a maximum of 200 characters while the employee number has argument that makes sure the data is an integer with the range 0-32767 and is unique. This is so that no two employee will have the same ID number to be able to properly identify each technician.

The ServiceAppointment model has 7 properties which are the vin, customer_name, date, assigned_technician, reason_for_service, vip and is_finished. The vin has the same fields and arguments with the AutomobileVO, the customer_name was a character field with max length of 200, the date has a date and time field and the assigned_technician has a Foreign Key Field. This foreign key field integrates and collects data from the ServiceTechnician model, it also has a on_delete feature with the argument PROTECT to make sure that if a delete action from AutomobileVO or Service Technician or ServiceAppointment within an instance in ServiceAppointment, it will not be deleted comepletely from the database. reason_for_service is a regular textField. vip and is_finished are boolean fields which means they only accept True or False and is defaulted at False.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
