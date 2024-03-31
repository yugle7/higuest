<script>
	import { state } from '$lib';

	export let key;
	export let labels;
	export let title;

	let selected = $state[key] != null;
</script>

{#if selected}
	<button class="link font-14" on:click|preventDefault={() => (selected = false)}>
		{labels[$state[key]]}
	</button>
{:else}
	<div class="col gap-10">
		{#if $state[key]}
			<button class="link font-14" on:click|preventDefault={() => (selected = true)}>
				{title}
			</button>
		{:else}
			<span class="subtitle">{title}</span>
		{/if}

		{#each Object.entries(labels) as [value, label] (value)}
			<label class="link" class:selected={$state[key] == value}>
				<input
					type="radio"
					name={key}
					{value}
					bind:group={$state[key]}
					on:change={() => (selected = true)}
				/>
				{label}
			</label>
		{/each}
	</div>
{/if}

<style>
	input[type='radio'] {
		visibility: hidden;
	}
	label:before {
		content: '–';
	}
</style>
