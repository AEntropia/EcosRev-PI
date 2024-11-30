/* eslint-disable react/display-name */
import { render, screen, waitFor } from "@testing-library/react";
import Beneficios from "@/app/beneficios/page";
import { benefitsService } from "../../../routes/benefitRoute";

jest.mock("../../../routes/benefitRoute", () => ({
  benefitsService: {
    getAllBenefits: jest.fn(),
  },
}));

jest.mock("@/components/HOCS/withAdminProtection", () => ({
  withAdminProtection: jest.fn((Component) => Component), // Mock que retorna o componente diretamente
}));

jest.mock("@/components/UI/organisms/CustomTable", () => {
  return ({ rows, headCells }: any) => (
    <table>
      <thead>
        <tr>
          {headCells.map((cell: any) => (
            <th key={cell.id}>{cell.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any) => (
          <tr key={row.id}>
            <td>{row.nome}</td>
            <td>{row.data}</td>
            <td>{row.endereco}</td>
            <td>{row.pontos}</td>
            <td>{row.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

describe("Beneficios Page", () => {
  it("renders the table with fetched data", async () => {
    const mockData = [
      {
        _id: "1",
        data: "2023-11-29",
        nome: "Benefício A",
        endereco: "Rua 123",
        pontos: 10,
        quantidade: 5,
      },
      {
        _id: "2",
        data: "2023-11-28",
        nome: "Benefício B",
        endereco: "Rua 456",
        pontos: 20,
        quantidade: 10,
      },
    ];

    // Configura o mock da API
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(mockData);

    // Renderiza o componente
    render(<Beneficios />);

    // Verifica os headers da tabela
    expect(await screen.findByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Endereço")).toBeInTheDocument();
    expect(screen.getByText("Pontos")).toBeInTheDocument();
    expect(screen.getByText("Quantidade")).toBeInTheDocument();

    // Aguarda que os dados sejam carregados
    await waitFor(() => {
      expect(screen.getByText("Benefício A")).toBeInTheDocument();
      expect(screen.getByText("Benefício B")).toBeInTheDocument();
    });

    // Verifica as linhas renderizadas
    expect(screen.getByText("Rua 123")).toBeInTheDocument();
    expect(screen.getByText("Rua 456")).toBeInTheDocument();
    screen.getAllByText("10").forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls the API on component mount", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue([]);

    render(<Beneficios />);

    // Verifica se a função da API foi chamada
    await waitFor(() => {
      expect(benefitsService.getAllBenefits).toHaveBeenCalledTimes(2);
    });
  });
});
