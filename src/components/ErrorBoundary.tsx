import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`ErrorBoundary caught an error in section '${this.props.sectionName || 'unknown'}':`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[300px] p-6 m-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-center backdrop-blur-sm z-50 relative">
            <h2 className="text-xl font-bold text-red-500 mb-2">
              Error rendering {this.props.sectionName ? `the ${this.props.sectionName} section` : "this component"}
            </h2>
            <p className="text-sm text-foreground/70 max-w-md mb-6 break-words">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-red-500/20"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Reload Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
