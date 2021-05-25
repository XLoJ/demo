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

let user: User | null = null;
const isLogin = { flag: 0, polygon: false };

// 0 : nothing; 1: OK; -1: Waiting;

function updateUserState(data: User) {
  user = {
    id: data.id,
    nickname: data.nickname,
    username: data.username,
    groups: data.groups
  };
  isLogin.flag = 1;
  isLogin.polygon = isAllowPolygon().value;
}

if (getItem(AccessTokenKey)) {
  isLogin.flag = -1;
  api
    .get('/profile')
    .then(({ data }) => {
      updateUserState(data);
    })
    .catch(() => {
      userLogout();
    });
}

export async function userRegister(
  username: string,
  nickname: string,
  password: string
) {
  await api.post('/register', {
    username,
    nickname,
    password
  });
  return userLogin(username, password);
}

export async function userLogin(username: string, password: string) {
  const { data } = await api.post('/login', {
    username,
    password
  });
  setItem(AccessTokenKey, data.access_token);
  {
    const { data } = await api.get('/profile');
    updateUserState(data);
  }
  return useUser();
}

export function userLogout() {
  isLogin.flag = 0;
  isLogin.polygon = false;
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

export function isUserAdmin() {
  if (isLogin.flag === 1 && user !== null) {
    return ref(user.groups.find((g: any) => g.name === 'admin') !== undefined);
  } else {
    return ref(false);
  }
}

export function isAllowPolygon() {
  if (isLogin.flag === 1 && user !== null) {
    return ref(
      user.groups.find((g: any) => g.name === 'polygon') !== undefined
    );
  } else {
    return ref(false);
  }
}

export async function getPolygonList() {
  const { data } = await api.get('/polygon/problems');
  return data;
}
