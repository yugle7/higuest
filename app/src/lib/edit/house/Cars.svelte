<script>
	import { state } from '$lib';
	
	import { getWidth } from '$lib/data/edit';
	import { toCars } from '$lib/data/house';

	let count;
</script>

<span>
	<input
		bind:this={count}
		type="number"
		class="monospace font-24"
		bind:value={$state.cars}
		name="cars"
		min="0"
		placeholder="0"
		style="width: {getWidth($state.cars, 0, 5)}px"
	/>
	<button on:click|preventDefault={() => count.focus()}>
		{toCars($state)}
	</button>
</span>
