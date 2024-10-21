
/**
 * @improt knex biblioteca que irá fazer a conecção com o nosso banco de dados
 */
import knex from 'knex';


/**
 * @param client informa qual é o banco de dados que será realizado a conecção
 * @param connection informa parar o banco de dados como criar a conecção com o banco
 */
export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/db.sqlite3',
  },
  useNullAsDefault: true,
});
