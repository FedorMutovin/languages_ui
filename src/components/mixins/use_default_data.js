import { ref } from 'vue';

export function useDefaultData() {
  const loading = ref(false);
  const errors = ref([]);

  return {
    loading,
    errors,
  };
}
