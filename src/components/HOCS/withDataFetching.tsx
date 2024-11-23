import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import axios from "axios";
import { userService } from "../../../routes/userRoute";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  pontos: string;
  ativo: boolean;
  // outros campos...
}

export const withDataFetching = () => (WrappedComponent: any) => {
  return function WithDataFetching(props: any) {
    const [data, setData] = useState<User>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchData = async () => {
        const id = props.params?.slug ? `/${props.params?.slug}` : "";
        try {
          const response = await userService.getUserById(`${id}`);
          setData(response);
        } catch (_error) {
          setError("Erro ao tentar realizar a consulta");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [props.params?.slug]);

    return (
      <>
        {error ? (
          <Alert severity="error" variant="filled" sx={{ marginTop: "70px" }}>
            <AlertTitle>Erro</AlertTitle>
            {error}
          </Alert>
        ) : undefined}
        <WrappedComponent {...props} data={data} />;
        {isLoading ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "calc(100vh / 2)",
              left: "calc(100vw/2)",
            }}
          />
        ) : undefined}
      </>
    );
  };
};
