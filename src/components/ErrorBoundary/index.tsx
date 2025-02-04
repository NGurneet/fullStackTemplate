import React, { ErrorInfo } from "react";
import { Typography, Button, Box } from "@mui/material";

// Create a placeholder interface for the state
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // This lifecycle method is called when an error is thrown in a component inside the boundary
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error, errorInfo: null };
  }

  // This lifecycle method provides error information for debugging
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo: errorInfo,
    });
    console.error("Error Boundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            textAlign: "center",
            minHeight: "100vh",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* Space for the error image */}
          <Box
            sx={{
              width: 500,
              height: 500,
              borderRadius: "50%",
              backgroundImage: `url('public/assets/errorBoundary.jpg')`, // Replace with your image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginBottom: 3,
            }}
          />
          <Typography variant="h4" color="error" sx={{ marginBottom: 2 }}>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 4 }}>
            We encountered an unexpected error. Please try again later or refresh the page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
