import React, { Component, ErrorInfo } from 'react';
import { toastError } from '../api/Toastify';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        toastError('An unexpected error occurred.');
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <h1 className="text-red-500">Something went wrong.</h1>;
        }

        return children;
    }
}

export default ErrorBoundary;