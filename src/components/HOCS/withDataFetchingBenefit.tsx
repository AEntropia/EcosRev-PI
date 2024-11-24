import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import axios from "axios";
import { userService } from "../../../routes/userRoute";
import { useEffect, useState } from "react";
import { IBeneficios } from "@/interfaces/IBeneficios";
import { benefitsService } from "../../../routes/benefitRoute";

export const withDataFetchingBenefit = () => (WrappedComponent: any) => {
  return function WithDataFetching(props: any) {
    const [dados, setData] = useState<IBeneficios>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchData = async () => {
        const id = props.params?.slug ? `/${props.params?.slug}` : "";
        try {
          const response = await benefitsService.getBenefitsById(id);
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
        <WrappedComponent {...props} dados={dados} />;
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
