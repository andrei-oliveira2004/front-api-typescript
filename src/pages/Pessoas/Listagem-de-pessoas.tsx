import { useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBasePagina } from "../../shared/layout"
import { useEffect, useMemo } from "react"
import { Pessoaservice } from "../../shared/services/api/Pessoas/Pessoasservice"

export const ListagemPessoas: React.FC = () => {
    const [searchParams, setsearchParams] = useSearchParams()
     const busca = useMemo(()=>{
      return searchParams.get('busca') || ' '
     }, [searchParams])

     useEffect(()=>{
       Pessoaservice.getAll(1, busca)
       .then((result)=>{
         if(result instanceof Error){
          alert(result.message)
         }else{
         console.log(result)
         }
       })
     }, [busca])

        return (
            <LayoutBasePagina
              titulo='Listagem de Pessoas'
              barradeferramentas={
                <FerramentasDaListagem
                  mostrarInputBusca
                  textoBotaoNovo='Nova'
                  textoDaBusca = {busca}
                  aoMudarTextoDeBusca={texto => setsearchParams({busca: texto}, {replace: true})}

                  />
      }
    >
    </LayoutBasePagina>
        )
}