<script>
	import { getRooms, getGuests, getDays } from '$lib/data/order';

	export let offer;
	const { house } = offer;

	const rooms = getRooms(offer);
	const days = getDays(offer);
</script>

<span class="subtitle row gap-10 wrap">
	{#if rooms}<span>{rooms}</span>{/if}
	{#each getGuests(house) as guest}
		<span>{guest}</span>
	{/each}
	{#if days}<span>{days}</span>{/if}
</span>
