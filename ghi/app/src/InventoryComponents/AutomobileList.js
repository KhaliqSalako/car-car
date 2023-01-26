import { useState, useEffect } from 'react';

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Year</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map(automobile => {
                        return (
                            <tr key={automobile.href}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.color}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AutomobileList;
