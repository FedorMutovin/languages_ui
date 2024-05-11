import { ref } from "vue";

export function useDefaultData() {
  const loading = ref(false);

  return {
    loading,
  };
}
