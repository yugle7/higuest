<script>
	import { state } from '$lib';
	import { default_params } from '$lib/data/offer';

	import InOut from '$lib/edit/time/InOut.svelte';
	import Guests from '$lib/edit/offer/Guests.svelte';

	export let checked;
	// $state = { ...default_params, ...$state };
</script>

<Guests />
<InOut {checked} />
