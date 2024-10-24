import { Environment } from "../../../environments";
import { Api } from "../axios.config";


export interface IListagempessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  CidadeId: number;
}

export interface IDetalhepessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  CidadeId: number;
}

type IpessoascomTotalCount = {
  data: IListagempessoa[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<IpessoascomTotalCount | Error> => {
  try {
    const URL_Relative = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    console.log('URL utilizada para busca:', URL_Relative);
    const { data, headers } = await Api.get(URL_Relative);
    console.log('Dados retornados da API:', data); 
    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"] || Environment.LIMITE_DE_LINHAS),
      };
    }
    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao listar os registros.");
  }
};


const getById = async (id: number): Promise<IDetalhepessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);
    if (data) {
      return data;
    }
    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
  }
};

const create = async (dados: Omit<IDetalhepessoa, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhepessoa>(`/pessoas`, dados);
    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao criar o registro.");
  }
};

const updateById = async (id: number, dados: IDetalhepessoa): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
  }
};

export const Pessoaservice = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
