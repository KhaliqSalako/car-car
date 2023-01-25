import React, { useState } from "react"
import { useEffect, useState } from "react"
import { renderMatches } from "react-router-dom"

function ModelForm() {
    const [vehiclemodel, setVehicleModel] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        manufacturer: "",
    })

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/vehiclemodel/");

        if(response.ok) {
            const data = await response.json();
            setVehicleModel(data.vehiclemodel);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch("http://localhost:8100/api/vehiclemodel/", fetchConfig);

        if (response.ok) {
            setFormData({
                name: ""
            });
        }
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            [inputName]: value
        });
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>New Vehicle Model</h1>
                <form onSubmit={this.submit} id="create-vehiclemodel-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.inputChange} value={this.state.name} required name="name" placeholder="Name" type="text" className="form-control"/>
                                    <label htmlFor="Name">Model Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.inputChange} value={this.state.picture_url} required name="picture_url" placeholder="Image URL" type="url" className="form-control"/>
                                    <label htmlFor="Picture_url">Image URL</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.inputChange} value={this.state.manufacturer} required name="manufacturer" className="form-select">
                                        <option value="">Choose a manufacturer</option>
                                        {this.state.manufacturers.map(manufacturer => {
                                            return (
                                                <option key={manufacturer.href} value={manufacturer.id}>
                                                    {manufacturer.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-secondary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

export default ModelForm;
