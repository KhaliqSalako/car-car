import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AutomobileDetails() {
    const [automobile, setAutomobile] = useState({});
    let {vin} = useParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await fetch(`http://localhost:8100/api/automobiles/${vin}`);

        if (response.ok) {
            const data = await response.json();
            setAutomobile(data);
        }
    };

    return (
        <div className="container">
            <p>VIN: {automobile.vin}</p>
            <p>Year: {automobile.year}</p>
            <p>Manufacturer: {automobile.model.manufacturer.name}</p>
            <p>Model: {automobile.model.name}</p>
            <p>Color: {automobile.color}</p>
        </div>
    );
}

export default AutomobileDetails;
