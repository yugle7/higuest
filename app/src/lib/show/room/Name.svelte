<script>
	import { page } from '$app/stores';

	export let room;
	const { id, number, name, area, floor } = room;

	const href = `/rooms/${id}`;
	const self = href == $page.url.pathname;
</script>

<a {href} class:self class="col">
	<h2 class="top">
		<span class="monospace font-24 right-5">{number}</span>
		{name}
	</h2>
	<span class="subtitle">
		{area} м<sup>2</sup> на {floor} этаже
	</span>
</a>
