<script>
	import { enhance } from '$app/forms';
	import { pb, state, screen } from '$lib';

	import House from '$lib/edit/house/House.svelte';

	export let house;
	export let rooms;

	const { title, categories, about, cars, price, city, street, building, photos } = house;

	$state = {
		title,
		categories,
		about,
		rooms,
		cars,
		price,
		city,
		street,
		building,
		photos
	};

	let data = {};
</script>

<form
	method="post"
	action="?/edit"
	class="col content-900 padding-20 gap-40"
	enctype="multipart/form-data"
	use:enhance
>
	<input type="hidden" name="price" bind:value={data.price} />
	<input type="hidden" name="rooms" bind:value={data.rooms} />
	<input type="hidden" name="photos" bind:value={data.photos} />

	<House />

	<div class="row gap-15 center right">
		{#if !$screen}
			<button class="link" on:click|preventDefault>Отменить</button>
		{/if}
		<button
			class="button"
			type="submit"
			on:click={() =>
				(data = {
					rooms: JSON.stringify($state.rooms),
					price: JSON.stringify($state.price),
					photos: JSON.stringify($state.photos)
				})}
		>
			Исправить
		</button>
	</div>
</form>
