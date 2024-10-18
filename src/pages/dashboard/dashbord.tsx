import { BarradeFerramentas } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layout";


export const Dashboard: React.FC = () => {
    return (
      <LayoutBasePagina 
      titulo="Página Inicial" barradeferramentas={(
        <BarradeFerramentas
        mostrarinputbusca
        textobotao="Nova"
        
        />

      )}
      >
       Testando
      </LayoutBasePagina>
    );
  };
  
