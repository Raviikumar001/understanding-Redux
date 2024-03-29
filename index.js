function generateID()
{
   return Math.random().toString(36).substring(2) + (new Date().getTime().toString(36));
}


function createStore(reducer)
{

  let state = [];
  let listeners = []

  const getState= ()=>{
    return state;
  }

  const subscribe = (listener)=>{

    listeners.push(listener);
    return ()=>{
      listeners = listeners.filter( (l)=> l !== listener);
    }
  }

  const dispatch = (action)=>{
    state= reducer(state, action);
    listeners.forEach( (listener)=> listener());
  }

   return {
    getState,
    dispatch,
    subscribe,
   }


 

}

 const ADD_TODO= "ADD_TODO";
 const REMOVE_GOAL= "REMOVE_GOAL";
 const REMOVE_TODO = "REMOVE_TODO";
 const TOGGLE_TODO = "TOGGLE_TODO";
 const ADD_GOAL = "ADD_GOAL";

 function addTodoAction(todo)
 {
    return{
      type: ADD_TODO,
      todo
    }
 }

 function removeTodoAction(id)
 {

  return{
    type: REMOVE_TODO,
    id,
  }
 }

 function toggleTodoAction(id)
 {
  return {
     type: TOGGLE_TODO,
     id
  }
 }

 function addGoalAction(goal)
 {  

  return {
     type: ADD_GOAL,
     goal
  }

 }

 function removeGoalAction(id)
 {
    return {
      type: REMOVE_GOAL,
      id
    }
 }

function todos(state = [], action)
{

  switch(action.type)
  {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map( (todo)=> todo.id !== action.id
      ? todo
      : Object.assign({}, todo, {complete: !todo.complete}))
     default:
        return state;

    }

}


function goals(state = [], action)
{
  switch(action.type)
  {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter( (goal)=> goal.id !== action.id )
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




const store = createStore(App);

store.subscribe( ()=> {
   const {goals, todos} = store.getState();
  
   document.getElementById('goals').innerHTML = "";
   document.getElementById('todos').innerHTML = "";

   todos.forEach(addTodoDom)
   goals.forEach(addGoalToDom)
}) 


// dom connectin to functions. 
function createRemoveButton (onClick)
{
  const removebtn = document.createElement('button');
  removebtn.innerHTML = 'X';
  removebtn.addEventListener('click', onClick);
  return   removebtn;
}




function addTodoDom(todo)
{
  const node = document.createElement("li");
  const text = document.createTextNode(todo.name);
  const removeBtn = createRemoveButton(()=> {
    store.dispatch(removeTodoAction(todo.id))
  })
  node.appendChild(text); 
  node.appendChild(removeBtn);

  node.style.textDecoration = todo.complete ? "line-through" : "none";
  node.addEventListener("click", ()=> {
    store.dispatch(toggleTodoAction(
      todo.id
    ));
  })

  document.getElementById('todos')
    .appendChild(node);

}

function  addGoalToDom(goal)
{
  const node = document.createElement("li");
  const text = document.createTextNode(goal.name);

  const removeBtn = createRemoveButton(()=>{
    store.dispatch(removeGoalAction(goal.id));
  })
  node.appendChild(text);
  node.appendChild(removeBtn);

  document.getElementById('goals')
    .appendChild(node);

}

// store.dispatch(addTodoAction({
//   id:0,
//   name: "walk the dog",
//   complete:false
// }))

// store.dispatch(addTodoAction({
//   id: 1,
//   name: 'Make maggie',
//   complete: false
// }))




// store.dispatch(removeTodoAction(1))

// store.dispatch(toggleTodoAction(0))

// store.dispatch(addGoalAction( {
//   id: 0,
//   name: "Learn Redux"
// }
// ))

// store.dispatch(addGoalAction( {
//   id: 1,
//   name: "Learn Dancing"
// }
// ))

// store.dispatch(addGoalAction({
//   id: 1,
//   name: "Learn React"
// }))


// store.dispatch(removeGoalAction(0))


//DOM CODE

function Addtodo()
{
    
  const input = document.getElementById('todo');
  const name =  input.value;
  input.value= '';

  store.dispatch(addTodoAction(
      {
        id: generateID(),
        name,
        complete:false, 
      }  ))
  
}

function AddGoal()
{
  const input = document.getElementById('goal');
  const name = input.value;
  input.value = ""

  store.dispatch(addGoalAction(
      {
          id:generateID(),
          name,
          complete:false
      }
  ))
}

document.getElementById('todobtn')
.addEventListener("click",Addtodo)

document.getElementById('goalBtn')
.addEventListener("click",AddGoal)