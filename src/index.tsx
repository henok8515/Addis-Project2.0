import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from '@redux-saga/core'
import { reducers } from './ducks/index'
import App from './App'
import './index.css'
import { mySaga } from './ducks/ducks'
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, thunk]

const store = createStore(reducers, compose(applyMiddleware(...middleware)))
sagaMiddleware.run(mySaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
