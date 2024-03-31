<script>
	import { screen, state } from '$lib';
	import Order from './Order.svelte';

	import Resize from '$lib/show/Resize.svelte';
	import Side from '$lib/edit/Side.svelte';

	import Params from './Params.svelte';
	import Book from './Book.svelte';

	export let data;
	$: profile = data.profile;

	$state.rooms = data.rooms;
	$state.house = data.house;

	const { checked } = data;

	let book;
</script>

{#if book}
	<Book {profile} on:click={() => (book = false)} />
{:else if $screen}
	<Params {checked} />
	<Order on:click={() => (book = true)} />
{:else}
	<div class="scroll">
		<Order on:click={() => (book = true)} />
	</div>

	<Resize>
		<Side>
			<Params {checked} />
		</Side>
	</Resize>
{/if}
