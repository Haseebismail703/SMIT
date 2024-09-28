import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Request from './Admin_pages/Reaquest';
import Team_member from './Admin_pages/Team_member';
import Services from './Admin_pages/Services';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/request" element={<Request />} />
        <Route path="/admin/Team_member" element={<Team_member />} />
        <Route path="/admin/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
