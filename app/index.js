function createStore (reducer) {
	// The store has 4 parts
	// 1 internal state
	// 2 get state
	// 3 listen to changes on state
	// 4 update changes on state

	let state
	let listeners = []

	const getState = () => state 

	const subscribe = (listener) => {
		listeners.push(listener)
		return () => {
			listeners = listeners.filter((l) => l !== listener)
		}
	}

	const dispatch = (action) => {
		// call todo
		// loop over listeners and invoke them
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	}

		return {
			getState,
			subscribe,
			dispatch,	
		}
	}

// App code
// create an action function to use when executing store.dispatch(xxxx)
// store.dispatch(() => {
// 	 console.log('The new state is: ', store.getState());
// })

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';


//Action creators
function addTodoAction (todo) {
	return {
		type: ADD_TODO,
		todo,
	}
}

function removeTodoAction (id) {
	return {
		type: REMOVE_TODO,
		id,
	}
}

function toggleTodoAction (id) {
	return {
		type: TOGGLE_TODO,
		id,
	}
}

function addGoalAction (goal) {
	return {
		type: ADD_GOAL,
		goal,
	}
}

function removeGoalAction (id) {
	reutrn {
		type: REMOVE_GOAL,
		id,
	}
}


// reducer function
function todos (state = [], action) {
	switch(action.type) {
		case ADD_TODO :
			return state.concat([action.todo])
		case REMOVE_TODO :
			return state.filter((todo) => todo.id !== action.id)
		case TOGGLE_TODO :
			return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}))
		default :
			return state
	}
}

// goals reducer
function goals (state = [], action) {
	switch(action.type) {
		case ADD_GOAL :
			return state.concat([action.goal])
		case REMOVE_GOAL :
			return state.filter((goal) => goal.id !== action.id)
		default :
			return state
	}
}

// Main root reducer
function app (state = {}, action) {
	return {
				todos: todos(state.todos, action),
				goals: goals(state.goals, action)
			}
}


const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})


store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false,
}))

store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
}))

store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))


store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
  }))


store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
  }))

store.dispatch(removeGoalAction(0))


