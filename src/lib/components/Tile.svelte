<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { gameState } from '$lib/stores/gameState';

	export let x: number;
	export let y: number;

	const getColor = (x: number, y: number) => {
		const { snake, food } = $gameState;

		if (snake.head.x === x && snake.head.y === y) {
			return 'bg-white';
		}

		for (const pos of snake.body) {
			if (pos.x === x && pos.y === y) {
				return 'bg-transparent';
			}
		}

		if (food.x === x && food.y === y) {
			// invert the color
			return 'bg-black';
		}
	};

	$: color = getColor(x, y);
	gameState.subscribe((state) => {
		color = getColor(x, y);
	});
</script>

<div class={twMerge('w-8 aspect-square bg-[#f2f2e6]', color)} />
