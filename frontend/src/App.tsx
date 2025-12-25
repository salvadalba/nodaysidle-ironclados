import { Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext.tsx';
import Landing from './pages/Landing';
import DemoPage from './pages/DemoPage';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
