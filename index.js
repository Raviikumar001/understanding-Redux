 

function todos(state = [], action)
{
  switch(action.type)
  {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter( (todo)=> todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map( (todo)=> todo.id != action.id
      ? todo 
      : Object.assign( {}, todo, {complete: !todo.complete}))
      default: 
      return state;
  }

}

function goals(state = [], action)
{
   switch(action.type)
   {
      case "ADD_GOAL":
        return state.concat([action.goal]);

      case "REMOVE_GOAL":
        return state.filter( (goal)=> goal.id !== action.id)
      default:
        return state;
   }
}

function App(state = {}, action)
{

  return {
    goals: goals(state.goals, action),
    todos: todos(state.todos, action)
  }
}

function createStore(reducer)
{
  let state;

  let listeners= [];

  const getState=()=> {
    return state;
  }

  const subscribe = (listener)=>{

    listeners.push(listener);

    return ()=>{
      listeners = listeners.filter( (l)=> l !== listener)
    }
  }

  const dispatch = (action)=>{
    
    state = reducer(state, action);

    listeners.forEach( (listener)=> listener());
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}

const store = createStore(App);

store.subscribe( ()=> {
  console.log("The new state is: ", store.getState());
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    todo: {
      id:0,
      name : 'walk the dog',
      complete: false
    }
  }
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'wash the car',
    complete: false
  }
});


store.dispatch({
  type: 'REMOVE_TODO',
  id:0
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id:1
})

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type:"REMOVE_GOAL",
  id:0
})

