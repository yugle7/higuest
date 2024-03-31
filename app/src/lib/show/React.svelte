<script>
	import { react_color, react_icon } from '$lib/data/react';

	export let react;
	export let count = null;
	export let state = null;

	const icon = react_icon[react];
	const color = react_color[icon];
</script>

<button
	disabled={state == null}
	class:link={state != null}
	class="row gap-2 padding-3"
	on:click|stopPropagation
>
	<img
		class={state > 0 ? color : ''}
		class:selected={state === 2}
		src="/icons/{icon}.svg"
		alt={icon}
	/>
	{#if count > 1}<span class="monospace">{count}</span>{/if}
</button>

<style>
	.selected {
		width: 30px;
	}
	button {
		padding-right: 10px;
		padding-left: 0;
		color: var(--color-75);
	}

	img {
		width: 20px;
		padding-bottom: 5px;
	}

	.green {
		filter: sepia(100%) saturate(10000%) hue-rotate(150deg);
	}
	.red {
		filter: sepia(100%) saturate(10000%) hue-rotate(45deg);
	}
	.yellow {
		filter: sepia(100%) saturate(1000%) hue-rotate(30deg);
	}
	.blue {
		filter: sepia(100%) saturate(1000%) hue-rotate(190deg);
	}
	.purple {
		filter: sepia(100%) saturate(10000%) hue-rotate(270deg);
	}
	.pink {
		filter: sepia(100%) saturate(1000%) hue-rotate(270deg);
	}
	.brown {
		filter: sepia(100%) saturate(100000%) hue-rotate(60deg);
	}
</style>
