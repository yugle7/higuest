<script>
	export let room;

	const price = Math.min(...room.price.filter((p) => p > 0));
</script>

<span>
	От <span class="monospace font-24 side-5">{price}</span> ₽ / ночь
</span>
