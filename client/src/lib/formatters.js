import moment from 'moment';

export function formatDate(isoString, style) {
  const locale = navigator.language; // Obtém o locale do navegador
  moment.locale(locale); // Define o locale para o moment.js

  // Verifica se a data ISO é válida
  const date = moment(isoString);
  if (!date.isValid()) {
    throw new RangeError('Invalid time value'); // Lança erro se a data for inválida
  }

  // Escolhe o formato com base no estilo selecionado
  let format;
  if (style === 'long') {
    format = 'DD MMM YYYY'; // Formato longo
  } else {
    format = 'L'; // Formato médio
  }

  return date.format(format); // Retorna a data formatada
}
