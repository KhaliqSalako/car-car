import { useState, useEffect } from 'react';

function ModelList() {
  const [models, setModels] = useState([]);

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/models/');

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
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
            <th>Manufacturer</th>
            <th>Name</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            return (
              <tr key={model.href}>
                <td>{model.manufacturer.name}</td>
                <td>{model.name}</td>
                {/* <div className="img-container"> */}
                <td>
                  <img src={model.picture_url} className="card-img-top" />
                </td>
                {/* </div> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ModelList;
