import Tasks from './pages/Tasks';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';

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
