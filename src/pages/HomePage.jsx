import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLines from '../components/FloatingLines';
import { ArrowRight, Sparkles } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-screen h-screen overflow-hidden text-white flex flex-col justify-center items-center">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0">
                <FloatingLines />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-8 fade-in-up">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl animate-fade-in-down">
                    <Sparkles size={16} className="text-blue-400" />
                    <span className="text-sm font-medium text-blue-100/80 tracking-wide uppercase">Next Gen Loan Validation</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300 drop-shadow-sm animate-fade-in">
                    Intelligent <br />
                    Workflow Automation
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl leading-relaxed animate-fade-in delay-100">
                    Experience the future of banking operations. Streamline your loan application validation processes with our AI-powered autonomous agent system.
                    Simple, secure, and spectacularly efficient.
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => navigate('/app')}
                    className="group relative mt-8 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-95 animate-fade-in delay-200"
                >
                    Launch System
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />

                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>

            {/* Footer / Copyright */}
            <div className="absolute bottom-6 text-white/20 text-sm">
                © 2025 Tata Consultancy Services. All rights reserved.
            </div>

            {/* Simple CSS animation for entrance if not present globally */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 1s ease-out forwards;
                }
                .animate-fade-in-down {
                     animation: fadeIn 1s ease-out forwards;
                     transform: translateY(-20px);
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>
        </div>
    );
};

export default HomePage;
