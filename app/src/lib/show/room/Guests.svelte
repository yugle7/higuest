<script>
	import { getGuests } from '$lib/data/order';

	export let room;
</script>

<span class="subtitle row gap-10">
	{#each getGuests(room) as guest}
		<span>{guest}</span>
	{/each}
</span>
