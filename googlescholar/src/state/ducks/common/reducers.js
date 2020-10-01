const initial = {
  q: '',
  data: []
}

const queryReducer = (state = initial, action) => {
  switch (action.type) {
    case 'GET_QUERY_SUCCESS': {
      return {
        ...state,
        data: action.data
      }
    }
    default:
      return {
        ...state
      }
  }
}

export { queryReducer }
