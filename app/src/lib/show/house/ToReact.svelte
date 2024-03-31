<script>
	import { enhance, applyAction } from '$app/forms';
	import { likes } from '$lib/data/react';

	import React from '$lib/show/React.svelte';

	export let house;
	export let profile;

	let { react, id } = house;
</script>

{#if profile}
	<form class="row gap-5" method="post" action="/houses?/react" use:enhance={() => applyAction}>
		<input type="hidden" value={id} name="house_id" id="house_id" />
		<input type="hidden" value={react} name="react" id="react" />

		{#each likes as r (r)}
			<React
				react={r}
				state={r === react}
				count={house[r]}
				on:click={() => {
					if (react > 0) house[react]--;
					if (r === react) {
						react = 0;
					} else {
						react = r;
						house[react]++;
					}
				}}
			/>
		{/each}
	</form>
{:else}
	<div class="row gap-5">
		{#each likes as r (r)}
			<React react={r} count={house[r]} />
		{/each}
	</div>
{/if}
