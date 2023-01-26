import { useState, useEffect } from 'react';

function ServiceAppointmentList() {
    const [appointments, setAppointment] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/appointment/');

        if (response.ok) {
            const data = await response.json();
            setAppointment(data.appointment)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    async cancelAppointment() {
        const url = 'http://localhost:8080/api/appointments/'
        const fetchConfig = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        await fetch(url, fetchConfig)
    }


    async finished() {
        const url = 'http://localhost:8080/api/appointments/'
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        await fetch(url, fetchConfig)
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Technician</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    return (
                        <tr key={appointment.href}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.customer_name}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.technician_name}</td>
                            <td>{appointment.reason_for_service}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AutomobileList;
