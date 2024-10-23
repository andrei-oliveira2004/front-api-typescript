import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layout";
import { useEffect, useMemo, useState } from "react";
import { IListagempessoa, Pessoaservice, } from "../../shared/services/api/Pessoas/Pessoasservice";
import { useDebounce } from "../../shared/hooks/UseDebounce";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<IListagempessoa[]>([]);
  const [totalcount, setTotalCount] = useState(0);
  const [isloading, setisLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''; 
  }, [searchParams]);

  useEffect(() => {
    setisLoading(true)
    debounce(() => {
      Pessoaservice.getAll(1, busca)
        .then((result) => {
          setisLoading(false)
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);


            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [busca]); 

  return (
    <LayoutBasePagina
      titulo="Listagem de Pessoas"
      barradeferramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >
    </LayoutBasePagina>
  );
};
