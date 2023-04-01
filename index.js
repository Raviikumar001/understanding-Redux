function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }

  return state;
}

function createStore(reducer) {
  let state;
  let listeners = [];

  const getstate = () => {
    return state;
  };
  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  const dispatch = (action) => {
    state = reducer(state, action);
    //call todos
    //loop over listeners and invoke them
    listeners.forEach((listener) => listener());
  };

  return {
    getstate,
    subscribe,
    dispatch,
  };
}

const store = createStore(todos);
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false,
  },
});
