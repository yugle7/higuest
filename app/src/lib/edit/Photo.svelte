<script>
	import { screen } from '$lib';

	export let id;
	export let src;

	export let selected;
	let overlapped;
	let dragged;

	let target;
</script>

<li
	class="relative"
	bind:this={target}
	on:mouseenter={() => (selected = true)}
	on:mouseleave={() => (selected = false)}
	draggable="auto"
	{id}
	on:drag
	on:dragstart={(e) => {
		e.dataTransfer.setDragImage(target, e.offsetX, e.offsetY);
		dragged = true;
	}}
	on:touchstart
	on:dragend={() => (dragged = false)}
	on:dragenter={() => (overlapped = true)}
	on:dragleave={() => (overlapped = false)}
	on:dragover={() => (overlapped = true)}
	on:dragexit={() => (dragged = overlapped = false)}
	on:drop={() => (dragged = overlapped = false)}
	class:dragged
	class:overlapped
	class:selected
>
	<img class="photo" {src} alt="" />

	{#if !$screen}
		<button class="top-right" class:hidden={!selected || dragged} on:click|preventDefault>
			<img src="/icons/close.svg" alt="delete" />
		</button>
	{/if}
</li>

<style>
	.photo {
		height: auto;
		width: 100%;
		border-radius: 10px;
		aspect-ratio: 4/3;
		object-fit: cover;
		object-position: center;
	}

	li {
		position: relative;
		height: auto;
		width: calc(25% - 4px);
	}
</style>
