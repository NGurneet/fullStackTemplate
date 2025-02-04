// src/components/SubmitButton.tsx
import React from "react";
import { Button } from "@mui/material";
import theme from "../../theme";

interface SubmitButtonProps {
  text: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => (
  <Button
    variant="contained"
    fullWidth
    sx={{
      marginTop: 2,
      backgroundColor: theme.palette.primary.main, // Primary color from theme
      "&:hover": { backgroundColor: theme.palette.primary.main, },
    }}
    onClick={onClick}
  >
    {text}
  </Button>
);

export default SubmitButton;
