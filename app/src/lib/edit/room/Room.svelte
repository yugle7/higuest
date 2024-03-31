<script>
	import { state } from '$lib';
	import { copyPaste } from '$lib/data/edit';

	import Prices from '../house/Prices.svelte';

	import Guests from './Guests.svelte';
	import Area from './Area.svelte';
	import Name from './Name.svelte';
	import Photos from '../Photos.svelte';

	export let i = null;
	const data = i == null ? $state : $state.rooms[i];
</script>

<div class="col gap-20">
	<div class="col gap-10">
		<Name {i} />
		<div
			role="textbox"
			tabindex="0"
			on:paste|preventDefault={copyPaste}
			contenteditable="true"
			placeholder="Описание"
			bind:innerText={data.about}
		/>
	</div>

	<Photos {i} />

	<Prices {i} />
	<Area {i} />
	<Guests {i} />
</div>

<style>
	div {
		width: fit-content;
	}
	div:empty:before {
		content: attr(placeholder);
		opacity: 0.5;
	}
</style>
