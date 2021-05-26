import { computed, reactive, ref } from '@vue/composition-api';
import { api } from '@/service/api';
import { getItem, removeItem, setItem } from '@/service/store';
import { AccessTokenKey } from '@/service/constant';
import { useLocalStorage } from '@vueuse/core';

interface User {
  id: number;
  nickname: string;
  username: string;
  groups: any;
}

let user: User | null = null;
// 0 : nothing; 1: OK; -1: Waiting;
const isLogin = { flag: 0 };

function updateUserState(data: User) {
  user = {
    id: data.id,
    nickname: data.nickname,
    username: data.username,
    groups: data.groups
  };
  isLogin.flag = 1;
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
  removeItem(AccessTokenKey);
  removeItem('contests/coming');
  removeItem('contests/end');
  removeItem('contests/private');
}

export function useUser() {
  const _user = ref(user);
  const _login = ref(isLogin);
  if (user == null) {
    const accessToken = useLocalStorage(AccessTokenKey, '');
    if (accessToken.value.length > 0) {
      _login.value.flag = -1;
      api
        .get('/profile')
        .then(({ data }) => {
          updateUserState(data);
          _user.value = data;
          _login.value.flag = 1;
        })
        .catch(() => {
          _login.value.flag = 0;
          userLogout();
        });
    }
  }
  const isUserAdmin = computed(() => {
    if (_login.value.flag === 1 && _user.value !== null) {
      return (
        _user.value.groups.find((g: any) => g.name === 'admin') !== undefined
      );
    } else {
      return false;
    }
  });
  const isAllowPolygon = computed(() => {
    if (_login.value.flag === 1 && _user.value !== null) {
      return (
        _user.value.groups.find((g: any) => g.name === 'polygon') !== undefined
      );
    } else {
      return false;
    }
  });
  return {
    user: _user,
    isLogin: _login,
    isUserAdmin,
    isAllowPolygon
  };
}

// export function isUserAdmin(_user: any) {
//   const { user, isLogin } = _user ? _user : useUser();
//   if (isLogin.value.flag === 1 && user.value !== null) {
//     return ref(
//       user.value.groups.find((g: any) => g.name === 'admin') !== undefined
//     );
//   } else {
//     return ref(false);
//   }
// }
//
// export function isAllowPolygon(_user: any) {
//   const { user, isLogin } = _user ? _user : useUser();
//   if (isLogin.value.flag === 1 && user.value !== null) {
//     return ref(
//       user.value.groups.find((g: any) => g.name === 'polygon') !== undefined
//     );
//   } else {
//     return ref(false);
//   }
// }

export async function getPolygonList() {
  const { data } = await api.get('/polygon/problems');
  return data;
}
