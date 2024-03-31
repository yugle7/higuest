<script>
	import Text from '$lib/show/text/Text.svelte';
	import Photos from '../Photos.svelte';
	import Slides from '../Slides.svelte';

	export let room;
	const { number, name, about, area, floor } = room;

	let slide;
	const photos = room.photos.map(({ url }) => url);
</script>

<div class="col gap-10">
	<div class="col">
		<h2 class="top line-1">
			<span class="monospace font-24 right-5">{number}</span>
			{name}
		</h2>
		<span class="subtitle">
			{area} м<sup>2</sup> на {floor} этажe
		</span>
	</div>

	{#if photos.length}
		{#if slide}
			<Slides {photos} on:click={() => (slide = false)} />
		{:else}
			<Photos {photos} on:click={() => (slide = true)} />
		{/if}
	{/if}

	{#if about}
		<Text text={about} />
	{/if}
</div>
