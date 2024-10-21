import { FerramentasDeDetalhe} from '../../shared/components';
import {LayoutBasePagina } from '../../shared/layout'


export const Dashboard = () => {

  return (
    <LayoutBasePagina
      titulo='Página inicial'
      barradeferramentas={(
        <FerramentasDeDetalhe 
        mostrarbotaoSalvareVoltar
         mostrarbotaoNovo
         mostrarbotaoSalvareVoltarCarregando
         mostrarbotaoVoltar = {false} 
         />
      )}
    >
      Testando
    </LayoutBasePagina>
  );
};