import { useState, useEffect } from 'react';

function ServiceHistory() {
  const [automobiles, setAutomobiles] = useState([]);
  const [choice, setChoice] = useState({vin: ''});
  const [serviceAppointments, setServiceAppointments] = useState([]);

  const getData = async () => {
    const responseAutomobiles = await fetch('http://localhost:8100/api/automobiles/');
    const responseServiceAppointments = await fetch('http://localhost:8080/api/service_appointment/');

    if (responseAutomobiles.ok && responseServiceAppointments.ok) {
      const dataAutomobiles = await responseAutomobiles.json();
      const dataServiceAppointments = await responseServiceAppointments.json();

      setAutomobiles(dataAutomobiles.autos);
      setServiceAppointments(dataServiceAppointments.appointments);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChoice = async (e) => {
    const value = e.target.value;
    setChoice({
      vin: value,
    });
  };

  const filteredServiceAppointments = serviceAppointments.filter((serviceAppointment) => serviceAppointment.vin === (choice.vin));

  return (
    <div className="container">
      <h1>Service Appointment History</h1>
        <div className="mb-3">
          <select onChange={handleChoice} value={choice.vin} required name="vin" id="vin" className="form-select">
            <option value="">Choose a VIN</option>
            {automobiles.map(automobile => {
            return (
            <option key={automobile.href} value={automobile.vin}>{automobile.vin}</option>
            );
            })}
          </select>
        </div>
          <table className="table">
            <thead>
              <tr>
                <th> VIN </th>
                <th> Customer Name </th>
                <th> Date/Time </th>
                <th> Technician </th>
                <th> Reason </th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceAppointments.map(filteredServiceAppointment => {
                return (
                  <tr key={filteredServiceAppointment.id}>
                    <td>{filteredServiceAppointment.vin}</td>
                    <td>{filteredServiceAppointment.customer_name}</td>
                    <td>{filteredServiceAppointment.date}</td>
                    <td>{filteredServiceAppointment.assigned_technician.technician_name}</td>
                    <td>{filteredServiceAppointment.reason_for_service}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    </div>
  );
}

export default ServiceHistory;
