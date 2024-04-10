import Aside from "./components/aside-menu/App";
import DataAnalytics from "./scenes/data-analytics/App";
import Entities from "./scenes/Entities/App";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
      <div className="grid grid-cols-6 m-0 gap-2 min-h-screen">
        <Aside />
        <div className="col-span-5 bg-[#ffffff] px-5  pt-3">
          <Routes>
            <Route path="/Data-analytics" element={<DataAnalytics />}></Route>
            <Route path="/Entities" element={<Entities />}></Route>
          </Routes>
        </div>
      </div>
  );
}

export default App;
