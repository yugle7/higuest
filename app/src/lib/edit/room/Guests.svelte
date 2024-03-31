<script>
	import { state } from '$lib';
	import { getGuests } from '$lib/data/order';

	import Count from '$lib/edit/offer/Count.svelte';

	export let i = null;
	const data = i == null ? $state : $state.rooms[i];

	let hidden = false;
</script>

<div class="col gap-10 font-16">
	<button class="row gap-5 link" on:click|preventDefault={() => (hidden = !hidden)}>
		{#if hidden}
			{#each getGuests(data) as guest}
				<span>{guest}</span>
			{/each}
		{:else}
			Гости
		{/if}
	</button>

	<div class:hidden>
		<section>
			<Count {i} key="adults" label="Взрослый" min_count={1} />
			<Count {i} key="children" label="Подросток" />
			<Count {i} key="kids" label="Ребёнок" />
		</section>
	</div>
</div>

<style>
	section {
		display: grid;
		grid-template-columns: min-content 1fr;
	}
</style>
