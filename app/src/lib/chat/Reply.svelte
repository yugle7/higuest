<script>
	import { look } from './data';
	import { isClick } from '$lib/data/edit';

	import Click from '$lib/show/Click.svelte';
	import Author from '$lib/show/user/Author.svelte';

	export let message;

	const { id, author, text } = message;

	const handle = () => {
		if (isClick(window)) $look = id;
	};
</script>

<Click on:click={handle}>
	<div class="text font-14">
		<Author {author} />
		<p>{text}</p>
	</div>
</Click>

<style>
	div {
		padding-left: 10px;
		border-left: 1px solid var(--color-50);
		padding-bottom: 10px;
		opacity: 50%;
		cursor: pointer;
	}
</style>
