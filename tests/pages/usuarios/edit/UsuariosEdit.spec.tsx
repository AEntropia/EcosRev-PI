import { render, screen, waitFor } from '@testing-library/react';
import UsuariosEdit from '../../../../src/app/usuarios/edit/[slug]/page';
import { withAdminProtection } from '@/components/HOCS/withAdminProtection';
import { withDataFetching } from '@/components/HOCS/withDataFetching';
import { IUsuarios } from '@/interfaces/IUsuarios';
import EditTemplate from '@/components/templates/usuarios/EditTemplate';

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

// Mock do serviço de dados (para o HOC withDataFetching)
jest.mock('@/components/HOCS/withDataFetching', () => ({
  withDataFetching: () => (Component: React.ComponentType) => (props: any) => <Component {...props} data={[{
    _id: '1',
    nome: 'John Doe',
    email: 'john.doe@example.com',
    senha: 'password123',
    pontos: 100,
    tipo: 'admin',
    ativo: true,
  }]} />,
}));

// Mock do HOC withAdminProtection
jest.mock('@/components/HOCS/withAdminProtection', () => ({
  withAdminProtection: (Component: React.ComponentType) => Component,
}));

describe('UsuariosEdit Page', () => {
  it('renders the EditTemplate with user data', async () => {
    // Renderiza o componente com a propriedade "params" e "data" mockada
    render(<UsuariosEdit params={{ slug: '1' }} data={[{
      _id: '1',
      nome: 'John Doe',
      email: 'john.doe@example.com',
      senha: 'password123',
      pontos: 100,
      tipo: 'admin',
      ativo: true,
    }]} />);

    // Verifica se os dados estão sendo passados corretamente para o EditTemplate
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('updates state correctly when data is passed', async () => {
    const mockData = [{
      _id: '1',
      nome: 'Jane Smith',
      email: 'jane.smith@example.com',
      senha: 'password456',
      pontos: 200,
      tipo: 'user',
      ativo: false,
    }];

    render(<UsuariosEdit params={{ slug: '1' }} data={mockData} />);

    // Verifica se o estado foi corretamente atualizado
    await waitFor(() => expect(screen.getByText('Jane Smith')).toBeInTheDocument());
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('displays error if no data is provided', async () => {
    render(<UsuariosEdit params={{ slug: '1' }} data={[]} />);

    // Verifica se há algum tipo de mensagem de erro ou algo indicando que não há dados
    expect(screen.getByText('Erro ao carregar os dados!')).toBeInTheDocument();
  });

  it('renders with admin protection', () => {
    // Renderiza o componente com a proteção de admin diretamente
    render(<UsuariosEdit params={{ slug: '1' }} data={[{
      _id: '1',
      nome: 'John Doe',
      email: 'john.doe@example.com',
      senha: 'password123',
      pontos: 100,
      tipo: 'admin',
      ativo: true,
    }]} />);

    // Verifica que o componente com a proteção foi renderizado
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
