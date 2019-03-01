const { terminal: term } = require( 'terminal-kit' );
const { changeState, store, getStore } = require('./fsm.js');
const Matrix = require('./matrix.js');
const State = require('./state.js');

module.exports.Commands = class Commands extends State {
	constructor() {
		super('commands');
		this.commands = ['login', 'help', 'stop', 'puzzle'];
		this.helpMsgs = ['Iniciar sesión en el sistema', 'Muestra esta ayuda', 'Detiene el juego'];
	}

	async start() {
		while (true) {
			term.green();
			const _store = getStore();
			if (_store.user) {
				term(_store.user, ' ');
			}
			term('> ');
			term.white();
			const input = (await term.inputField().promise).trim();
			term('\n');
			if(input === '') continue;
			if(this.commands.indexOf(input) < 0) {
				term('Comando Inválido.\n');
				term('Introducir "help" para recibir ayuda sobre los comandos.\n');
				continue;
			}
			if(input === 'help') {
				this.help();
				continue;
			}

			return changeState(input);
		}


	}

	help() {
		term('Comandos:\n');
		for (let i in this.commands) {
			term(`${this.commands[i]} - ${this.helpMsgs[i]}.\n`)
		}
	}
}

module.exports.Login = class Login extends State {
	constructor() {
		super('login');
		this.user = 'pepe';
		this.password = 'pelos';
	}

	async start() {
		while (true) {
			term('Introducir Usuario: ');
			const user = (await term.inputField().promise).trim();
			term('\n');
			term('Introducir Contraseña: ');
			const password = (await term.inputField().promise).trim();
			term('\n');
			if(user !== this.user || password !== this.password) {
				term('\nUsuario/Contraseña incorrectos.\n\n');
				return changeState('commands');
			}

			store({ user });

			term('\nUsuario y contraseña correctos.\n');
			term('Has iniciado sesión como: ', user, '\n');

			return changeState('commands');
		}
	}
}

module.exports.Puzzle = class Puzzle extends Matrix {
	constructor() {
		super('puzzle');
	}

	async start() {
		await super.start({
			width: 6,
			height: 4,
		});
	}

	endMatrix() {
		return changeState('commands');
	}

	stop() {
		super.stop();
	}
}
