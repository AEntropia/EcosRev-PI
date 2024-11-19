"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Modal, Typography, Box, Button } from "@mui/material";
import Layout from "@/components/UI/organisms/Layout";
import { env } from "@/config/env";

interface SelectableTableProps {
  rows: IRow[];
  onRowSelect: (selectedRows: IRow[]) => void;
}

const SelectableTable: React.FC<SelectableTableProps> = ({ rows, onRowSelect }) => {
  const [selectedRows, setSelectedRows] = useState<IRow[]>([]);

  const handleRowClick = (row: IRow) => {
    const isSelected = selectedRows.includes(row);
    const newSelectedRows = isSelected
      ? selectedRows.filter((r) => r.id !== row.id)
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
            <TableCell>Endereço</TableCell>
            <TableCell>Pontos</TableCell>
            <TableCell>Quantidade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => handleRowClick(row)} hover>
              <TableCell padding="checkbox">
                <Checkbox checked={selectedRows.includes(row)} />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.points}</TableCell>
              <TableCell>{row.qtd}</TableCell>
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

  useEffect(() => {
    const fetchBeneficios = async () => {
      const response = await axios.get(`${env.apiBaseUrl}/beneficios`);
      const beneficios = response.data.map((beneficio: any) => ({
        id: beneficio.id,
        name: beneficio.nome,
        address: beneficio.endereco,
        points: beneficio.pontos,
        qtd: beneficio.quantidade,
      }));
      setRows(beneficios);
    };

    fetchBeneficios();
  }, []);

  const handleRowSelect = (selected: IRow[]) => {
    setSelectedRows(selected);
    setTotalPoints(selected.reduce((sum, row) => sum + Number(row.points), 0));
    setModalOpen(true);
  };

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>
        <SelectableTable rows={rows} onRowSelect={handleRowSelect} />
        
        {/* Condicionalmente renderiza o Box com o total de pontos, apenas se houverem itens selecionados */}
        {selectedRows.length > 0 && (
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", p: 4, borderRadius: 2, boxShadow: 24 }}>
            <Typography variant="h6">Total de Pontos Selecionados</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{`Pontos Totais: ${totalPoints}`}</Typography>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default Beneficios;
