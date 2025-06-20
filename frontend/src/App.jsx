import React from 'react';
import StockGraphs from './StockGraphs';
import AdminPage from './AdminPage';

function App() {
  const [admin, setAdmin] = React.useState(false);
  return (
    <div>
      <button onClick={() => setAdmin(!admin)}>
        {admin ? 'View Stocks' : 'Admin'}
      </button>
      {admin ? <AdminPage /> : <StockGraphs />}
    </div>
  );
}

export default App;