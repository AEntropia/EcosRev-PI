import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

interface LeafButtonProps extends ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  iconSrc: string | StaticImageData;
}

const LeafButton: React.FC<LeafButtonProps> = ({ 
  onClick, 
  children, 
  iconSrc,
  ...props 
}) => {
  const theme = useTheme();
  
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        borderColor: theme.palette.primary.main, 
        color: theme.palette.primary.main, 
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: `rgba(${theme.palette.primary.main.replace('#', '')}, 0.05)`, 
          borderColor: theme.palette.primary.main,
        },
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.45)",
        ...props.sx
      }}
      {...props}
    >
      <Image 
        src={iconSrc}
        alt="Leaf Icon"
        width={20}
        height={20}
        style={{ 
          marginRight: '8px',
        }}
      />
      {children}
    </Button>
  );
};

export default LeafButton;
