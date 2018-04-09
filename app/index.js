function createStore () {
	// The store has 4 parts
	// 1 internal state
	// 2 get state
	// 3 listen to changes on state
	// 4 update changes on state

	let state
	let listeners = []

	const setState = () => state 

	const subscribe = (listener) => {
		listeners.push(listener)
		return () => {
			listeners = listeners.filter((l) => l !== listener)
		}
	}

		return {
			getState,
			subscribe,	
		}
	}

