import {  Route, Routes } from 'react-router-dom';
import FlagDetails from './FlagDetails'; 
import Flags from './Flags';
import Navbar from './Navbar';

function App() {
  return (
    <div  className="bg-white  text-black dark:bg-gray-900  dark:text-white">
    <Navbar/>
    <Routes>
        <Route path="/" element={<Flags/>} />
        <Route path="/flag/:countryId" element={<FlagDetails />} /> 
    </Routes>
    </div>
  );
}

export default App;
