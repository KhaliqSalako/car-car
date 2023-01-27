import { useState, useEffect } from 'react';

function SalesHistory() {
  const [salespersons, setSalespersons] = useState([]);
  const [choice, setChoice] = useState({salesperson: ''});
  const [salesrecords, setSalesRecords] = useState([]);

  const getData = async () => {
    const responseSalespersons = await fetch('http://localhost:8090/api/employees/');
    const responseSalesRecords = await fetch('http://localhost:8090/api/sales/');

    if (responseSalespersons.ok && responseSalesRecords.ok) {
      const dataSalespersons = await responseSalespersons.json();
      const dataSalesRecords = await responseSalesRecords.json();

      setSalespersons(dataSalespersons.salespersons);
      setSalesRecords(dataSalesRecords.sales_records);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChoice = async (e) => {
    const value = e.target.value;
    setChoice({
      salesperson: value,
    });
  };

  const filteredSalesRecords = salesrecords.filter((sale_record) => sale_record.salesperson.employee_number === Number(choice.salesperson));

  return (
    <div className="container">
      <div className="shadow p-4 mt-4">
        <h1>Salesperson History</h1>
          <div className="mb-3">
            <select onChange={handleChoice} value={choice.salesperson} required name="salesperson" id="salesperson" className="form-select">
              <option value="">Choose a Salesperson</option>
              {salespersons.map(salesperson => {
              return (
              <option key={salesperson.employee_number} value={salesperson.employee_number}>{salesperson.name}</option>
              );
              })}
            </select>
          </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Salesperson</th>
                  <th>Customer</th>
                  <th>VIN</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesRecords.map(filteredSalesRecord => {
                  return(
                    <tr key={filteredSalesRecord.id}>
                      <td>{filteredSalesRecord.salesperson.name}</td>
                      <td>{filteredSalesRecord.customer.name}</td>
                      <td>{filteredSalesRecord.automobile.vin}</td>
                      <td>{filteredSalesRecord.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
      </div>
    </div>
  );
}

export default SalesHistory;
