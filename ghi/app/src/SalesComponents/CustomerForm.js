import { useState } from 'react';

function CustomerForm() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone_number: '',
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

        const response = await fetch('http://localhost:8090/api/customers/', fetchConfig);

        if (response.ok) {
            setFormData({
                name: '',
                address: '',
                phone_number: '',
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
              <h1>New Potential Customer</h1>
              <form onSubmit={handleSubmit} id="Add New Potential Customer">
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                  <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.phone_number} placeholder="Phone Number" type="text" required name="phone_number" id="phone_number" className="form-control" />
                  <label htmlFor="phone_number">Phone Number</label>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default CustomerForm;
