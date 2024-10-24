import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { Pessoaservice } from '../../shared/services/api/Pessoas/Pessoasservice';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layout';
import { VTextField } from '../../shared/forms';
import {Snackbar,Button} from "@mui/material";


export const Detalhepessoas: React.FC = () => {

  const { id = 'nova' } = useParams<'id'>(); 
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [idToDelete, setIdToDelete] = useState<number | null>(null); 


  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      Pessoaservice.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    console.log('Save');
  };
  
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
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
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
      titulo={id === 'nova' ? 'Nova Pessoa' : nome}
      barradeferramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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


