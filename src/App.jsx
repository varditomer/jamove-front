import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";


function App() {
  return <div className="app">
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </div>;
}

export default App;
