<script>
	import { getGuests } from '$lib/data/order';

	import Text from '$lib/show/text/Text.svelte';
	import Photos from '../Photos.svelte';
	import Slides from '../Slides.svelte';

	export let room;
	const { id, photos, name, about, area, floor } = room;

	const price = Math.min(...room.price.filter((p) => p > 0));
	let slide;
</script>

<div class="col gap-10">
	<a class="link" href="/rooms/{id}">
		<div class="col">
			<h2 class="top line-1">
				{name}
			</h2>
			<span class="subtitle row gap-10 wrap">
				{#each getGuests(room) as guest}
					<span>{guest}</span>
				{/each}
			</span>
		</div>
	</a>

	{#if photos.length}
		{#if slide}
			<Slides {photos} on:click={() => (slide = false)} />
		{:else}
			<Photos {photos} on:click={() => (slide = true)} />
		{/if}
	{/if}

	<div class="col">
		<span>
			От <span class="monospace font-24 side-5">{price}</span> ₽ / ночь
		</span>
		<span class="subtitle">
			{area} м<sup>2</sup> на {floor} этаже
		</span>
	</div>

	{#if about}
		<Text text={about} />
	{/if}
</div>
