<script>
	import Text from '$lib/show/text/Text.svelte';
	import Photos from '../Photos.svelte';
	import Slides from '../Slides.svelte';

	import Title from './Title.svelte';
	import Price from './Price.svelte';
	import Guests from './Guests.svelte';
	import ToReact from './ToReact.svelte';
	import Contacts from './Contacts.svelte';

	export let profile = null;
	export let house;

	const { about, photos } = house;

	let slide;
</script>

<div class="col gap-10">
	<Title {house} />

	{#if slide}
		<Slides {photos} on:click={() => (slide = false)} />
	{:else}
		<Photos {photos} on:click={() => (slide = true)} />
	{/if}

	<div class="col">
		<Price {house} />
		<Guests {house} />
	</div>

	{#if about}
		<Text text={about} />
	{/if}

	<div class="row away">
		<ToReact {profile} {house} />
		<Contacts {house} />
	</div>
</div>
