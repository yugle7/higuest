<script>
	export let phone;
	let show;
</script>

<span class="font-16">
	{#if show}
		<a class="link" href="tel:{phone}">{phone}</a>
	{:else}
		<button class="link" on:click|preventDefault={() => (show = true)}>Позвонить</button>
	{/if}
</span>
