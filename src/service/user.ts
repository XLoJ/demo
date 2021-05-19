import { reactive, ref } from '@vue/composition-api';
import { api } from '@/service/api';

interface User {
  id: number;
  username: string;
}

let user: User | null = null;
let isLogin = false;

export async function userLogin(username: string, password: string) {
  const { data } = await api.post('/login', {
    username,
    password
  });
  isLogin = true;
  user = {
    id: data.id,
    username
  };
  return useUser();
}

export function useUser() {
  if (user === null) {
    return {
      isLogin
    };
  }
  const _user = reactive(user);
  return {
    isLogin,
    user: _user
  };
}
