import { getCurrentInstance } from 'vue';

export function useApi() {
  const instance = getCurrentInstance();
  const api = instance.appContext.config.globalProperties.$api;

  return { api };
}
