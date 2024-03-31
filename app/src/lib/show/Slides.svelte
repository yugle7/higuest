<script>
	import { screen } from '$lib';
	import Close from './Close.svelte';

	export let photos;
	const l = photos.length;

	let k = 0;
	let s = $screen ? 5 : 10;
</script>

<div class="over">
	<Close on:click />

	<div class="row absolute width-100 height-100">
		<button class="width-50" on:click|preventDefault={() => (k = k === 0 ? l - 1 : k - 1)} />
		<button class="width-50" on:click|preventDefault={() => (k = k === l - 1 ? 0 : k + 1)} />
	</div>

	<img src={photos[k]} alt="slide" />

	<section class="down">
		{#if l <= 1}
			<span></span>
		{:else if l <= 14}
			<div class="row center gap-5 padding-10">
				{#each { length: l } as _, i}
					<button
						class="relative"
						on:click|preventDefault={() => (k = i)}
						style="width: {4 * s}px; height: {4 * s}px;"
					>
						<div style="width: {s * (2 + (i == k))}px; height: {s * (2 + (i == k))}px;" />
					</button>
				{/each}
			</div>
		{:else}
			{k} из {l}
		{/if}
	</section>
</div>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	section {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		justify-content: space-evenly;
		padding-bottom: 10px;
	}

	button div {
		background-color: var(--top-color);
		border-radius: 20px;
		transition: all 0.3s ease-out;
		opacity: 0.3;
		cursor: pointer;
		margin: 0 auto;
	}

	.over {
		left: 0;
	}
</style>
