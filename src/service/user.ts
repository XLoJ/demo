import { reactive, ref } from '@vue/composition-api';
import { api } from '@/service/api';
import { getItem, removeItem, setItem } from '@/service/store';
import { AccessTokenKey } from '@/service/constant';

interface User {
  id: number;
  nickname: string;
  username: string;
  groups: any;
}

const user: User | Record<never, never> = {};
const isLogin = { flag: 0 };
// 0 : nothing; 1: OK; -1: Waiting;

if (getItem(AccessTokenKey)) {
  isLogin.flag = -1;
  api.get('/profile').then(({ data }) => {
    (user as User).id = data.id;
    (user as User).nickname = data.nickname;
    (user as User).username = data.username;
    (user as User).groups = data.groups;
    isLogin.flag = 1;
  });
}

export async function userLogin(username: string, password: string) {
  const { data } = await api.post('/login', {
    username,
    password
  });
  setItem(AccessTokenKey, data.access_token);
  {
    const { data } = await api.get('/profile');
    (user as User).id = data.id;
    (user as User).nickname = data.nickname;
    (user as User).username = data.username;
    (user as User).groups = data.groups;
    isLogin.flag = 1;
  }
  return useUser();
}

export function userLogout() {
  isLogin.flag = 0;
  removeItem(AccessTokenKey);
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
