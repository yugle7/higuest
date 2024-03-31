<script>
	import { screen } from '$lib';

	import Close from '$lib/show/Close.svelte';
</script>

<div class="col over gap-40 padding-20" class:hidden={$screen !== 'params'}>
	<Close on:click={() => ($screen = 'content')} />
	<slot />
</div>
