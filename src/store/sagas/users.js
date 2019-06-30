import { call, put, select } from 'redux-saga/effects';
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
    } else {
      const userData = {
        id: data.id,
        location: action.payload.userLocation,
      };
      yield put(UserActions.addUserSuccess(userData));
      yield put(UserActions.addUserToggleModal(false));
    }
  } catch (err) {
    yield put(UserActions.addUserFailure('Erro ao adicionar usuário'));
  }
}
