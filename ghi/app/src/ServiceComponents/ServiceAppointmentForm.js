import { useState, useEffect } from 'react';

function ServiceAppointmentForm() {
  const [vins, setVins] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
      vin: '',
      customer: '',
      date: '',
      assigned_tehcnician: '',
      reason:'',
  });

  const getData = async () => {
    const responseVins = await fetch('http://localhost:8100/api/automobiles/');
    const responseCustomers = await fetch('http://localhost:8090/api/customers/');
    const responseTechnicians = await fetch('http://localhost:8090/api/service_technician/');

    if (responseVins.ok && responseCustomers.ok && responseTechnicians.ok) {
      const dataVins = await responseVins.json();
      const dataCustomers = await responseCustomers.json();
      const dataTechnicians = await responseTechnicians.json();

      setVins(dataVins.autos);
      setCustomers(dataCustomers.potential_customers);
      setTechnicians(dataTechnicians.service_technicians);
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

    const response = await fetch('http://localhost:8080/api/service_appointment/', fetchConfig);

    if (response.ok) {
      setFormData({
        vin: '',
        customer: '',
        date: '',
        assigned_tehcnician: '',
        reason:'',
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
          <h1 className="header-title">Create a New Appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.vin} required name="vin" id="vin" className="form-select">
                <option value="">Choose a VIN</option>
                {vins.map(automobile => {
                return (
                  <option key={automobile.href} value={automobile.vin}>{automobile.vin}</option>
                );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                <option value="">Choose a Customer</option>
                {customers.map(customer => {
                return (
                  <option key={customer.id} value={customer.phone_number}>{customer.phone_number}</option>
                );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.date} placeholder="Date/Time" required type="datetime-local" name="date" id="date" className="form-control"/>
              <label htmlFor="date">Date/Time</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.assigned_tehcnician} required name="assigned_tehcnician" id="assigned_tehcnician" className="form-select">
                <option value="">Choose a Technician</option>
                {technicians.map(technician => {
                return (
                  <option key={technician.employee_number} value={technician.technician_name}>{technician.technician_name}</option>
                );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control"/>
              <label htmlFor="reason">Reason for Visit</label>
            </div>
            <button className="btn btn-secondary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceAppointmentForm;
