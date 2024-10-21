/**
 * @import connection para ser realizado a conecção com o banco de dados
 */
import { connection } from './connection.js';

const getCompanyTable = () => connection.table('company');

/**
 * 
 * @param {*} id 
 * @returns retorna o primeiro id da tabela onde seja igual ao id informado
 */
export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}
