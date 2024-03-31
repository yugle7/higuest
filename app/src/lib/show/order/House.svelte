<script>
	import { getAddress } from '$lib/data/offer';

	export let order;
	const { id, house } = order;
</script>

<a class="top col line-1" href="/orders/{id}">
	<h2 class="right-50">{house.title}</h2>
	<span class="subtitle">{getAddress(house)}</span>
</a>
