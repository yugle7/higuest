<script>
	import House from '$lib/show/house/House.svelte';
	import Status from '$lib/show/house/Status.svelte';
	import Room from '$lib/show/room/Room.svelte';

	export let house;
	export let rooms;

	export let profile;
	export let chat;

	const { vk } = house;
</script>

<div class="col scroll gap-20 padding-20 content-900">
	<House {house} {profile} />

	<div class="row away center">
		<div class="row gap-15">
			{#if chat}
				<a class="link" href="?type=2">Отзывы</a>
			{/if}
			{#if vk}
				<a class="link" target="_blank" href={vk[1]}>События</a>
			{/if}
		</div>

		<div class="row gap-15">
			{#if house.managed}
				<button class="link" on:click>Исправить</button>
			{/if}
			<a class="button" href="/create/order?house_id={house.id}">Выбрать</a>
		</div>
	</div>

	{#if house.managed}
		<div class="col center">
			<Status {house} {profile} />
		</div>
	{/if}
</div>

<ul class="top-20">
	{#each rooms as room (room.id)}
		<li class="hover">
			<div class="padding-20 content-900">
				<Room {room} {profile} />
			</div>
		</li>
	{/each}
</ul>
