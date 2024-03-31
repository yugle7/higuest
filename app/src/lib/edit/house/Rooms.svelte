<script>
	import { state, plus } from '$lib';

	import Room from './Room.svelte';

	let rooms = $state.rooms;
	$: $state.rooms = rooms;
</script>

<ul class="col gap-40">
	{#each { length: rooms.length } as _, i}
		<Room
			{i}
			on:click={() => {
				rooms.splice(i, 1);
				rooms = rooms;
			}}
		/>
	{/each}

	<button
		class="link"
		on:click|preventDefault={() => {
			if (length) {
				rooms.push({ ...rooms[length - 1] });
				rooms[length - 1].number++;
				rooms = rooms;
			} else {
				rooms = [{ number: 1, price: [null, null, null, null], photos: [] }];
			}
		}}
	>
		<span class="font-24">{plus}</span> Номер
	</button>
</ul>
