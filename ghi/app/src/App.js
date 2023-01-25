import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

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
    </BrowserRouter>
  );
}

export default App;
