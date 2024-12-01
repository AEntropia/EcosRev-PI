import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditTemplate from '@/components/templates/usuarios/EditTemplate'; // Ajuste o caminho conforme necessário
import { userService } from '../../../../routes/userRoute';
import { useRouter } from 'next/navigation';

// Mock dos serviços e hooks
jest.mock('../../../../routes/userRoute', () => ({
  userService: {
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock do Formik
jest.mock('formik', () => ({
  useFormik: jest.fn(() => ({
    handleSubmit: jest.fn(),
    values: {
      _id: '123',
      nome: 'Teste Usuario',
      email: 'teste@email.com',
      pontos: '100',
    },
    handleChange: jest.fn(),
    errors: {},
    setValues: jest.fn(),
  })),
}));

describe('EditTemplate', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  const mockUsuario = {
    _id: '123',
    nome: 'Teste Usuario',
    email: 'teste@email.com',
    senha: 'senha123',
    pontos: '100',
    tipo: 'usuario',
    ativo: true,
  };

  it('renderiza o formulário corretamente', () => {
    render(<EditTemplate usuario={mockUsuario} />);

    // Verifica o título
    expect(screen.getByText('Atualizar pontos')).toBeInTheDocument();

    // Verifica os campos de input
    const nomeInput = screen.getByLabelText('Nome');
    const pontosInput = screen.getByLabelText('Pontos');

    expect(nomeInput).toBeInTheDocument();
    expect(nomeInput).toBeDisabled();
    expect(pontosInput).toBeInTheDocument();
  });

  it('preenche o formulário com os dados do usuário', () => {
    render(<EditTemplate usuario={mockUsuario} />);

    const nomeInput = screen.getByLabelText('Nome');
    const pontosInput = screen.getByLabelText('Pontos');

    expect(nomeInput).toHaveValue('Teste Usuario');
    expect(pontosInput).toHaveValue(100);
  });

  

  it('chama deleteUser ao clicar no botão de deletar', async () => {
    render(<EditTemplate usuario={mockUsuario} />);

    // Encontra e clica no botão de deletar (que contém o ícone DeleteIcon)
    const deleteButton = screen.getByRole('button', { name: '' });
    fireEvent.click(deleteButton);

    // Verifica se o serviço de deleção foi chamado
    await waitFor(() => {
      expect(userService.deleteUser).toHaveBeenCalledWith('123');
    });

    // Verifica se foi redirecionado para a página de usuários
    expect(mockRouter.push).toHaveBeenCalledWith('/usuarios');
  });

  it('cancela a edição e volta para a página de usuários', () => {
    render(<EditTemplate usuario={mockUsuario} />);

    // Encontra e clica no botão de cancelar
    const cancelarButton = screen.getByText('Cancelar');
    fireEvent.click(cancelarButton);

    // Verifica se foi redirecionado para a página de usuários
    expect(mockRouter.push).toHaveBeenCalledWith('/usuarios');
  });
});