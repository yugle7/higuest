<script>
	export let house;
	console.log(house);

	const price = Math.min(...house.price.filter((p) => p > 0));
</script>

{#if price > 0}
	<span>
		Весь дом от <span class="monospace font-24 side-5">{price}</span> ₽ / ночь
	</span>
{/if}
