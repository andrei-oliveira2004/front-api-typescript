import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pessoaservice } from '../../shared/services/api/Pessoas/Pessoasservice';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layout';
import { Snackbar, Button, Box, Paper, Grid, Typography, LinearProgress } from "@mui/material";
import { useForm } from 'react-hook-form';
import VTextField from '../../shared/forms/VtextField'

interface IFormData {
  nomeCompleto: string;
  email: string;
  CidadeId: number;
}

export const Detalhepessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm<IFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      Pessoaservice.getById(Number(id))
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setValue('nomeCompleto', result.nomeCompleto);
            setValue('email', result.email);
            setValue('CidadeId', result.CidadeId);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleSave = async (dados: IFormData, isSaveAndClose: boolean) => {
    setIsLoading(true);
    const saveAction = id === 'nova' ? Pessoaservice.create(dados) : Pessoaservice.updateById(Number(id), { id: Number(id), ...dados });

    saveAction
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro salvo com sucesso!');

          if (isSaveAndClose) {
            navigate('/pessoas');
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id: number) => {
    setIdToDelete(id);
    setSnackbarOpen(true);
  };

  const confirmDelete = () => {
    if (idToDelete !== null) {
      Pessoaservice.deleteById(idToDelete)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        })
        .finally(() => {
          setIdToDelete(null);
          setSnackbarOpen(false);
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setIdToDelete(null);
  };

  return (
    <LayoutBasePagina 
      titulo={id === 'nova' ? 'Nova Pessoa' : 'Detalhes da Pessoa'}
      barradeferramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmSalvar={() => handleSubmit((data) => handleSave(data, false))()} 
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvarEFechar={() => handleSubmit((data) => handleSave(data, true))()} 
        />
      }
    >
      <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined" padding={2}>
        <form onSubmit={handleSubmit((data) => handleSave(data, false))}>
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField
                  name="nomeCompleto"
                  label='Nome Completo'
                  disabled={isLoading}
                  control={control}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField
                  name="email"
                  label='Email'
                  disabled={isLoading}
                  control={control}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField
                  name="CidadeId"
                  label='Cidade'
                  disabled={isLoading}
                  control={control}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Deseja realmente excluir este registro?"
        action={
          <>
            <Button color="secondary" size="small" onClick={confirmDelete}>
              Confirmar
            </Button>
            <Button color="primary" size="small" onClick={handleSnackbarClose}>
              Cancelar
            </Button>
          </>
        }
      />
    </LayoutBasePagina>
  );
};
