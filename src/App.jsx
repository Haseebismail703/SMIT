import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Request from './Admin_pages/Reaquest';
import Team_member from './Admin_pages/Team_member';
import Services from './Admin_pages/Services';
import Admin_login from './Admin_pages/Admin_login';
import Career from './Admin_pages/Career';
import Add_job from './Admin_pages/Add_job';
import Create_appoiment from './Admin_pages/Add_appoiment';
import All_appoiment from './Admin_pages/All_appoiment'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/request" element={<Request />} />
        <Route path="/admin/Team_member" element={<Team_member />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/login" element={<Admin_login />} />
        <Route path="/admin/career" element={<Career />} />
        <Route path="/admin/add_job" element={<Add_job />} />
        <Route path="/admin/creat_appoiment" element={<Create_appoiment />} />
        <Route path="/admin/all_appoiment" element={<All_appoiment />} />
      </Routes>
    </Router>
  );
}

export default App;
