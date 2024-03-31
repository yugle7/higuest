<script>
	import { state } from '$lib';

	import { getCounts } from '$lib/data/offer';

	import Count from './Count.svelte';

	let hidden = true;
</script>

<div class="col gap-10 top-5">
	<button class="link" on:click={() => (hidden = !hidden)}>
		{getCounts($state)}
	</button>

	<div class:hidden>
		<section class="col gap-5">
			<Count key="adults" label="Взрослый" min_count={1} />
			<Count key="children" label="Подросток" />
			<Count key="kids" label="Ребёнок" />
			<Count key="cars" label="Машина" />
		</section>
	</div>
</div>

<style>
	button {
		text-align: left;
	}
	section {
		display: grid;
		grid-template-columns: min-content 1fr;
	}
</style>
