import { Box, Button, Paper, TextField, useTheme, InputAdornment, Icon } from "@mui/material";
import { Environment } from "../../environments";

interface IFerramentasdeListagemProps {
  textobusca?: string;
  mostrarinputbusca?: boolean;
  onBusca?: (novotexto: string) => void;
  textobotao?: string;
  mostrarbotaonovo?: boolean;
  aoClicar?: () => void;
}

export const FerramentasdeListagem: React.FC<IFerramentasdeListagemProps> = ({
  textobusca = '',
  mostrarinputbusca = false,
  onBusca,
  textobotao = 'Novo',
  mostrarbotaonovo = true,
  aoClicar,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={0} 
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarinputbusca && (
        <TextField
          size="small"
          value={textobusca}
          onChange={(e) => onBusca?.(e.target.value)}
          placeholder= {Environment.INPUT_DE_BUSCA}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, maxWidth: '70%' }} 
        />
      )}
      
      <Box flex={1} display="flex" justifyContent="flex-end">
        {mostrarbotaonovo && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={aoClicar}
            endIcon={<Icon>add</Icon>}
          >
            {textobotao}
          </Button>
        )}
      </Box>
    </Box>
  );
};
