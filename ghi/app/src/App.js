import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './InventoryComponents/ManufacturerList';
import ManufacturerForm from './InventoryComponents/ManufacturerForm';
import AutomobileList from './InventoryComponents/AutomobileList';
import AutomobileForm from './InventoryComponents/AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="manufacturers">
          <Route index element={<ManufacturerList />} />
          <Route path="add" element={<ManufacturerForm />} />
        </Route>
        <Route path="automobiles">
          <Route index element={<AutomobileList />} />
          <Route path="add" element={<AutomobileForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
