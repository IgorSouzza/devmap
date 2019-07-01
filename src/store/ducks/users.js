/**
 * Types
 */
export const Types = {
  ADD_TOGGLE_MODAL: 'users/ADD_TOGGLE_MODAL',
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ADD_FAILURE: 'users/ADD_FAILURE',
  REMOVE: 'users/REMOVE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
  modalVisible: false,
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_TOGGLE_MODAL:
      return { ...state, modalVisible: action.payload.modalVisible };
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.REMOVE:
      return { ...state, data: state.data.filter(user => user.id !== action.payload.id) };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addUserToggleModal: modalVisible => ({
    type: Types.ADD_TOGGLE_MODAL,
    payload: { modalVisible },
  }),
  addUserRequest: (user, userLocation) => ({
    type: Types.ADD_REQUEST,
    payload: { user, userLocation },
  }),
  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),
  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
  removeUser: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),
};
