<script>
	export let order;
	const { days, price } = order;
</script>

<div class="col">
	<span>
		{#if days > 1}
			<span class="monospace font-24 right-5">{price}</span> ₽
			<span class="monospace font-24 side-5"> = </span>
		{/if}
		<span class="monospace font-24 right-5">{Math.ceil(price / days)}</span> ₽ / ночь
	</span>
</div>
