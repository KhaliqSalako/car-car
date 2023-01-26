import { useState, useEffect } from 'react';

function ModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer: '',
    });

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch('http://localhost:8100/api/models/', fetchConfig);

        if (response.ok) {
            setFormData({
                name: '',
                picture_url: '',
                manufacturer: '',
            });
        }
    };

    const handleFormChange = async (e) => {
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
              <h1>New Model</h1>
              <form onSubmit={handleSubmit} id="Add New Model">
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" />
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose a Manufacturer</option>
                    {manufacturers.map(manufacturer => {
                      return (
                        <option key={manufacturer.href} value={manufacturer.id}>{manufacturer.name}</option>
                      );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default ModelForm;
