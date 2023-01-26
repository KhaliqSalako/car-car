import { useState } from 'react';

function TechnicianForm() {
    const [formData, setFormData] = useState({
        technician_name: '',
        employee_number:'',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch('http://localhost:8080/api/service_technician/', fetchConfig);

        if (response.ok) {
            setFormData({
                technician_name: '',
                employee_number:'',
            });
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="header-title">Add a New Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={this.state.technician_name} placeholder="Technician Name" required type="text" name="technician_name" id="technician_name" className="form-control"/>
                <label htmlFor="technician_name">Technician Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={this.state.employee_number} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-secondary">Add</button>
            </form>
          </div>
        </div>
      </div>

    )
}

export default TechnicianForm
