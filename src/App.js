import React from 'react';
import Layout from './layout/layout'
import { 
    BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
