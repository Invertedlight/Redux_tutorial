
// {
//   type: 'ADD_TODO',
//   todo: {
//     id: 0,
//     name: 'Learn Redux',
//     complete: false,
//   }
// }

// {
//   type: 'ADD_TODO',
//   todo: {
//     id: 1,
//     name: 'Learn React',
//     complete: false,
//   }
// }

// {
//   type: 'REMOVE_TODO',
//   id: 0,
// }

// {
//   type: 'TOGGLE_TODO',
//   id: 0,
// }

// {
//   type: 'ADD_GOAL',
//   goal: {
//     id: 0,
//     name: 'Run a Marathon'
//   }
// }

// {
//   type: 'REMOVE_GOAL',
//   id: 0
// }

// create an action function to use when executing store.dispatch(xxxx)
// store.dispatch(() => {
// 	 console.log('The new state is: ', store.getState());
// })

// reducer function
function todos (state = [], action) {
	switch(action.type) {
		case 'ADD_TODO' :
			return state.concat([action.todo])
		case 'REMOVE_TODO' :
			return state.filter((todo) => todo.id !== action.id)
		case 'TOGGLE_TODO' :
			return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}))
		default :
			return state
	}
}

// goals reducer
function goals (state = [], action) {
	switch(action.type) {
		case 'ADD_GOAL' :
			return state.concat([action.goal])
		case 'REMOVE_GOAL' :
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


const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: 'REMOVE_GOAL',
  id: 0
})


