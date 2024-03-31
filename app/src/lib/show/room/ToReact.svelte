<script>
	import { enhance, applyAction } from '$app/forms';

	import { likes } from '$lib/data/react';

	import React from '$lib/show/React.svelte';

	export let room;
	export let profile;

	let { react, id } = room;
</script>

{#if profile}
	<form class="row gap-5" method="post" action="/rooms?/react" use:enhance={() => applyAction}>
		<input type="hidden" value={id} name="room_id" id="room_id" />
		<input type="hidden" value={react} name="react" id="react" />

		{#each likes as r (r)}
			<React
				react={r}
				state={r === react}
				count={room[r]}
				on:click={() => {
					if (react > 0) room[react]--;
					if (r === react) {
						react = 0;
					} else {
						react = r;
						room[react]++;
					}
				}}
			/>
		{/each}
	</form>
{:else}
	<div class="row gap-5">
		{#each likes as r (r)}
			<React react={r} count={room[r]} />
		{/each}
	</div>
{/if}
