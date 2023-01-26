import { useState, useEffect } from 'react';

function ServiceHistory() {
  const [service_technician, setServiceTechnician] = useState([]);
  const [choice, setChoice] = useState({service_technician: ''});
  const [service_appointment, setServiceAppointment] = useState([]);

  const getData = async () => {
    const responseServiceTechnician = await fetch('http://localhost:8080/api/technician/');
    const responseServiceAppointment = await fetch('http://localhost:8080/api/appointment/');

    if (responseServiceTechnician.ok && responseServiceAppointment.ok) {
      const dataServiceTechnician = await responseServiceTechnician.json();
      const dataServiceAppointment = await responseServiceAppointment.json();

      setServiceTechnician(dataServiceTechnician.service_technician);
      setServiceAppointment(dataServiceAppointment.service_appointment);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChoice = async (e) => {
    const value = e.target.value;
    setChoice({
      service_technicians: value,
    });
  };

  const filteredServiceAppointment = service_appointment.filter((service_appointments) => service_appointments.service_technicians.employee_number === Number(choice.service_technicians));

  return (

    <div className="container">
        <div>
            <h1>Enter a VIN</h1>
            <div className="mb-3">
                <select onChange={handleChoice} value={choice.service_technicians} required name="service_technicians" id="service_technicians" className="form-select">
                  <option value="">Choose an appointment</option>
                  {service_technicians.map(service_technicians => {
                  return (
                  <option key={service_technicians.employee_number} value={service_technicians.employee_number}>{service_technicians.customer_name}</option>
                  );
                  })}
                </select>
              </div>
        </div>
    <table className="table">
        <thead>
            <tr>
                <th> VIN </th>
                <th> Customer Name </th>
                <th> Date </th>
                <th> Reason </th>
                <th> Technician </th>
            </tr>
        </thead>
        <tbody>
            {this.state.appointment_results.map(appointment => {
                return (
                    <tr key={filteredServiceAppointment.id}>
                        <td>{filteredServiceAppointment.vin}</td>
                        <td>{filteredServiceAppointment.customer_name}</td>
                        <td>{filteredServiceAppointment.date}</td>
                        <td>{filteredServiceAppointment.reason}</td>
                        <td>{filteredServiceAppointment.service_technician.technician_name}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </div>
)
}
