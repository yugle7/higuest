<script>
	import { enhance, applyAction } from '$app/forms';
	import { getStatuses, house_status } from '$lib/data/house';

	export let house;
	export let profile;

	$: statuses = getStatuses(profile, house);
</script>


<form method="post" action="/houses?/status" class="row gap-10 wrap" use:enhance={() => applyAction}>
	<input type="hidden" bind:value={house.status} name="status" id="status" />

	<span>{house_status[house.status]}</span>

	{#if statuses.length > 0}
		&rarr;
		{#each statuses as s (s)}
			<button class="link" on:click={() => (house.status = s)}>
				{house_status[s]}
			</button>
		{/each}
	{/if}
</form>
