import { useState, useEffect } from "react";

function SalesForm() {
  const [automobiles, setAutomobiles] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    automobile: "",
    salesperson: "",
    customer: "",
    price: "",
  });

  const getData = async () => {
    const responseAutomobiles = await fetch(
      "http://localhost:8100/api/automobiles/"
    );
    const responseSalespersons = await fetch(
      "http://localhost:8090/api/employees/"
    );
    const responseCustomers = await fetch(
      "http://localhost:8090/api/customers/"
    );

    if (
      responseAutomobiles.ok &&
      responseSalespersons.ok &&
      responseCustomers.ok
    ) {
      const dataAutomobiles = await responseAutomobiles.json();
      const dataSalespersons = await responseSalespersons.json();
      const dataCustomers = await responseCustomers.json();

      setAutomobiles(dataAutomobiles.autos);
      setSalespersons(dataSalespersons.salespersons);
      setCustomers(dataCustomers.potential_customers);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteAutomobile = async () => {
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `http://localhost:8100/api/automobiles/${formData.automobile}`,
      fetchConfig
    );

    if (response.ok) {
      let filterdAutomobiles = automobiles.filter(
        (automobile) => automobile.vin !== formData.automobile
      );
      setAutomobiles(filterdAutomobiles);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "http://localhost:8090/api/sales/",
      fetchConfig
    );

    if (response.ok) {
      setFormData({
        automobile: "",
        salesperson: "",
        customer: "",
        price: "",
      });
    }
    handleDeleteAutomobile();
  };

  const handleFormChange = async (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>New Sale</h1>
          <form onSubmit={handleSubmit} id="Add New Sale">
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.automobile}
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Choose an Automobile</option>
                {automobiles.map((automobile) => {
                  return (
                    <option key={automobile.href} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.salesperson}
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="">Choose a Salesperson</option>
                {salespersons.map((salesperson) => {
                  return (
                    <option
                      key={salesperson.employee_number}
                      value={salesperson.employee_number}
                    >
                      {salesperson.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.customer}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose a Customer</option>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.phone_number}>
                      {customer.phone_number}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.price}
                placeholder="Price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
