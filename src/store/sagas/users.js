import { call, put, select } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';


export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);
    const isDuplicated = yield select(
      state => state.users.data.find(user => user.id === data.id),
    );

    if (isDuplicated) {
      yield put(UserActions.addUserFailure('Usuário duplicado!'));
      toast.error('Usuário duplicado!');
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        location: action.payload.userLocation,
      };
      yield put(UserActions.addUserSuccess(userData));
      toast('Usuário adicionado com sucesso');
    }
  } catch (err) {
    yield put(UserActions.addUserFailure('Erro ao adicionar usuário'));
    toast.error('Erro ao adicionar usuário');
  } finally {
    yield put(UserActions.addUserToggleModal(false));
  }
}
