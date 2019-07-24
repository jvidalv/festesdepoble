const url =  "https://api.fempoble.app/"
const pobles = `${url}pobles/tots`; // retorne tots els pobles
const festivitat = `${url}festivitats/activa?id=`; // retorne festivitat en llistat de dies i events
const contactar = `${url}pobles/contactar`; // retorne festivitat en llistat de dies i events

export default {
  pobles,
  festivitat,
  contactar,
};
