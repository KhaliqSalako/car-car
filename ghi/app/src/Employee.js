import React from "react";

function EmployeesList() {
  const [technicians, setTechnicians] = useState([]);
  const [employees, setEmployees] = useState({employee: ''});
  const [salesrecords, setSalesRecords] = useState([]);

  const getData = async () => {
    const responseSalespersons = await fetch('http://localhost:8090/api/employees/');
    const responseTechnicians = await fetch('http://localhost:8090/api/sales/');
    const responseEmployees = await fetch('http://localhost:8090/api/employees/')

    if (responseSalespersons.ok && responseSalesRecords.ok) {
      const dataSalespersons = await responseSalespersons.json();
      const dataTechnicians = await responseTechnicians.json();
      const dataEmployees = await responseEmployees.json();

      setSalespersons(dataSalespersons.salespersons);
      setTechnicians(dataTechnicians.assigned_technician);
      setEmployees(dataEmployees.employees)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
    <h1 className="header-title">List of Employees</h1>
    <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Employee ID</th>
            </tr>
        </thead>
        <tbody>
            {employees.map(employee => {
                return(
                    <tr key={employee.id}>
                        <td>{ employee.name }</td>
                        <td>{ employee.employee_id }</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>
)
}

export default EmployeesList
