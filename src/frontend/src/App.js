import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './components/StartPage';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ManageBudgets from "./components/ManageBudgets";
import ManageTransactions from "./components/ManageTransactions";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/manage-budgets" element={<ManageBudgets />} />
              <Route path="/manage-transactions" element={<ManageTransactions />} />
              <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
