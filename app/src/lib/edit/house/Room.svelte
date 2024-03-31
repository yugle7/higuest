<script>
	import Room from '$lib/edit/room/Room.svelte';

	export let i;
	console.log('i', i);
	let selected;
</script>

<li
	class="col gap-10 relative"
	on:mouseenter={() => (selected = true)}
	on:mouseleave={() => (selected = false)}
>
	<Room {i} />

	<button class:hidden={!selected} class="top-right" on:click|preventDefault>
		<img src="/icons/delete.svg" alt="delete" />
	</button>
</li>

<style>
	img {
		min-width: 24px;
	}
	button > img {
		width: 30px;
	}
	button {
		margin-left: auto;
	}
</style>
