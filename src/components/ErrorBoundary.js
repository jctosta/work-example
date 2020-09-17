import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
        console.error(error);
        console.error(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container">
                    <h1 className="title">Something went wrong.</h1>
                    <div className="content">
                        <details>
                            {this.state.error.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;