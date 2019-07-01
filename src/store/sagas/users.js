import { call, put, select } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';


export function* addUser(action) {
  const notify = message => toast(message);
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);
    const isDuplicated = yield select(
      state => state.users.data.find(user => user.id === data.id),
    );

    if (isDuplicated) {
      yield put(UserActions.addUserFailure('Usuário duplicado!'));
      notify('Usuário duplicado!');
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        location: action.payload.userLocation,
      };
      yield put(UserActions.addUserSuccess(userData));
      yield put(UserActions.addUserToggleModal(false));
      notify('Usuário adicionado com sucesso');
    }
  } catch (err) {
    yield put(UserActions.addUserFailure('Erro ao adicionar usuário'));
    notify('Erro ao adicionar usuário');
  }
}
