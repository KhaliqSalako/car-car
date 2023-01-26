import { useState, useEffect } from "react";

function ServiceAppointmentForm() {
  const [appointment, setAppointment] = useState([]);
  const [formData, setFormData] = useState({
    vin: "",
    customer_name: "",
    date: "",
    assigned_tehcnician: "",
    reason: "",
  });

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/technician/");

    if (response.ok) {
      const data = await response.json();
      setAppointment(data.appointment);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      "http://localhost:8080/api/service_appointment/",
      fetchConfig
    );

    if (response.ok) {
      setFormData({
        vin: "",
        customer_name: "",
        date: "",
        assigned_tehcnician: "",
        reason: "",
      });
    }
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
          <h1 className="header-title">Create a New Appoitment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={this.state.vin}
                placeholder="VIN"
                required
                type="text"
                name="vin"
                id="vin"
                maxLength={17}
                minLength={17}
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={this.state.customer_name}
                placeholder="Customer Name"
                required
                type="text"
                name="customer_name"
                id="customer_name"
                className="form-control"
              />
              <label htmlFor="customer_name">Customer Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={this.state.date}
                placeholder="Date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control"
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={this.state.assigned_technician}
                required
                name="assigned_technician"
                type="text"
                className="form-select"
              >
                <option value="">Technician</option>
                {this.state.technician.map((assigned_technician) => {
                  return (
                    <option
                      key={assigned_technician.employee_number}
                      value={assigned_technician.employee_number}
                    >
                      {assigned_technician.technician_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={this.state.reason}
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason for Visit</label>
            </div>
            <button className="btn btn-secondary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceAppointmentForm;
