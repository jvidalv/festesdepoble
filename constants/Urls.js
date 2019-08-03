const url =  __DEV__ ? "https://0f7d1c44.ngrok.io/" : "https://api.fempoble.app/";
const pobles = `${url}pobles/tots`; // retorne tots els pobles
const festivitat = `${url}festivitats/activa?id=`; // retorne festivitat en llistat de dies i events
const festivitat_events = `${url}festivitats/events?`; // ESPERE una ID i un FILTRE (id=, filtre=) retorne llistat de events
const contactar = `${url}pobles/contactar`; // post contacte
const token = `${url}mains/token`; // guardem token pa fer pushos

export default {
  pobles,
  festivitat,
  festivitat_events,
  contactar,
  token,
};
