<script>
	import { page } from '$app/stores';
	import { getAddress, getSubtitle } from '$lib/data/house';

	export let house;
	const { id, title } = house;

	const href = `/houses/${id}`;
	const self = href == $page.url.pathname;
</script>

<a {href} class:self class="col top">
	<h2 class="line-2">{title}</h2>
	<span class="subtitle">{getAddress(house)}</span>
	<span class="subtitle">{getSubtitle(house)}</span>
</a>
