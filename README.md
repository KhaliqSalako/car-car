# CarCar

Team:

* Khaliq - Service
* Kenny - Sales

## Design

CarCar is a boilerplate for any automotive dealerships to manage manufacturers, models, automobiles, salespersons, technicians, customers, appointments, and sales records. It can be customized to fit any business's unique needs.

## Service microservice

I have 3 models named, AuutomobileVO, ServiceTechnician and ServiceAppointment.
AutomobileVO is a Value object with a character field specified to be 17 characters only and unique, it is a value object integrated from the Inventory Microservice.

The ServiceTechnician model has 2 properties named technician_name and employee_number. technician name has a basic argument of being a maximum of 200 characters while the employee number has argument that makes sure the data is an integer with the range 0-32767 and is unique. This is so that no two employee will have the same ID number to be able to properly identify each technician.

The ServiceAppointment model has 7 properties which are the vin, customer_name, date, assigned_technician, reason_for_service, vip and is_finished. The vin has the same fields and arguments with the AutomobileVO, the customer_name was a character field with max length of 200, the date has a date and time field and the assigned_technician has a Foreign Key Field. This foreign key field integrates and collects data from the ServiceTechnician model, it also has a on_delete feature with the argument PROTECT to make sure that if a delete action from AutomobileVO or Service Technician or ServiceAppointment within an instance in ServiceAppointment, it will not be deleted comepletely from the database. reason_for_service is a regular textField. vip and is_finished are boolean fields which means they only accept True or False and is defaulted at False.

## Sales microservice

Models:

1. AutomobileVO is a value object of the Automobile model from the Inventory microservice. The vin property is a CharField with the arguments: max_length=17, unique=True, validators=[MinLengthValidator(17, "VIN number must be 17 characters")]). The arguments ensure that each VIN in the database is unique and has exactly 17 characters.

2. SalesPerson model has a name and employee_number property. The employee_number must be unique so that no 2 salespersons have the same employee number. Employee number is used as the salesperson's identifier because 2 salespersons can have the same name.

3. PotentialCustomer model has a name, address, and phone_number property. The phone_number must be unique so that no 2 customers have the same phone_number. Phone number is used as the customer's identifier because 2 customers can have the same name and/or address.

4. SalesRecord model has an automobile property that is a foreign key to the AutomobileVO model, a salesperson property that is a foreign key to the SalesPerson model, a customer property that is a foreign key to the PotentialCustomer model. The foreign keys allow data from those models to be incorporated in the SalesRecord model. The stand-alone price property of the SalesRecord model is not a foreign key to another model because it does not need data from another model. Price is a CharField rather than an IntegerField to allow users to input special characters such as commas, decimal points, and currency symbols. on_delete=models.PROTECT is used to ensure that if an AutomobileVO, SalesPerson, or PotentialCustomer instance within an instance of a SalesRecord is deleted, the associated AutomobileVO, SalesPerson, or PotentialCustomer data will not be deleted from the entire database.

Sales API Endpoints:

Salespersons:
POST/GET: http://localhost:8090/api/employees/
GET/PUT/DELETE: http://localhost:8090/api/"employees/<int:employee_number>/

Customers:
POST/GET: http://localhost:8090/api/customers/
GET/PUT/DELETE: http://localhost:8090/api/customers/<int:pk>/

Sales Records:
POST/GET: http://localhost:8090/api/sales/
GET/PUT/DELETE: http://localhost:8090/api/sales/<int:pk>/
