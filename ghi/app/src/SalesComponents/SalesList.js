import { useState, useEffect } from 'react';

function SalesList() {
  const [sales, setSales] = useState([]);

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');

    if (response.ok) {
      const data = await response.json();
      setSales(data.sales_records);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Employee Number</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => {
            return (
              <tr key={sale.id}>
                <td>{sale.salesperson.name}</td>
                <td>{sale.salesperson.employee_number}</td>
                <td>{sale.customer.name}</td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
