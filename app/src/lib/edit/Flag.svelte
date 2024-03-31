<script>
	import { state } from '$lib';

	export let key;
	export let title;
</script>

<button
	class="link"
	class:selected={$state[key]}
	on:click|preventDefault={() => ($state[key] = 1 - $state[key])}
>
	{title}
</button>
