"use client";

import { IUsuarios } from "@/interfaces/IUsuarios";
import { UsuarioEditValidator } from "@/validators/UsuarioEditValidator";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { userService } from "../../../../routes/userRoute";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../themes/userTheme";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";

interface EditTemplateProps {
  usuario?: IUsuarios;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ usuario }) => {
  const router = useRouter();
  const formik = useFormik<IUsuarios>({
    initialValues: {
      _id: "",
      nome: "",
      email: "",
      senha: "",
      pontos: "",
      tipo: "",
      ativo: false,
    },
    validationSchema: UsuarioEditValidator,
    onSubmit: (usuario) => {
      userService.updateUser(usuario)
      router.push("/usuarios");
    },
  });

  const { handleSubmit, values, handleChange, errors, setValues } = formik;

  useEffect(() => {
    if (!usuario) return;

    const { _id, ...prod } = usuario;
    setValues(usuario);
  }, [usuario, setValues]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        data-testid="edit-template-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography 
          variant="h5" 
          color="primary" 
          sx={{ mb: 2 }}
          data-testid="edit-template-title"
        >
          Atualizar pontos
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ width: "100%" }}
          data-testid="edit-form"
        >
          <TextField
            data-testid="nome-input"
            name="nome"
            label="Nome"
            fullWidth
            margin="normal"
            value={values.nome}
            onChange={handleChange}
            error={!!errors.nome}
            helperText={errors.nome}
            disabled
          />
          <TextField
            data-testid="pontos-input"
            name="pontos"
            label="Pontos"
            fullWidth
            margin="normal"
            type="number"
            value={values.pontos}
            onChange={handleChange}
            error={!!errors.pontos}
            helperText={errors.pontos}
          />

          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              mt: 3 
            }}
            data-testid="form-actions"
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button 
                data-testid="cancelar-button"
                variant="outlined" 
                color="primary" 
                sx={{
                  boxShadow: 3, 
                }} 
                onClick={() => router.push("/usuarios")}
              >
                Cancelar
              </Button>
              <ButtonAtom 
                data-testid="atualizar-button"
                variant="contained" 
                color="primary" 
                type="submit"
              >
                Atualizar
              </ButtonAtom>
            </Box>
            <Button 
              data-testid="deletar-button"
              variant="outlined" 
              sx={{
                boxShadow: 3, 
              }} 
              onClick={() => {
                userService.deleteUser(usuario?._id)
                router.push("/usuarios");
              }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditTemplate;