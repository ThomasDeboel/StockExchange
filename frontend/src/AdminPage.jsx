import React, { useState } from 'react';

function AdminPage() {
  const [password, setPassword] = useState('');
  const [stock, setStock] = useState('AAPL');
  const [value, setValue] = useState('');
  const [type, setType] = useState('endOfDay');

  const handleSubmit = () => {
    fetch(`http://localhost:3001/api/admin/${type === 'endOfDay' ? 'setEndOfDay' : 'setImmediate'}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ stock, value: Number(value), password })
    })
      .then(r => r.text())
      .then(alert);
  };

  return (
    <div>
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <select value={stock} onChange={e => setStock(e.target.value)}>
        <option value="AAPL">AAPL</option>
        <option value="GOOG">GOOG</option>
      </select>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Value" type="number" />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="endOfDay">Set End of Day</option>
        <option value="immediate">Set Immediately</option>
      </select>
      <button onClick={handleSubmit}>Set Value</button>
    </div>
  );
}

export default AdminPage;