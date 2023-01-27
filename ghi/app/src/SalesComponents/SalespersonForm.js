import { useState } from 'react';

function SalespersonForm() {
  const [formData, setFormData] = useState({
    name: '',
    employee_number: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('http://localhost:8090/api/employees/', fetchConfig);

    if (response.ok) {
      setFormData({
        name: '',
        employee_number: '',
      });
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>New Salesperson</h1>
          <form onSubmit={handleSubmit} id="Add New Salesperson">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.employee_number} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
