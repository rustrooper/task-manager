import { useState } from 'react';

import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/TopBar';
import { AppRoutes } from './routes/routes';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <AppRoutes searchTerm={searchTerm} />
      </main>
    </div>
  );
};
