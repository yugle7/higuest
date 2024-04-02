<script>
	import { state } from '$lib';
	import { getDays } from '$lib/data/time';
	import { sumPrice } from '$lib/data/price';

	import Room from '$lib/show/order/Room.svelte';
	import Price from '$lib/show/offer/Price.svelte';
	import Counts from '$lib/show/order/Counts.svelte';

	const { rooms, house } = $state;
	const { title, street, building } = house;

	$: if ($state.check_out) {
		const { check_in, check_out } = $state;

		$state.days = getDays(check_in, check_out);
		$state.price = sumPrice(check_in, check_out, rooms);

		$state = $state;
	}
</script>

<div class="col content-900 padding-20 gap-40">
	<div class="col">
		<h2>{title}</h2>
		<span class="subtitle">{street + ' ' + building}</span>
	</div>

	{#if $state.check_out}
		<div class="col line-0">
			<Price offer={$state} />
			<Counts order={$state} />
		</div>
	{/if}

	{#each rooms as room}
		<Room {room} />
	{/each}

	<button disabled={!$state.check_out} class="button right" on:click>Забронировать</button>
</div>
