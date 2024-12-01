import React from "react";
import { Button } from "@mui/material";

interface ButtonAtomProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  sx?: object;
  onClick?: () => void;
}

const ButtonAtom: React.FC<ButtonAtomProps> = ({
  children,
  type = "button",
  fullWidth = false,
  variant = "contained",
  color = "primary",
  sx = {},
  onClick,
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      data-testid="submit-button" // Adicionado o data-testid
      sx={{
        ...sx,
        color: 'white',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonAtom;
