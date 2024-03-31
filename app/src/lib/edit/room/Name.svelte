<script>
	import { state } from '$lib';
	import { getWidth } from '$lib/data/edit';

	export let i;
	const data = i == null ? $state : $state.rooms[i];
</script>

<h2 class="top line-1">
	<input
		type="number"
		class="monospace font-24 right-5"
		bind:value={data.number}
		min="1"
		placeholder="1"
		style="width: {getWidth(data.number, 1, 5)}px"
	/>

	<input class="name" type="text" bind:value={data.name} placeholder="Название" />
</h2>
