import {useEffect, useState} from React

function ModelList() {
    const [vehiclemodel, setVehicleModel] = useState([])

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/vehiclemodel");

        if (response.ok) {
            const data = await response.json();
            setVehicleModel(data.vehiclemodel)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <table className="table">
        <thead>
            <tr>
                <th> Name </th>
                <th> Photo </th>
                <th> Manufacturer </th>
            </tr>
        </thead>
        <tbody>
            {vehiclemodel.map(vehiclemodel => {
                return (
                <tr key= { vehiclemodel.href }>
                    <td> { vehiclemodel.name } </td>
                    <td> { vehiclemodel.picture_url } </td>
                    <td> { vehiclemodel.models } </td>
                </tr>

            );})}
        </tbody>
    </table>
    )
}
export default ModelList;
