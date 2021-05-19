import { reactive, ref } from '@vue/composition-api';
import { api } from '@/service/api';
import { getItem, setItem } from '@/service/store';
import { AccessTokenKey, UserInfoKey } from '@/service/constant';

interface User {
  id: number;
  nickname: string;
  username: string;
}

let user: User | null = null;
let isLogin = false;

if (getItem(AccessTokenKey)) {
  user = JSON.parse(getItem(UserInfoKey)!);
  isLogin = true;
}

export async function userLogin(username: string, password: string) {
  const { data } = await api.post('/login', {
    username,
    password
  });
  isLogin = true;
  user = {
    id: data.user.id,
    nickname: data.user.nickname,
    username
  };
  setItem(AccessTokenKey, data.access_token);
  setItem(UserInfoKey, JSON.stringify(user));
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
