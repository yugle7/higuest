<script>
	import { state } from '$lib';
	import { copyPaste } from '$lib/data/edit';

	export let key;
	export let title;

	$state[key] ||= '';
</script>

<input name={key} id={key} type="hidden" value={$state[key]} />
<div
	role="textbox"
	tabindex="0"
	on:paste|preventDefault={copyPaste}
	contenteditable="true"
	placeholder={title}
	bind:innerText={$state[key]}
/>

<style>
	div {
		width: 100%;
		outline: none;
		padding: 0;
	}
	div:empty:before {
		content: attr(placeholder);
		opacity: 0.5;
	}
</style>
