<script lang="ts">
	import { setGameState, gameState, type Coordinate } from '$lib/stores/gameState';
	import { onDestroy, onMount } from 'svelte';

	// create an array that stores all the positions of the board
	const possiblePositions: Coordinate[] = [];
	for (let x = 0; x < $gameState.boardWidth; x++) {
		for (let y = 0; y < $gameState.boardHeight; y++) {
			possiblePositions.push({ x, y });
		}
	}

	// create a function that returns all the positions that the snake is currently occupying
	const openPositions = () => {
		const { snake } = $gameState;
		const occupiedPositions = [snake.head, ...snake.body];
		return possiblePositions.filter(
			(pos) =>
				!occupiedPositions.some((occupiedPos) => occupiedPos.x === pos.x && occupiedPos.y === pos.y)
		);
	};

	const interval = setInterval(() => {
		const { velocity, snake } = $gameState;

		const clamp = (num: number, min: number, max: number) => {
			return Math.min(Math.max(num, min), max);
		};

		const newSnakePos = {
			x: clamp(snake.head.x + velocity.x, 0, $gameState.boardWidth - 1),
			y: clamp(snake.head.y + velocity.y, 0, $gameState.boardHeight - 1)
		};

		if (newSnakePos.x !== snake.head.x || newSnakePos.y !== snake.head.y) {
			snake.body.unshift(snake.head);
			snake.body.pop();
		}

		if (newSnakePos.x === $gameState.food.x && newSnakePos.y === $gameState.food.y) {
			snake.body.push(snake.head);

			const openPos = openPositions();
			const randomPos = openPos[Math.floor(Math.random() * openPos.length)];

			setGameState({
				...$gameState,
				food: randomPos
			});
		}

		gameState.set({
			...$gameState,
			snake: {
				...snake,
				head: newSnakePos
			}
		});
	}, 100);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>
