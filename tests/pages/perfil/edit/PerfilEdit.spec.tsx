import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '@/app/perfil/edit/[slug]/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

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

describe('ProfilePage Component', () => {
  // Reusable setup function
  const setup = () => render(<ProfilePage />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the profile page with initial state', async () => {
    setup();

    // Check page title
    expect(screen.getByText('Perfil do Usuário')).toBeInTheDocument();

    // Check form fields initially
    await waitFor(() => {
      expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/endereço/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
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
      const passwordInput = screen.getByLabelText(/senha/i);

      // Change input values
      fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
      fireEvent.change(addressInput, { target: { value: '456 Test Street' } });
      fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });

      // Check if values are updated
      expect(nameInput).toHaveValue('Jane Smith');
      expect(addressInput).toHaveValue('456 Test Street');
      expect(passwordInput).toHaveValue('newpassword123');
    });
  });


  it('renders avatar with correct source', async () => {
    setup();

    // Wait for avatar to load
    await waitFor(() => {
      const avatar = screen.getByAltText('Foto do Perfil');
      expect(avatar).toHaveAttribute('src', 'https://example.com/profile.jpg');
    });
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
});