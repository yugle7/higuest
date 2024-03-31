<script>
	export let offer;
</script>

<span>
	{#if offer.days > 1}
		<span class="monospace font-24 right-5">{offer.price}</span> ₽
		<span class="monospace font-24 side-5"> = </span>
	{/if}
	<span class="monospace font-24 right-5">{Math.ceil(offer.price / offer.days)}</span> ₽ / ночь
</span>
