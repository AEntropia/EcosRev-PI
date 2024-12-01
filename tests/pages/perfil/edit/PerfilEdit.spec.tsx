import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '../../../../src/app/perfil/edit/[slug]/page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

// Configurando o MSW para simular a API
const server = setupServer(
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: { first: 'John', last: 'Doe' },
            location: { street: { name: 'Main St', number: 123 } },
            picture: { large: 'https://example.com/avatar.jpg' },
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProfilePage', () => {
  it('renders the profile form with default values and fetches user data', async () => {
    render(<ProfilePage />);

    // Verificando se os elementos básicos estão presentes
    expect(screen.getByText('Perfil do Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Endereço')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();

    // Esperando que os dados da API sejam carregados
    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Main St, 123')).toBeInTheDocument();
      expect(screen.getByAltText('Foto do Perfil')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });
  });

  it('updates the form fields when user edits them', async () => {
    render(<ProfilePage />);

    // Esperar que os dados sejam carregados
    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    });

    // Simulando alteração no campo Nome
    const nameField = screen.getByLabelText('Nome');
    fireEvent.change(nameField, { target: { value: 'Jane Smith' } });
    expect(nameField).toHaveValue('Jane Smith');

    // Simulando alteração no campo Endereço
    const addressField = screen.getByLabelText('Endereço');
    fireEvent.change(addressField, { target: { value: 'Elm St, 456' } });
    expect(addressField).toHaveValue('Elm St, 456');

    // Simulando alteração no campo Senha
    const passwordField = screen.getByLabelText('Senha');
    fireEvent.change(passwordField, { target: { value: 'newpassword123' } });
    expect(passwordField).toHaveValue('newpassword123');
  });

  it('submits the form successfully and displays a confirmation alert', async () => {
    // Mock de `window.alert`
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    render(<ProfilePage />);

    // Esperar que os dados sejam carregados
    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    });

    // Simulando o envio do formulário
    const submitButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(submitButton);

    // Verificando se o alerta foi chamado
    expect(alertMock).toHaveBeenCalledWith('Alterações salvas com sucesso!');

    alertMock.mockRestore();
  });

  it('handles API errors gracefully', async () => {
    // Configurando a API para retornar erro
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<ProfilePage />);

    // Verificando se o console.error foi chamado
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    // O erro não impede a renderização do componente
    expect(screen.getByText('Perfil do Usuário')).toBeInTheDocument();

    // Verificando se o erro foi registrado
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao obter os dados do usuário:', expect.anything());
    });

    consoleErrorMock.mockRestore();
  });
});
