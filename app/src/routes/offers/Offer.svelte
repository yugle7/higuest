<script>
	import Offer from '$lib/show/offer/Offer.svelte';
	import House from '$lib/show/house/House.svelte';
	import Room from '$lib/show/room/Room.svelte';

	export let params;
	export let offer;

	const { house_id, check_out } = params;
</script>

<div class="col content-900 padding-20 gap-20">
	{#if check_out}
		<Offer {offer} />
	{:else if house_id}
		<Room room={offer} />
	{:else}
		<House house={offer} />
	{/if}
</div>
