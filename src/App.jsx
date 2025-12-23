import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import PageTransition from './components/PageTransition';
import './index.css';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <HomePage />
                        </PageTransition>
                    }
                />
                <Route
                    path="/app"
                    element={
                        <PageTransition>
                            <Dashboard />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
