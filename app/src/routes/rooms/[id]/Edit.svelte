<script>
	import { enhance } from '$app/forms';

	import { screen, state } from '$lib';
	import { getRoom } from '$lib/data/room';

	import Room from '$lib/edit/room/Room.svelte';

	export let room;
	let data;

	$state = getRoom(room);
</script>

<form method="post" action="?/edit" class="col padding-20 gap-40 content-900" use:enhance>
	<Room />

	<input type="hidden" name="data" bind:value={data} />

	<div class="row gap-15 center right">
		{#if !$screen}
			<button class="link" on:click|preventDefault>Отменить</button>
		{/if}
		<button class="button" type="submit" on:click={() => (data = JSON.stringify($state))}>
			Исправить
		</button>
	</div>
</form>
