<script>
	import { enhance, applyAction } from '$app/forms';
	import { message_react } from './data';

	import React from '$lib/show/React.svelte';

	export let message;
	export let profile;

	export let clicked;

	let { id, react } = message;

	$: reacts = message_react.filter((r) => message[r] > 0).sort((a, b) => message[b] - message[a]);
</script>

{#if profile}
	<form
		method="post"
		action="/messages?/react"
		class="row gap-5"
		use:enhance={() => applyAction}
		on:submit
	>
		<input type="hidden" value={react} name="react" id="react" />
		<input type="hidden" value={id} name="message_id" id="message_id" />

		{#if clicked}
			{#each message_react as r (r)}
				<React react={r} state="2" on:click={() => (react = r)} />
			{/each}
		{:else if reacts.length > 0}
			{#each reacts as r (r)}
				<React
					react={r}
					state={react === r}
					count={message[r]}
					on:click={() => (react = react === r ? 0 : r)}
				/>
			{/each}
		{/if}
	</form>
{:else}
	<div class="row gap-5">
		{#each reacts as r (r)}
			<React react={r} count={message[r]} />
		{/each}
	</div>
{/if}
