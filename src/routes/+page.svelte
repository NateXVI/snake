<script lang="ts">
	import Controls from '$lib/components/Controls.svelte';
	import GameLoop from '$lib/components/GameLoop.svelte';
	import Board from '../lib/components/Board.svelte';
</script>

<div class="w-full flex mt-16 justify-center">
	<div>
		<GameLoop />
		<Controls />
		<Board />
	</div>
</div>
