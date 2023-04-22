<script lang="ts">
	import { gameState, setGameState } from '../stores/gameState';
	import Tile from './Tile.svelte';
	let { boardWidth, boardHeight } = $gameState;

	$: containerStyle = `
    grid-template-columns: repeat(${boardWidth}, 1fr);
    background-image: url("https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg");
    background-size: cover;
  `;
</script>

<div>
	<div style={containerStyle} class="relative grid w-min rounded-lg overflow-hidden shadow-lg">
		<div class="absolute bottom-0 right-0 pr-4 pb-2">
			<h1 class="italic text-sm text-right">
				<span class="text-2xl">s</span>naké<span style="font-family: Helvetica" class="font-bold"
					>.</span
				>
			</h1>
		</div>
		{#each Array(boardHeight) as _, h}
			{#each Array(boardWidth) as _, w}
				<Tile x={w} y={h} />
			{/each}
		{/each}
	</div>
</div>
