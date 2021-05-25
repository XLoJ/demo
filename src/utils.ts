import { getCurrentInstance } from '@vue/composition-api';
import { Base64 } from 'js-base64';
import dayjs from 'dayjs';

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

export function useSnackbar() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('must be called in setup');
  return vm.proxy.$buefy.snackbar;
}

export function useDialog() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('must be called in setup');
  return vm.proxy.$buefy.dialog;
}

export function b64encode(text: string) {
  return Base64.encodeURI(text);
}

export function b64decode(text: string) {
  return Base64.decode(text);
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function formatTime(timestamp: string) {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
}
