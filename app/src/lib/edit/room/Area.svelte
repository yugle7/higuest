<script>
	import { state } from '$lib';
	import { getWidth } from '$lib/data/edit';

	export let i = null;
	const data = i == null ? $state : $state.rooms[i];

	let area;
	let floor;
</script>

<span>
	<input
		class="monospace font-24"
		type="number"
		bind:this={area}
		bind:value={data.area}
		min="0"
		step="0.1"
		placeholder="0"
		style="width: {getWidth(data.area, 0, 5)}px"
	/>
	<button on:click|preventDefault={() => area.focus()}><span>м<sup>2</sup></span></button>

	<span class="side-5">на</span>

	<input
		type="number"
		bind:this={floor}
		class="monospace font-24"
		bind:value={data.floor}
		placeholder="1"
		style="width: {getWidth(data.floor, 1, 5)}px"
	/>
	<button on:click|preventDefault={() => floor.focus()}>этаже</button>
</span>
