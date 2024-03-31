<script>
	import { state } from '$lib';

	export let key;
	export let label;

	export let i = null;
	const data = i == null ? $state : $state.rooms[i];

	export let min_count = 0;
	data[key] = +data[key] || min_count;
</script>

<span class:disabled={data[key] == 0} class="right-5">{label}</span>

<div class="row gap-10 center font-20 monospace">
	<button
		class="link"
		on:click|preventDefault={() => {
			data[key]++;
			$state = $state;
		}}
	>
		<img src="/icons/plus.svg" alt="plus" />
	</button>

	{data[key]}

	<button
		class="link"
		disabled={data[key] <= min_count}
		on:click|preventDefault={() => {
			data[key]--;
			$state = $state;
		}}
	>
		<img src="/icons/minus.svg" alt="minus" />
	</button>
</div>

<style>
	img {
		width: 30px;
	}
	span {
		display: inline-block;
		vertical-align: middle;
		line-height: 2rem;
	}
</style>
