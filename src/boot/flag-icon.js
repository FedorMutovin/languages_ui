import { boot } from 'quasar/wrappers';
import CountryFlag from 'vue-country-flag-next';

export default boot(({ app }) => {
  app.component('country-flag', CountryFlag);
});
