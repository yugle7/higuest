<script>
	export let house;

	const { title, street, building } = house;
</script>

<div class="col">
	<h2>{title}</h2>
	<span class="subtitle">{street + ' ' + building}</span>
</div>
