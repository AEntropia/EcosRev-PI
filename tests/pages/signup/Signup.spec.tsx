import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../../../src/app/signup/page';
import { userService } from '../../../routes/userRoute';
import { useRouter } from 'next/router'; // Importando useRouter

// Mock do serviço userService
jest.mock('../../../routes/userRoute', () => ({
  userService: {
    createUser: jest.fn(),
  },
}));

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

describe('Signup', () => {

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  
  it('submits the form and redirects on success', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (userService.createUser as jest.Mock).mockResolvedValue({ data: { success: true } });
  
    render(<Signup />);
  
    fireEvent.change(screen.getByTestId('nome-input'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByTestId('senha-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByTestId('submit-button'));
  
    await waitFor(() => {
      expect(userService.createUser).toHaveBeenCalledWith({
        nome: 'Jane Doe',
        email: 'jane.doe@example.com',
        senha: 'password123',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
  
  it('displays an error message when passwords do not match', () => {
    render(<Signup />);
  
    fireEvent.change(screen.getByTestId('senha-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'differentPassword' } });
    fireEvent.click(screen.getByTestId('submit-button'));
  
    expect(screen.getByTestId('error-message')).toHaveTextContent('As senhas não coincidem!');
  });
  
  it('displays an error message when the userService fails', async () => {
    (userService.createUser as jest.Mock).mockRejectedValue(new Error('Erro ao cadastrar usuário!'));
  
    render(<Signup />);
  
    fireEvent.change(screen.getByTestId('nome-input'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByTestId('senha-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('submit-button'));
  
    await waitFor(() => {
      expect(userService.createUser).toHaveBeenCalledWith({
        nome: 'Jane Doe',
        email: 'jane.doe@example.com',
        senha: 'password123',
      });
      expect(screen.getByTestId('error-message')).toHaveTextContent('Erro ao cadastrar usuário!');
    });
  });

});
