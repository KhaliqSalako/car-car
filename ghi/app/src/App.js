import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './InventoryComponents/ManufacturerList';
import ManufacturerForm from './InventoryComponents/ManufacturerForm';
import AutomobileList from './InventoryComponents/AutomobileList';
import AutomobileForm from './InventoryComponents/AutomobileForm';
import SalespersonForm from './SalesComponents/SalespersonForm';
import CustomerForm from './SalesComponents/CustomerForm';

import ModelList from './inventory_components/ModelList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="model/">
          <Route path="list/" element={<ModelList />} />
          </Route>
        </Routes>
      </div>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="manufacturers/">
          <Route index element={<ManufacturerList />} />
          <Route path="new/" element={<ManufacturerForm />} />
        </Route>
        <Route path="automobiles/">
          <Route index element={<AutomobileList />} />
          <Route path="new/" element={<AutomobileForm />} />
        </Route>
        <Route path="employees/">
          {/* <Route index element={<EmployeesList />} /> */}
          <Route path="new/" element={<SalespersonForm />} />
        </Route>
        <Route path="customers/">
          <Route path="new/" element={<CustomerForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
