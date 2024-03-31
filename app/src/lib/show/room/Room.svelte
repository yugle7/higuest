<script>
	import Text from '$lib/show/text/Text.svelte';
	import Photos from '../Photos.svelte';
	import Slides from '../Slides.svelte';

	import Name from './Name.svelte';
	import Price from './Price.svelte';
	import Guests from './Guests.svelte';
	import ToReact from './ToReact.svelte';

	export let profile;

	export let room;
	const { about } = room;

	let slide;
	let photos = room.photos.map(({ id, url }) => url);
</script>

<div class="col gap-10">
	<Name {room} />

	{#if photos.length}
		{#if slide}
			<Slides {photos} on:click={() => (slide = false)} />
		{:else}
			<Photos {photos} on:click={() => (slide = true)} />
		{/if}
	{/if}

	<div class="col">
		<Price {room} />
		<Guests {room} />
	</div>

	{#if about}
		<Text text={about} />
	{/if}

	<ToReact {profile} {room} />
</div>
