import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from '@/store/reducers';
import rootSaga from '@/store/sagas';
export const history = createBrowserHistory();

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    return {
        ...createStore(
            createRootReducer(history),
            compose(
                applyMiddleware(
                    routerMiddleware(history),
                    sagaMiddleware,
                ),
            )
        ),
        runSaga: sagaMiddleware.run(rootSaga)
    }
}