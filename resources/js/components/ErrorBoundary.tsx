import React from 'react';

interface State {
    hasError: boolean;
    error?: Error | null;
}

export default class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: any) {
        // Log error to console for debugging
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 text-white p-6">
                    <div className="max-w-2xl w-full bg-gray-900 border border-red-600 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-red-400 mb-3">Something went wrong</h2>
                        <p className="text-sm text-slate-300 mb-4">An unexpected error occurred while rendering the app. Open the browser console for details.</p>
                        <pre className="text-xs text-red-200 bg-black/20 p-3 rounded max-h-64 overflow-auto">{String(this.state.error)}</pre>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => this.setState({ hasError: false, error: null })}
                                className="px-4 py-2 bg-yellow-500 text-black rounded"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children as React.ReactElement;
    }
}
