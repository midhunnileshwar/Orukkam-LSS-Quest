import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-candy-red flex flex-col items-center justify-center text-white p-8 text-center">
                    <h1 className="text-4xl font-black mb-4">Oups! Something broke. 🧩</h1>
                    <p className="mb-8 text-lg opacity-90">The machine got jammed. Let's try resetting the game data.</p>
                    <div className="bg-black/20 p-4 rounded-xl mb-8 font-mono text-sm text-left w-full max-w-md overflow-auto">
                        {this.state.error?.toString()}
                    </div>
                    <button
                        onClick={this.handleReset}
                        className="bg-white text-candy-red px-8 py-4 rounded-full font-black text-xl shadow-cartoon hover:scale-105 transition"
                    >
                        Reset Game Data 🔄
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
