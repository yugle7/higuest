<script>
	import Room from '$lib/show/room/Room.svelte';

	export let rooms;
	export let profile;
</script>

{#if rooms.length > 0}
	<ul class="top-5">
		{#each rooms as room (room.id)}
			<li class="hover">
				<div class="content-900 padding-20">
					<Room {room} {profile} />
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<h1 class="title shy line-3">Ничего не найдено</h1>
{/if}
