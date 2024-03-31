<script>
	import { enhance, applyAction } from '$app/forms';

	import { likes } from '$lib/data/react';

	import React from '$lib/show/React.svelte';

	export let discussion;
	export let profile;

	let { react, id } = discussion;
</script>

{#if profile}
	<form
		class="row gap-5"
		method="post"
		action="/discussions?/react"
		use:enhance={() => applyAction}
	>
		<input type="hidden" value={id} name="discussion_id" id="discussion_id" />
		<input type="hidden" value={react} name="react" id="react" />

		{#each likes as r (r)}
			<React
				react={r}
				state={r === react}
				count={discussion[r]}
				on:click={() => {
					if (react > 0) discussion[react]--;
					if (r === react) {
						react = 0;
					} else {
						react = r;
						discussion[react]++;
					}
				}}
			/>
		{/each}
	</form>
{:else}
	<div class="row gap-5">
		{#each likes as r (r)}
			<React react={r} count={discussion[r]} />
		{/each}
	</div>
{/if}
