<script>
	import { enhance } from '$app/forms';
	import { state, screen } from '$lib';

	import House from '$lib/edit/house/House.svelte';

	export let house;
	export let rooms;

	$state = { ...house, rooms };

	let price;
	let photo_ids;
</script>

<form
	method="post"
	action="?/edit"
	class="col content-900 padding-20 gap-40"
	enctype="multipart/form-data"
	use:enhance
>
	<input type="hidden" name="price" bind:value={price} />
	<input type="hidden" name="rooms" bind:value={rooms} />
	<input type="hidden" name="photo_ids" bind:value={photo_ids} />

	<House />

	<div class="row gap-15 center right">
		{#if !$screen}
			<button class="link" on:click|preventDefault>Отменить</button>
		{/if}
		<button
			class="button"
			type="submit"
			on:click={() => {
				rooms = JSON.stringify($state.rooms);
				price = JSON.stringify($state.price);
				photo_ids = JSON.stringify($state.photo_ids);
			}}
		>
			Исправить
		</button>
	</div>
</form>
