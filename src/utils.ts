import { getCurrentInstance } from '@vue/composition-api';

export function useRoute() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('must be called in setup');
  return vm.proxy.$route;
}

export function useRouter() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('must be called in setup');
  return vm.proxy.$router;
}
