<script>
	import { enhance } from '$app/forms';
	import { state, screen, loaded } from '$lib';

	import House from '$lib/edit/house/House.svelte';

	export let data;
	const { username } = data.profile;

	let rooms;
	let price;
	let photo_ids;

	$state = {
		categories: [],
		photos: [],
		rooms: [{ number: 1, price: [null, null, null, null], photos: [] }],
		price: [null, null, null, null]
	};

	$: disabled =
		['title', 'city', 'street', 'building'].some((k) => !$state[k]) ||
		!$state.categories.length ||
		!$state.rooms.length;

	$loaded = true;
</script>

<svelte:head>
	<title>Добавление дома</title>
</svelte:head>

{#if $screen}
	<a class="top-right" href="/users/{username}">
		<img src="/icons/close.svg" alt="close" />
	</a>
{/if}

{#if $loaded}
	<div class="page">
		<form
			method="post"
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
					<a class="link" href="/users/{username}">Отменить</a>
				{/if}

				<button
					class="button"
					{disabled}
					type="submit"
					on:click={() => {
						rooms = JSON.stringify($state.rooms);
						price = JSON.stringify($state.price);
						photo_ids = JSON.stringify($state.photo_ids);
					}}
				>
					Создать
				</button>
			</div>
		</form>
	</div>
{/if}
