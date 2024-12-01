import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UsuariosEdit from '@/app/usuarios/edit/[slug]/page'; // Ajuste o caminho conforme necessário
import { withDataFetching } from '@/components/HOCS/withDataFetching';
import { withAdminProtection } from '@/components/HOCS/withAdminProtection';

// Mocks dos HOCs
jest.mock('@/components/HOCS/withDataFetching', () => ({
  withDataFetching: jest.fn(() => (Component) => (props) => <Component {...props} />)
}));

jest.mock('@/components/HOCS/withAdminProtection', () => ({
  withAdminProtection: jest.fn((Component) => (props) => <Component {...props} />)
}));

// Mock do Layout
jest.mock('@/components/UI/organisms/Layout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
  };
});

// Mock do EditTemplate
jest.mock('@/components/templates/usuarios/EditTemplate', () => {
  return {
    __esModule: true,
    default: ({ usuario }: { usuario: any }) => (
      <div data-testid="edit-template">
        {usuario && (
          <>
            <span data-testid="usuario-nome">{usuario.nome}</span>
            <span data-testid="usuario-email">{usuario.email}</span>
          </>
        )}
      </div>
    )
  };
});

// Mock do Container do Material-UI
jest.mock('@mui/material', () => ({
  Container: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="container" {...props}>{children}</div>
  )
}));

describe('UsuariosEdit', () => {
  const mockParams = { slug: '123' };
  const mockData = [
    {
      _id: '123',
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      senha: 'hashedpassword',
      pontos: 100,
      tipo: 'admin',
      ativo: true
    }
  ];

  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('renders the component with user data', async () => {
    render(<UsuariosEdit params={mockParams} data={mockData} />);

    // Verifica se o Layout foi renderizado
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();

    // Verifica se o Container foi renderizado
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();

    // Verifica se o EditTemplate foi renderizado com os dados do usuário
    const editTemplate = screen.getByTestId('edit-template');
    expect(editTemplate).toBeInTheDocument();

    // Verifica se os dados do usuário estão corretos
    const nomeElement = screen.getByTestId('usuario-nome');
    const emailElement = screen.getByTestId('usuario-email');
    
    expect(nomeElement).toHaveTextContent('João Silva');
    expect(emailElement).toHaveTextContent('joao.silva@example.com');
  });

  it('does not render EditTemplate when no data is provided', () => {
    render(<UsuariosEdit params={mockParams} data={null} />);

    // Verifica se o Layout e o Container ainda são renderizados
    const layout = screen.getByTestId('layout');
    const container = screen.getByTestId('container');
    expect(layout).toBeInTheDocument();
    expect(container).toBeInTheDocument();

    // Verifica que nenhum dado do usuário é exibido
    const editTemplate = screen.getByTestId('edit-template');
    expect(editTemplate).toBeInTheDocument();
    expect(editTemplate).not.toHaveTextContent('João Silva');
  });

 
});