const url =  ( __DEV__ ? "http://6e8d1f09.ngrok.io/": "https://api.fempoble.app/");
const pobles = `${url}pobles/tots`; // retorne tots els pobles
const festivitat = `${url}festivitats/activa?id=`; // retorne festivitat en llistat de dies i events
const contactar = `${url}pobles/contactar`; // retorne festivitat en llistat de dies i events

export default {
  pobles,
  festivitat,
  contactar,
};
