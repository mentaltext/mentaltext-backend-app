export const generarNumeroAleatorio = (longitud: number): string => {
  let resultado = "";
  for (let i = 0; i < longitud; i++) {
    resultado += Math.floor(Math.random() * 10).toString();
  }
  return resultado;
};
