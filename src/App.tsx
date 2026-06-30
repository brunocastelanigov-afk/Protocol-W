import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Quiz from './pages/Quiz';
import Catalog from './pages/Catalog';
import LoadingPage from './pages/Loading';
import FinalTraining from './pages/FinalTraining';

export default function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Quiz />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/final-training" element={<FinalTraining />} />
      </Routes>
    </AnimatePresence>
  );
}
