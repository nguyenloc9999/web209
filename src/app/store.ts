import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { counterReducer } from '@/reducers/Counter';
import { productReducer } from '@/reducers/Product';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    counter: counterReducer,
    products: productReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;


// state => store(reducer) => state  = {count: 0}
// state => store(reducer) => state = { counter: { count: 0}, products: xxxx} => 







/* import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { counterReducer } from '@/reducers/Counter';
import { productReducer } from '@/reducers/Product';
import thunk from 'redux-thunk';
const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
        })
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
const rootReducer = combineReducers({
    counter: counterReducer,
    products: productReducer
})

const store = createStore(rootReducer, enhancer);
export default store; */