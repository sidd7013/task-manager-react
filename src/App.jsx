import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
      <Router>
        
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
     
      </Router>
 )
     


}

export default App
