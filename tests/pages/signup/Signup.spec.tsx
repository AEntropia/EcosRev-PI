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

// Mockando o useRouter do Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Signup', () => {
  it('submits the form and redirects on success', async () => {
    // Mock do push do useRouter para verificar a navegação
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Mock da resposta do serviço createUser
    (userService.createUser as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(<Signup />);

    // Preenche os campos do formulário
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'password123' } });

    // Simula o clique no botão de submit
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));

    // Verifica se a função createUser foi chamada com os parâmetros corretos
    await waitFor(() => {
      expect(userService.createUser).toHaveBeenCalledWith({
        nome: 'Jane Doe',
        email: 'jane.doe@example.com',
        senha: 'password123',
      });

      // Verifica se o método push foi chamado para redirecionar o usuário
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays an error message when passwords do not match', () => {
    render(<Signup />);

    const passwordField = screen.getByLabelText('Senha');
    const confirmPasswordField = screen.getByLabelText('Confirmar Senha');
    const submitButton = screen.getByRole('button', { name: /criar conta/i });

    // Simula senhas diferentes
    fireEvent.change(passwordField, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'differentPassword' } });

    // Simula envio do formulário
    fireEvent.click(submitButton);

    // Verifica a mensagem de erro
    expect(screen.getByText('As senhas não coincidem!')).toBeInTheDocument();
  });

  it('displays an error message when the userService fails', async () => {
    // Mock de `createUser` para simular erro
    (userService.createUser as jest.Mock).mockRejectedValue(new Error('Erro ao cadastrar usuário!'));

    render(<Signup />);

    const nameField = screen.getByLabelText('Nome');
    const emailField = screen.getByLabelText('E-mail');
    const passwordField = screen.getByLabelText('Senha');
    const confirmPasswordField = screen.getByLabelText('Confirmar Senha');
    const submitButton = screen.getByRole('button', { name: /criar conta/i });

    // Preenche os campos com dados válidos
    fireEvent.change(nameField, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailField, { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(passwordField, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'password123' } });

    // Simula envio do formulário
    fireEvent.click(submitButton);

    // Verifica se o serviço foi chamado
    await waitFor(() => {
      expect(userService.createUser).toHaveBeenCalledWith({
        nome: 'Jane Doe',
        email: 'jane.doe@example.com',
        senha: 'password123',
      });
    });

    // Verifica a mensagem de erro
    expect(screen.getByText('Erro ao cadastrar usuário!')).toBeInTheDocument();
  });
});
