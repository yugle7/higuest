<script>
	import { state } from '$lib';
	import { normText } from '$lib/data/edit';

	export let key = 'search';
	export let title;

	let value = $state[key];

	const handleSearch = async (e) => {
		if (e.key === 'Enter') {
			$state[key] = normText(value);
			e.preventDefault();
			return true;
		}
	};
</script>

<input
	class="input"
	placeholder={title}
	id={key}
	type="search"
	bind:value
	on:blur={() => ($state[key] = normText(value))}
	on:keydown={handleSearch}
	on:click|stopPropagation
/>

<style>
	input {
		margin-left: -10px;
		width: calc(100% + 10px);
	}
</style>
