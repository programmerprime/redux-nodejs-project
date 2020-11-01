const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE = "BUY_ICE";

// an action is nothing but an object with a type property, it can also have some other properties like payload etc.
// the action creator function returns an action object
function buyCake() {
  return {
    type: BUY_CAKE,
  };
}

function buyIce() {
  return {
    type: BUY_ICE,
  };
}

// action just describes what happened, but does not consider how the app's state will change, reducer takes care of that

// my application's state must be represented by a single object

const cakeInitialState = {
  numOfCakes: 10,
};

const iceCreamInitialState = {
  numOfIcecreams: 20,
};

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, // the initialstate object may contain several properties, we only change the numOfCakes property, the others need to remain same, that's why I am destructuring and returning the previous state object here and updating only the numOfCakes property
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case BUY_ICE:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducers, applyMiddleware(logger));

console.log("initial state = ", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIce());
store.dispatch(buyIce());

unsubscribe();
