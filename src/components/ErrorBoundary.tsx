import React, { Component } from 'react';
import { toastError } from '../api/Toastify';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {
        toastError('An unexpected error occurred.');
    }

    render() {
        return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
    }
}

export default ErrorBoundary;