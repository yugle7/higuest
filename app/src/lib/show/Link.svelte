<script>
	export let key;
	export let count;
	export let href;
</script>

{#if count}
	<a {href} class="row gap-2 padding-10 link">
		<img src="/icons/{key}.svg" alt={key} />
		<span class="monospace">{count}</span>
	</a>
{/if}

<style>
	img {
		width: 30px;
	}
</style>
