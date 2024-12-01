import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordReset from '@/app/passwordReset/page';
import { useRouter } from 'next/navigation';

jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode, href: string }) => {
      return <a href={href}>{children}</a>;
    }
  };
});

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});


describe('PasswordReset Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the password reset form correctly', () => {
    render(<PasswordReset />);

    // Verifica elementos principais usando data-testid onde possível
    expect(screen.getByTestId('page-title')).toHaveTextContent('Redefinir Senha');
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
  });
});