<script>
	import { getRooms, getGuests, getDays } from '$lib/data/order';

	export let order;

	const rooms = getRooms(order);
	$: days = getDays(order);
</script>

<span class="subtitle row gap-10">
	{#if rooms}<span>{rooms}</span>{/if}
	{#each getGuests(order) as guest}
		<span>{guest}</span>
	{/each}
	{#if days}<span>{days}</span>{/if}
</span>
