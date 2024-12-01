import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PerfilPage from '@/app/perfil/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material');
  return {
    ...originalModule,
    Snackbar: ({ open, message, ...props }: { open: boolean, message: string }) => (
      open ? <div data-testid="snackbar" {...props}>{message}</div> : null
    ),
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock Layout component
jest.mock('@/components/UI/organisms/Layout', () => {
  return function DummyLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      results: [
        {
          name: { first: 'John', last: 'Doe' },
          location: { 
            street: { 
              name: 'Main Street', 
              number: 123 
            } 
          },
          picture: { 
            large: 'https://example.com/profile.jpg' 
          }
        }
      ]
    }),
  })
) as jest.Mock;

describe('PerfilPage Component', () => {
  // Reusable setup function
  const setup = () => render(<PerfilPage />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the profile page with initial state', async () => {
    setup();

    // Check page title
    expect(screen.getByText('Perfil do Usuário')).toBeInTheDocument();

    // Check informative alert
    expect(screen.getByText('Esta página está em construção. Funcionalidades serão implementadas em breve.')).toBeInTheDocument();

    // Check form fields
    await waitFor(() => {
      expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/endereço/i)).toBeInTheDocument();
    });
  });

  it('fetches and displays user data', async () => {
    setup();

    // Wait for user data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByLabelText(/nome/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/endereço/i)).toHaveValue('Main Street, 123');
    });

    // Check if fetch was called
    expect(global.fetch).toHaveBeenCalledWith('https://randomuser.me/api/');
  });

  it('allows user to edit profile fields', async () => {
    setup();

    // Wait for initial data to load
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/nome/i);
      const addressInput = screen.getByLabelText(/endereço/i);

      // Change input values
      fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
      fireEvent.change(addressInput, { target: { value: '456 Test Street' } });

      // Check if values are updated
      expect(nameInput).toHaveValue('Jane Smith');
      expect(addressInput).toHaveValue('456 Test Street');
    });
  });

  it('opens snackbar on form submission', async () => {
    // Renderiza o componente
    render(<PerfilPage />);

    // Encontra o botão de salvar
    const salvarButton = screen.getByText('Salvar');

    // Simula o clique no botão de salvar
    fireEvent.click(salvarButton);
  });

  it('handles fetch error gracefully', async () => {
    // Mock fetch to throw an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));

    // Spy on console.error to check error handling
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    setup();

    // Wait for error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao obter os dados do usuário:', 
        expect.any(Error)
      );
    });

    // Restore mocks
    consoleSpy.mockRestore();
  });

  it('renders user image', () => {
    setup();

    // Check if user image is rendered
    const userImage = screen.getByAltText('User Image Perfil');
    expect(userImage).toBeInTheDocument();
  });
});