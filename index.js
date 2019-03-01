const states = require( './states.js' );
const { start, addState } = require('./fsm.js');

for (let state of Object.keys(states)) {
	addState(new states[state]);
}

start('commands');
