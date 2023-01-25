import { useState, useEffect } from "react";

function AutomobileForm() {
    const [models, setModels] = useState([])
    const [formData, setFormData] = useState({
        vin: '',
        year: '',
        color: '',
        model: '',
    });

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch("http://localhost:8100/api/automobiles/", fetchConfig);

        if (response.ok) {
            setFormData({
                vin: '',
                year: '',
                color: '',
                model: '',
            });
        }
    }

    const handleFormChange = async (e) => {
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
              <h1>New Automobile</h1>
              <form onSubmit={handleSubmit} id="Add New Automobile">
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Vin</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.model} required name="model" id="model" className="form-select">
                    <option value="">Choose a Model</option>
                    {models.map(model => {
                      return (
                        <option key={model.href} value={model.id}>{model.name}</option>
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

export default AutomobileForm;
