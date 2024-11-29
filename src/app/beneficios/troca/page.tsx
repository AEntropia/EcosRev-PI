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
  Modal 
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

  const handleRowClick = (row: IRow) => {
    const isSelected = selectedRows.includes(row);
    const newSelectedRows = isSelected
      ? selectedRows.filter((r) => r._id !== row._id)
      : [...selectedRows, row];
    setSelectedRows(newSelectedRows);
    onRowSelect(newSelectedRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>Pontos</TableCell>
            <TableCell>Quantidade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id} onClick={() => handleRowClick(row)} hover>
              <TableCell padding="checkbox">
                <Checkbox checked={selectedRows.includes(row)} />
              </TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.endereco}</TableCell>
              <TableCell>{row.pontos}</TableCell>
              <TableCell>{row.quantidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Beneficios = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<IRow[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [Points, setPoints] = useState(0);

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
    setModalOpen(true);
  };

  return (
    <Layout>
      <Container sx={{ position: 'relative', paddingTop: 4 }}>
        <SelectableTable rows={rows} onRowSelect={handleRowSelect} />
        
        <Modal 
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center", 
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              width: "auto", 
              maxWidth: 500,
              zIndex: 1300,
            }}
          >
            <Typography variant="h6">Total de Pontos Selecionados</Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                color: totalPoints > Points ? "red" : "inherit",
              }}
            >
              {`Pontos Totais: ${totalPoints}`}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {`Seus pontos: ${Points}`}
            </Typography>
          
            <ButtonAtom
              variant="contained"
              sx={{ mt: 4 }}
              onClick={async () => {
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
                  setModalOpen(false);
                } catch (error) {
                  console.error("Erro ao realizar troca:", error);
                  alert("Erro ao realizar a troca. Tente novamente.");
                }
              }}
            >
              Trocar
            </ButtonAtom>
          </Box>
        </Modal>
      </Container>
    </Layout>
  );
};

export default Beneficios;