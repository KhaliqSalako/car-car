import { useState, useEffect } from 'react';

function ServiceAppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [vip, setVIP] = useState({vip: false});

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/service_appointment/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    };

    useEffect(() => {
        getData()
    }, []);

    const cancelAppointment = async (event) => {
        const url = `http://localhost:8080/api/service_appointment/${event}`;
        const fetchConfig = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await fetch(url, fetchConfig);
    };

    const finishedAppointment = async (event) => {
        const url = `http://localhost:8080/api/service_appointment/${event}`;
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify({is_finished: true}),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(url, fetchConfig);
    };

    const vipStatus = async (event) => {
        const url = `http://localhost:8080/api/service_appointment/${event}`;
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify({vip: true}),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(url, fetchConfig);
        setVIP({vip: true});
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>VIP</th>
                    <th>Date</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.customer_name}</td>
                            <td> <button type="button" className="btn btn-lg btn-primary" onClick={() => vipStatus(appointment.id)}>VIP</button></td>
                            <td>{appointment.date}</td>
                            <td>{appointment.assigned_technician.technician_name}</td>
                            <td>{appointment.reason_for_service}</td>
                            <td> <button type="button" className="btn btn-lg btn-primary" onClick={() => cancelAppointment(appointment.id)}>Cancel</button></td>
                            <td> <button type="button" className="btn btn-lg btn-primary" onClick={() => finishedAppointment(appointment.id)}>Finished</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ServiceAppointmentList;
