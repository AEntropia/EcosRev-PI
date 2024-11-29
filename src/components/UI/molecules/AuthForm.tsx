import { Box, Typography } from "@mui/material";
import { FormTextField } from "../atoms/FormTextField";
import ButtonAtom from "../atoms/ButtonAtom";
import Link from "next/link";
import { styled } from "@mui/system";

const FormWrapper = styled(Box)({
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '10px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '400px',
  margin: 'auto',
  padding: '32px',
  width: '90%', 
});

interface AuthFormProps {
  formType: 'login' | 'signup';
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  confirmPassword?: string;
  onConfirmPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthForm = ({
  formType,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  confirmPassword,
  onConfirmPasswordChange
}: AuthFormProps) => {
  const isLogin = formType === 'login';
  
  return (
    <FormWrapper>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        {isLogin ? 'Login' : 'Cadastro'}
      </Typography>
      
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <FormTextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoFocus
          value={email}
          onChange={onEmailChange}
        />
        <FormTextField
          margin="normal"
          fullWidth
          id="password"
          label="Senha"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        
        {!isLogin && onConfirmPasswordChange && (
          <FormTextField
            margin="normal"
            fullWidth
            id="confirmPassword"
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
        )}

        <ButtonAtom
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin ? 'Login' : 'Cadastrar'}
        </ButtonAtom>
        
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          alignItems: 'center',
          width: '100%'
        }}>
          {isLogin ? (
            <>
              <Link href="/signup" passHref>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.main" }}>
                  Não tem uma conta? Cadastre-se
                </Typography>
              </Link>
              <Link href="/passwordRecovery" passHref>
                <Typography variant="body2">
                  Esqueceu a senha?
                </Typography>
              </Link>
            </>
          ) : (
            <Link href="/" passHref>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.main" }}>
                Já tem uma conta? Faça login
              </Typography>
            </Link>
          )}
        </Box>
      </Box>
    </FormWrapper>
  );
};