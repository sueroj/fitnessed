// TODO: refactor
import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';

import Main from 'components/Main';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid>
          <Routes>
            <Route path='/' element={<Main />}>
            </Route>
          </Routes>
      </Container>
    </BrowserRouter>
  );
}
