<script lang="ts">
	import { setGameState, gameState } from '$lib/stores/gameState';
	import { onDestroy, onMount } from 'svelte';
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
			setGameState({
				...$gameState,
				food: {
					x: Math.floor(Math.random() * $gameState.boardWidth),
					y: Math.floor(Math.random() * $gameState.boardHeight)
				}
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
