<script lang="ts">
	import { gameState, type Velocity } from '$lib/stores/gameState';
	const handleKeyDown = (e: KeyboardEvent) => {
		console.log(e.key);
		const key = e.key;
		if (key.startsWith('Arrow')) {
			e.preventDefault();
			let direction;
			if (key === 'ArrowUp') {
				direction = { x: 0, y: -1 };
			} else if (key === 'ArrowDown') {
				direction = { x: 0, y: 1 };
			} else if (key === 'ArrowLeft') {
				direction = { x: -1, y: 0 };
			} else if (key === 'ArrowRight') {
				direction = { x: 1, y: 0 };
			}

			if (direction) {
				if (!($gameState.velocity.x === -direction.x || $gameState.velocity.y === -direction.y)) {
					gameState.set({
						...$gameState,
						velocity: direction as Velocity
					});
				}
			}
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />
