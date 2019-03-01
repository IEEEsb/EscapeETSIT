const { terminal: term, ScreenBuffer } = require( 'terminal-kit' );
const State = require('./state.js');

module.exports = class Matrix extends State {

	constructor(name) {
		super(name);
	}

	onKey(key, matches, data) {

	}

	left() {
		if(this.selected.x > 0) {
			this.selected.x--;
		}
	}

	right() {
		if(this.selected.x < this.matrix[0].length - 1) {
			this.selected.x++;
		}
	}

	up() {
		if(this.selected.y > 0) {
			this.selected.y--;
		}
	}

	down() {
		if(this.selected.y < this.matrix.length - 1) {
			this.selected.y++;
		}
	}

	async start(options) {
		this.selected = { x: 0, y: 0 };
		this.matrix = new Array(options.height).fill(new Array(options.width));
		this.boxWidth = Math.round(term.width / options.width);
		this.boxHeight = Math.round(term.height / options.height);
		this.screen = new ScreenBuffer({ dst: term });
		term.hideCursor();
		this.onKey = (key) => {
			switch (key) {
				case 'LEFT':
				this.left();
				break;
				case 'RIGHT':
				this.right();
				break;
				case 'UP':
				this.up();
				break;
				case 'DOWN':
				this.down();
				break;
				case 'ESCAPE':
				return this.endMatrix();
				break;
				default:
			}
			this.render();
		}
		term.on('key', this.onKey);
		term.clear();
		//term.column(0);
		await this.render();
	}

	async render() {
		for (let y = 0; y < this.matrix.length; y++) {
			for (let x = 0; x < this.matrix[y].length; x++) {
				await this.renderSquare({
					x: x * this.boxWidth,
					y: y * this.boxHeight,
					width: this.boxWidth,
					height: this.boxHeight,
					paddingX: 1,
					paddingY: 1,
					background: this.selected.x === x && this.selected.y === y ? 'white' : 'green',
				})
			}
		}
		this.screen.draw();
	}

	async renderSquare(options) {
		for (var i = 1; i < options.height - options.paddingY * 2; i++) {
			this.screen.put({
				x: options.x + options.paddingX,
				y: options.y + i,
				attr: {
					bgColor: options.background,
				},
			}, new Array(options.width - options.paddingX * 2).join(' '));
		}
	}

	stop() {
		term.removeListener('key', this.onKey);
		term.bgDefaultColor();
		term.hideCursor(false);
		term.clear();
	}
}

function delay(millis) {
	return new Promise(function(resolve, reject) {
		setTimeout(function () {
			resolve()
		}, millis);
	});
}
