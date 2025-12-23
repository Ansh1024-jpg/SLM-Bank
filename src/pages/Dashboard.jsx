import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import WorkflowCanvas from '../components/WorkflowCanvas';
import '../index.css';

function Dashboard() {
    // Theme state management
    const [theme, setTheme] = useState('dark');

    // Toggle Theme Effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="w-screen h-screen relative overflow-hidden bg-[var(--bg-dark)] transition-colors duration-300">
            {/* Background Gradient */}
            <div className="neo-gradient" />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 h-16 glass-panel mx-4 mt-4 flex items-center px-6 justify-between z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
                        L
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-[var(--text-primary)] tracking-wide transition-colors">Loan Validator</h1>
                        <p className="text-xs text-[var(--text-secondary)] transition-colors">Automated Workflow</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-[var(--bg-node)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:bg-[var(--glass-border)] cursor-pointer"
                        title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${theme === 'light' ? 'bg-green-600/10 border-green-600/20 text-green-700 font-medium' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme === 'light' ? 'bg-green-600' : 'bg-green-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'light' ? 'bg-green-600' : 'bg-green-500'}`}></span>
                        </span>
                        System Active
                    </div>
                </div>
            </header>

            {/* Main Canvas */}
            <main className="w-full h-full relative z-10">
                <WorkflowCanvas theme={theme} />
            </main>
        </div>
    );
}

export default Dashboard;
