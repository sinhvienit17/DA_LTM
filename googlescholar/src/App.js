import React from 'react'
import { Provider } from 'react-redux'
import store from './state'
import Home from './components/Home/index'

function App () {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
