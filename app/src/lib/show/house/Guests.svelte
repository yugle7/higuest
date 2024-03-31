<script>
	import { getGuests } from '$lib/data/order';
	import { getRooms, getCars } from '$lib/data/house';

	export let house;

	const rooms = getRooms(house);
	const cars = getCars(house);
</script>

<span class="subtitle row gap-10">
	{#if rooms}<span>{rooms}</span>{/if}
	{#each getGuests(house) as guest}
		<span>{guest}</span>
	{/each}
	{#if cars}<span>{cars}</span>{/if}
</span>
