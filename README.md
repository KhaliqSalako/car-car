# CarCar

Team:

* Khaliq - Service
* Kenny - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.































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
