import axios from 'axios'
const { put } = require('redux-saga/effects')

function * getQuery (input) {
  const data = yield axios({
    method: 'get',
    url: `http://localhost:3000/api/?q=${input.q}`,
    headers: {
      mode: 'no-cors',
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(data => {
      return data.data
    })
    .catch(err => console.log(err))
  yield put({ type: 'GET_QUERY_SUCCESS', data })
}

export { getQuery }
