const url =  "https://api.fempoble.app/"
const pobles = `${url}pobles/tots`; // retorne tots els pobles
const festivitat = `${url}festivitats/activa?id=`; // retorne festivitat en llistat de dies i events
const contactar = `${url}pobles/contactar`; // post contacte
const poble_push = `${url}pobles/push`; // guardem token pa fer pushos
const festivitat_push = `${url}festivitats/push`; // guardem token pa fer pushos

export default {
  pobles,
  festivitat,
  contactar,
  poble_push,
  festivitat_push,
};
