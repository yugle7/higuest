<script>
	import Text from '$lib/show/text/Text.svelte';
	import Photos from '../Photos.svelte';
	import Slides from '../Slides.svelte';

	import Name from './Name.svelte';
	import Price from './Price.svelte';
	import Guests from './Guests.svelte';
	import ToReact from './ToReact.svelte';
	
	import Title from '../house/Title.svelte';
	import Contacts from '../house/Contacts.svelte';

	export let profile;
	export let house = null;

	export let room;
	const { about, photos } = room;

	let slide;
</script>

<div class="col gap-10">
	{#if house}
		<Title {house} />
	{/if}
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

	<div class="row away">
		<ToReact {profile} {room} />
		{#if house}
			<Contacts {house} />
		{/if}
	</div>
</div>
