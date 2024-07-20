type State = {
  query: string;
};

type Action = {
  type: 'SET_QUERY';
  payload: string;
};

export const initialState: State = {
  query: '',
};

export const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
