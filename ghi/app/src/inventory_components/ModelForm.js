import React, { useState } from "react"
import { useEffect, useState } from "react"

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

    const
}
