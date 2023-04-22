import { writable } from 'svelte/store';

export type Coordinate = {
	x: number;
	y: number;
};

export type Snake = {
	head: Coordinate;
	body: Coordinate[];
};

export type Food = Coordinate;

export type Velocity = {
	x: -1 | 0 | 1;
	y: -1 | 0 | 1;
};

export type GameState = {
	boardWidth: number;
	boardHeight: number;
	snake: Snake;
	food: Food;
	velocity: Velocity;
};

export const gameState = writable<GameState>({
	boardWidth: 25,
	boardHeight: 25,
	snake: {
		head: { x: 10, y: 10 },
		body: [
			{ x: 9, y: 10 },
			{ x: 8, y: 10 },
			{ x: 8, y: 11 }
		]
	},
	food: { x: 15, y: 15 },
	velocity: { x: 1, y: 0 }
});

export const setGameState = (state: Partial<GameState>) => {
	gameState.update((prev) => ({ ...prev, ...state }));
};
