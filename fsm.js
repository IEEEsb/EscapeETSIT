const { terminal: term } = require( 'terminal-kit' );
const State = require('./state.js');


let state = '';
let states = {};
let store = {};

let stop = () => {
	term.processExit(0)
}

module.exports.start = (_state) => {
	term.clear();
	state = _state;
	states[state].start();
}

module.exports.getStore = () => {
	return store;
}

module.exports.store = (_store) => {
	Object.assign(store, _store);
}

module.exports.changeState = (_state) => {
	if(_state === 'stop') {
		return stop();
	}
	states[state].stop();
	state = _state;
	states[state].start();
}

module.exports.addState = (_state) => {
	states[_state.name] = _state;
}
