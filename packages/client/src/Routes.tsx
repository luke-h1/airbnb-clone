import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes: React.FC = () => {
  return (
    <Router>
      <Route path="/login" />
      <Route path="/register" />
      <Route path="/" />
      <Route path="/property/edit/:id" />
      <Route path="/property/:id" />
      <Route path="/property/create" />
    </Router>
  );
};
export default Routes;
