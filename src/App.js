import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ProductoContextProvider from './contexts/ProductoContext';
import ProductoList from './components/ProductoList';

function App() {
  return (
    <div className="App">
        <ProductoContextProvider>
            <ProductoList/>
        </ProductoContextProvider>
    </div>
  );
}

export default App;
