

// reducer function
function todos (state = [], action) {
	if (action.type === 'ADD_TODO') {
		return state.concat([action.todo])
	}

	return state
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

