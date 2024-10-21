import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
    textobotaonovo?: string,

    mostrarbotaoSalvar?: boolean,
    mostrarbotaoSalvareVoltar?: boolean,
    mostrarbotaoApagar?: boolean,
    mostrarbotaoNovo?: boolean,
    mostrarbotaoVoltar?: boolean,


    mostrarbotaoSalvarCarregando?: boolean,
    mostrarbotaoSalvareVoltarCarregando?: boolean,
    mostrarbotaoApagarCarregando?: boolean,
    mostrarbotaoNovoCarregando?: boolean,
    mostrarbotaoVoltarCarregando?: boolean,


    aoClicaremSalvar?: () => void;
    aoClicaremSalvareVoltar?: () => void;
    aoClicaremApagar?: () => void;
    aoClicaremNovo?: () => void;
    aoClicaremVoltar?: () => void;
    }

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textobotaonovo = "Novo",
    mostrarbotaoSalvar = true,
    mostrarbotaoSalvareVoltar = false,
    mostrarbotaoApagar = true,
    mostrarbotaoNovo = true,
    mostrarbotaoVoltar = true,


    mostrarbotaoSalvarCarregando = false,
    mostrarbotaoSalvareVoltarCarregando = false,
    mostrarbotaoApagarCarregando = false,
    mostrarbotaoNovoCarregando = false,
    mostrarbotaoVoltarCarregando = false,


    aoClicaremSalvar,
    aoClicaremSalvareVoltar,
    aoClicaremApagar,
    aoClicaremNovo,
    aoClicaremVoltar,
    }) => {
  const down = useMediaQuery((theme:Theme)=> theme.breakpoints.down('sm')); 
  const mdDown = useMediaQuery((theme:Theme)=> theme.breakpoints.down('md')); 
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
        {(mostrarbotaoSalvar && !mostrarbotaoSalvarCarregando) && (
      <Button
        color='primary'
        disableElevation
        variant='contained'
        onClick={aoClicaremSalvar}
        startIcon={<Icon>save</Icon>}
     >
        <Typography variant='button' whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>Salvar</Typography>
        </Button>
        )}

        {mostrarbotaoSalvarCarregando &&(
           <Skeleton  width={108} height={60} />
        )}
         {(mostrarbotaoSalvareVoltar && !mostrarbotaoSalvareVoltarCarregando && !mdDown && !down) && (
      <Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={aoClicaremSalvareVoltar}
        startIcon={<Icon>save</Icon>}
      >
        <Typography variant='button' whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>Salvar e Voltar</Typography>
        </Button>
        )}
       {(mostrarbotaoSalvareVoltarCarregando && !mdDown && !down) &&(
           <Skeleton  width={108} height={60} />
        )}

      {(mostrarbotaoApagar && !mostrarbotaoApagarCarregando) &&(
      <Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={aoClicaremApagar}
        startIcon={<Icon>delete</Icon>}
      >
        <Typography variant='button' whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>Apagar</Typography>
        </Button>
      )}
      {mostrarbotaoApagarCarregando&&(
           <Skeleton  width={108} height={60} />
        )}
      {(mostrarbotaoNovo && !mostrarbotaoNovoCarregando && !down) && (
      <Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={aoClicaremNovo}
        startIcon={<Icon>add</Icon>}
      >
        <Typography variant='button' whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>{textobotaonovo}</Typography>
        </Button>
      )}
       {(mostrarbotaoNovoCarregando && !down) &&(
           <Skeleton  width={108} height={60} />
        )}

      {(
        mostrarbotaoVoltar && 
        (mostrarbotaoNovo || mostrarbotaoApagar || mostrarbotaoSalvar || mostrarbotaoSalvareVoltar)
      ) && (
        <Divider variant='middle' orientation='vertical'  />
      )}
        
      {(mostrarbotaoVoltar && !mostrarbotaoVoltarCarregando) && (
      <Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={aoClicaremVoltar}
        startIcon={<Icon>arrow_back</Icon>}
      >
        <Typography variant='button' whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={"hidden"}>Voltar</Typography>
        </Button>
      )}
       {mostrarbotaoVoltarCarregando&&(
           <Skeleton  width={108} height={60} />
        )}
    </Box>
  );
};
