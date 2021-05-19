import { reactive, ref } from '@vue/composition-api';
import { api } from '@/service/api';
import { getItem, removeItem, setItem } from '@/service/store';
import { AccessTokenKey, UserInfoKey } from '@/service/constant';

interface User {
  id: number;
  nickname: string;
  username: string;
}

let user: User | null = null;
const isLogin = { flag: false };

if (getItem(AccessTokenKey)) {
  user = JSON.parse(getItem(UserInfoKey)!);
  isLogin.flag = true;
}

export async function userLogin(username: string, password: string) {
  const { data } = await api.post('/login', {
    username,
    password
  });
  isLogin.flag = true;
  user = {
    id: data.user.id,
    nickname: data.user.nickname,
    username
  };
  setItem(AccessTokenKey, data.access_token);
  setItem(UserInfoKey, JSON.stringify(user));
  return useUser();
}

export function userLogout() {
  isLogin.flag = false;
  user = null;
  removeItem(AccessTokenKey);
  removeItem(UserInfoKey);
}

export function useUser() {
  if (user === null) {
    return {
      isLogin: reactive(isLogin)
    };
  }
  const _user = reactive(user);
  return {
    isLogin: reactive(isLogin),
    user: _user
  };
}
