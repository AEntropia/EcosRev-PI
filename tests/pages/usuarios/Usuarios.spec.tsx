import { render, screen, waitFor, act } from '@testing-library/react';
import Usuarios from '../../../src/app/usuarios/page';
import { userService } from '../../../routes/userRoute';
import { withAdminProtection } from '@/components/HOCS/withAdminProtection';
import CustomTable from '@/components/UI/organisms/CustomTable';
import Layout from '@/components/UI/organisms/Layout';
import { Container } from '@mui/material';

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

// Mock do serviço userService
jest.mock('../../../routes/userRoute', () => ({
  userService: {
    getAllUsers: jest.fn(),
  },
}));

// Mock do HOC withAdminProtection
jest.mock('@/components/HOCS/withAdminProtection', () => ({
  withAdminProtection: (Component: React.ComponentType) => Component,
}));

describe('Usuarios Page', () => {
  it('renders a table with user data', async () => {
    const mockUsers = [
      {
        _id: '1',
        nome: 'John Doe',
        email: 'john.doe@example.com',
        senha: 'password123',
        pontos: 100,
        tipo: 'admin',
      },
      {
        _id: '2',
        nome: 'Jane Smith',
        email: 'jane.smith@example.com',
        senha: 'password456',
        pontos: 200,
        tipo: 'user',
      },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    // Envolva a renderização em `act` para garantir que todas as atualizações de estado sejam processadas
    await act(async () => {
      render(<Usuarios />);
    });

    // Espera os dados serem carregados
    await waitFor(() => expect(userService.getAllUsers).toHaveBeenCalledTimes(1));

    // Verifica se os dados dos usuários estão sendo renderizados na tabela
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

});
