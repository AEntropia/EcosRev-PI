"use client";

import { useEffect, useState } from "react";
import { 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Checkbox, 
  Typography, 
  Box,
  TablePagination,
  useTheme,
  useMediaQuery
} from "@mui/material";
import Layout from "@/components/UI/organisms/Layout";
import { benefitsService } from "../../../../routes/benefitRoute";
import { userService } from "../../../../routes/userRoute";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";

interface SelectableTableProps {
  rows: IRow[];
  onRowSelect: (selectedRows: IRow[]) => void;
}

const SelectableTable: React.FC<SelectableTableProps> = ({ rows, onRowSelect }) => {
  const [selectedRows, setSelectedRows] = useState<IRow[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRowClick = (row: IRow) => {
    const isSelected = selectedRows.includes(row);
    const newSelectedRows = isSelected
      ? selectedRows.filter((r) => r._id !== row._id)
      : [...selectedRows, row];
    setSelectedRows(newSelectedRows);
    onRowSelect(newSelectedRows);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: isMobile ? 'calc(100vh - 300px)' : 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell 
                padding="checkbox"
                sx={{ 
                  bgcolor: 'background.paper',
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              ></TableCell>
              <TableCell sx={{ 
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider'
              }}>Nome</TableCell>
              <TableCell sx={{ 
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider'
              }}>Data</TableCell>
              {!isMobile && (
                <TableCell sx={{ 
                  bgcolor: 'background.paper',
                  borderBottom: 1,
                  borderColor: 'divider'
                }}>Endereço</TableCell>
              )}
              <TableCell sx={{ 
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider'
              }}>Pontos</TableCell>
              <TableCell sx={{ 
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider'
              }}>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row._id} onClick={() => handleRowClick(row)} hover>
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedRows.includes(row)} />
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.data}</TableCell>
                {!isMobile && <TableCell>{row.endereco}</TableCell>}
                <TableCell>{row.pontos}</TableCell>
                <TableCell>{row.quantidade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

const Beneficios = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<IRow[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [Points, setPoints] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const response = await userService.getLoggedUser();
      setPoints(Number(response[0].pontos))
    };

    const fetchBeneficios = async () => {
      const response = await benefitsService.getAllBenefits();
      const beneficios = response.map((beneficio: any) => ({
        _id: beneficio._id,
        data: beneficio.data,
        nome: beneficio.nome,
        endereco: beneficio.endereco,
        pontos: beneficio.pontos,
        quantidade: beneficio.quantidade,
      }));
      setRows(beneficios);
    };

    fetchBeneficios();
    fetchLoggedUser();
  }, []);

  const handleRowSelect = (selected: IRow[]) => {
    setSelectedRows(selected);
    setTotalPoints(selected.reduce((sum, row) => sum + Number(row.pontos), 0));
  };

  const handleExchange = async () => {
    if (totalPoints > Points) {
      alert("Você não tem pontos suficientes para realizar a troca.");
      return;
    }

    try {
      const updatedPoints = Points - totalPoints;

      await userService.updateUserPoints({ pontos: updatedPoints.toString() });
      setPoints(updatedPoints);

      for (const selected of selectedRows) {
        if (selected.quantidade > 0) {
          const updatedBenefit = {
            ...selected,
            quantidade: selected.quantidade - 1,
          };

          await benefitsService.updateBenefit(updatedBenefit);

          setRows((prevRows) =>
            prevRows.map((row) =>
              row._id === updatedBenefit._id ? { ...row, quantidade: updatedBenefit.quantidade } : row
            )
          );
        } else {
          alert(`O benefício ${selected.nome} está sem estoque.`);
        }
      }

      alert("Troca realizada com sucesso!");

      setTotalPoints(0);
      setSelectedRows([]);
    } catch (error) {
      console.error("Erro ao realizar troca:", error);
      alert("Erro ao realizar a troca. Tente novamente.");
    }
  };

  return (
    <Layout>
      <Container sx={{ 
        paddingTop: 4, 
        paddingBottom: 4,
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3,
        minHeight: '100vh'
      }}>
        <SelectableTable rows={rows} onRowSelect={handleRowSelect} />
        
        <Box 
          sx={{ 
            width: '100%',
            maxWidth: 300,
            bgcolor: 'background.paper',
            boxShadow: 3,
            py: 3,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            mx: 'auto',
            mt: 'auto'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="body1">
              {`Pontos Totais: ${totalPoints}`}
            </Typography>
            <Typography 
              variant="body1" 
              color={totalPoints > Points ? "error" : "inherit"}
              sx={{ mb: 2 }}
            >
              {`Seus pontos: ${Points}`}
            </Typography>
          </Box>
          
          <ButtonAtom
            variant="contained"
            disabled={selectedRows.length === 0 || totalPoints > Points}
            onClick={handleExchange}
          >
            Trocar
          </ButtonAtom>
        </Box>
      </Container>
    </Layout>
  );
};

export default Beneficios;