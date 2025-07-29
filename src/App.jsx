import { useState } from "react";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AppRoutes from "./routes/routes";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <TopBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <AppRoutes searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default App;
