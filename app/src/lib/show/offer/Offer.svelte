<script>
	import { getAddress } from '$lib/data/offer';

	import Photos from '../Photos.svelte';
	import Slides from '../Slides.svelte';

	import Price from './Price.svelte';
	import Counts from './Counts.svelte';

	export let offer;
	const { rooms, house } = offer;

	let slide;
	
	let photos = [];
	rooms.forEach((r) => (photos = [...photos, ...r.photos.map(({ url }) => url)]));
</script>

<div class="col">
	<h2>{house.title}</h2>
	<span class="subtitle">{getAddress(house)}</span>
</div>

{#if photos.length}
	{#if slide}
		<Slides {photos} on:click={() => (slide = false)} />
	{:else}
		<Photos {photos} on:click={() => (slide = true)} />
	{/if}
{/if}

<div class="col">
	<Price {offer} />
	<Counts {offer} />
</div>

<a
	href="/create/order?room_ids={rooms.map(({ id }) => id).join('+')}&house_id={house.id}"
	class="button right"
>
	Выбрать
</a>
