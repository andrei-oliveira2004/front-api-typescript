import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layout";
import { useEffect, useMemo, useState } from "react";
import { IListagempessoa, Pessoaservice } from "../../shared/services/api/Pessoas/Pessoasservice";
import { useDebounce } from "../../shared/hooks/UseDebounce";
import {Icon,IconButton,LinearProgress,Pagination,Paper,Snackbar,Table,TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Environment } from "../../shared/environments";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagempessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''; 
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1'); 
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      Pessoaservice.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [busca, pagina, debounce]);

  const handleDelete = (id: number) => {
    setIdToDelete(id);
    setSnackbarOpen(true);
  };

  const confirmDelete = () => {
    if (idToDelete !== null) {
      Pessoaservice.deleteById(idToDelete)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => oldRows.filter(oldRow => oldRow.id !== idToDelete));
            alert('Registro apagado com sucesso!');
          }
        });
    }
    setIdToDelete(null);
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setIdToDelete(null);
  };

  return (
    <LayoutBasePagina
      titulo="Listagem de Pessoas"
      barradeferramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Tem certeza que deseja deletar este registro?"
        action={
          <>
            <Button color="inherit" onClick={confirmDelete}>Confirmar</Button>
            <Button color="inherit" onClick={handleSnackbarClose}>Cancelar</Button>
          </>
        }
        autoHideDuration={6000}
      />
    </LayoutBasePagina>
  );
};
