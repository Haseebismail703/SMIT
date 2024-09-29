import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Request from './Admin_pages/Reaquest';
import Team_member from './Admin_pages/Team_member';
import Services from './Admin_pages/Services';
import Admin_login from './Admin_pages/Admin_login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/request" element={<Request />} />
        <Route path="/admin/Team_member" element={<Team_member />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/login" element={<Admin_login />} />
      </Routes>
    </Router>
  );
}

export default App;
