// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffcc00', // Primary color (can be updated globally)
    },
    secondary: {
      main: '#1976d2', // Secondary color (optional)
    },
    background: {
      default: '#1a1a1a', // Default background color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded button corners
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5", // Input background color
          borderRadius: 4, // Rounded inputs
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow for card-like effect
          borderRadius: 8, // Rounded corners for paper components
        },
      },
    },
  },
});

export default theme;

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#00bcd4', // Cyan tone for the primary color
//     },
//     secondary: {
//       main: '#9c27b0', // Purplish tone for the secondary color
//     },
//     background: {
//       default: '#fafafa', // Light background color
//       paper: '#ffffff', // White paper background for card-like components
//     },
//     text: {
//       primary: '#212121', // Dark text color for good contrast on light background
//       secondary: '#757575', // Lighter text for secondary content
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8, // Rounded button corners
//         },
//         containedPrimary: {
//           backgroundColor: '#00bcd4', // Cyan primary button color
//           color: '#ffffff', // White text color for primary buttons
//           '&:hover': {
//             backgroundColor: '#0097a7', // Darker cyan on hover
//           },
//         },
//         outlinedSecondary: {
//           borderColor: '#9c27b0', // Purplish outline for secondary buttons
//           color: '#9c27b0', // Purplish text for secondary buttons
//           '&:hover': {
//             borderColor: '#8e24aa', // Darker purple on hover
//             color: '#8e24aa', // Darker purple text on hover
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#f5f5f5", // Light background color for input fields
//           borderRadius: 4, // Rounded corners for input fields
//           '& .MuiInputBase-root': {
//             color: '#212121', // Text color inside the input
//           },
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow for card-like effect
//           borderRadius: 8, // Rounded corners for paper components
//           backgroundColor: '#ffffff', // Paper components with a white background
//         },
//       },
//     },
//   },
// });

// export default theme;
