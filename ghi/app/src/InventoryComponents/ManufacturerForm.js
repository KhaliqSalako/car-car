import { useState } from 'react';

function ManufacturerForm() {
  const [formData, setFormData] = useState({
    name: '',
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

    const response = await fetch('http://localhost:8100/api/manufacturers/', fetchConfig);

    if (response.ok) {
      setFormData({
        name: '',
      });
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      [inputName]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>New Manufacturer</h1>
          <form onSubmit={handleSubmit} id="Add New Manufacturer">
            <div className="form-floating mb-3">
              <input onChange={handleNameChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
