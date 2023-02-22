
// Funcion para calcular edad, si es menor de 18 se pide
//  un nombre de Tutor al estudiante
export const calculate_age = (dateString) => {
  var birthday = +new Date(dateString);
  // The magic number: 31557600000 is 24 * 3600 * 365.25 * 1000, which is the length of a year
  const magic_number = 31557600000;
  return ~~((Date.now() - birthday) / (magic_number));
}