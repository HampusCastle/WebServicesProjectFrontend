import React, { Component, ErrorInfo } from 'react';
import { toastError } from '../api/Toastify';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        toastError('An unexpected error occurred.');
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        return hasError ? (
            <h1 className="text-red-500">Something went wrong.</h1>
        ) : (
            children
        );
    }
}

export default ErrorBoundary;
