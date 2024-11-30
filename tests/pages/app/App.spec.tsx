import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page'; // O caminho pode ser ajustado conforme necessário
import { login, isAdmin } from '@/app/login_api';
import { useRouter } from 'next/navigation';

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

// Mock da função login
jest.mock('@/app/login_api', () => ({
  login: jest.fn(),
  isAdmin: jest.fn(),
}));

// Mock do hook useRouter do Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home (Login Page)', () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it('renders the login form', () => {
    render(<Home />);

    // Verifica se os campos de entrada e o botão estão presentes
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('allows the user to input email and password', () => {
    render(<Home />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/senha/i);

    // Simula a digitação no campo de e-mail e senha
    fireEvent.change(emailField, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordField, { target: { value: 'password123' } });

    // Verifica se os campos de entrada estão com os valores corretos
    expect(emailField).toHaveValue('test@example.com');
    expect(passwordField).toHaveValue('password123');
  });

  it('calls login function when form is submitted with valid data', async () => {
    render(<Home />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    // Preenche o formulário
    fireEvent.change(emailField, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordField, { target: { value: 'password123' } });

    // Mock da função login para retornar sucesso
    (login as jest.Mock).mockResolvedValue(true);

    // Simula o envio do formulário
    fireEvent.click(submitButton);

    // Aguarda o redirecionamento após login bem-sucedido
    await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith('/home'));

    // Verifica se a função login foi chamada com os parâmetros corretos
    expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('shows an error message when login fails', async () => {
    render(<Home />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    // Preenche o formulário com dados válidos
    fireEvent.change(emailField, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordField, { target: { value: 'password123' } });

    // Mock da função login para simular falha
    (login as jest.Mock).mockResolvedValue(false);

    // Simula o envio do formulário
    fireEvent.click(submitButton);

    // Verifica se o alerta de erro é chamado
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Credenciais inválidas!'));
  });

  it('shows an alert if fields are empty and submit is clicked', async () => {
    render(<Home />);

    const submitButton = screen.getByRole('button', { name: /entrar/i });

    // Simula o envio do formulário sem preencher os campos
    fireEvent.click(submitButton);

    // Verifica se o alerta de erro é chamado
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Por favor, preencha os campos.'));
  });

  it('calls isAdmin when handleLogin is called', async () => {
    render(<Home />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailField, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordField, { target: { value: 'password123' } });

    // Mock de login e isAdmin
    (login as jest.Mock).mockResolvedValue(true);
    (isAdmin as jest.Mock).mockReturnValue(true);

    // Simula o envio do formulário
    fireEvent.click(submitButton);

    // Verifica se a função isAdmin foi chamada
    await waitFor(() => expect(isAdmin).toHaveBeenCalled());
  });
});
