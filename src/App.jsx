import FirstTask from './FirstTask';
import Header from './Header';
import Secondtask from './Secondtask';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<FirstTask />} />
            <Route path="/secondTask" element={<Secondtask />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
};

export default App;
