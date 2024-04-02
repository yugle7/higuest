<script>
	import Room from '$lib/show/room/Room.svelte';

	export let profile;

	export let room;
	export let house;

	export let chat;
</script>

<div class="col content-900 padding-20 gap-20">
	<Room {room} {profile} {house} />

	<div class="row gap-15 away center">
		{#if chat}
			<a class="link" href="?type=3">Отзывы</a>
		{:else}
			<span></span>
		{/if}
		<div class="row gap-15">
			{#if house.managed}
				<button class="link" on:click|preventDefault>Исправить</button>
			{/if}
			<a href="/create/order?room_ids={room.id}&house_id={room.house_id}" class="button">
				Выбрать
			</a>
		</div>
	</div>
</div>
