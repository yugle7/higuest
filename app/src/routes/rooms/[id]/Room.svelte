<script>
	import Room from '$lib/show/room/Room.svelte';
	import Edit from './Edit.svelte';

	export let profile;
	
	export let room;
	export let house;

	export let chat;
	export let form;

	let edit;
	$: if (form) edit = false;
</script>

{#if edit}
	<Edit {room} on:click={() => (edit = false)} />
{:else}
	<div class="col content-900 padding-20 gap-40">
		<Room {room} {profile} />

		<div class="row gap-15 away center">
			{#if chat}
				<a class="link" href="?type=3">Отзывы</a>
			{:else}
				<span></span>
			{/if}

			<div class="row gap-15">
				{#if house.managed}
					<button class="link" on:click={() => (edit = true)}>Исправить</button>
				{/if}
				<a href="/create/order?room_ids={room.id}&house_id={room.house_id}" class="button">
					Выбрать
				</a>
			</div>
		</div>
	</div>
{/if}
