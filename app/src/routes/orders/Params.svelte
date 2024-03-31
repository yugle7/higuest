<script>
	import { house_category } from '$lib/data/house';
	import { order_sort } from '$lib/data/order';

	import Radio from '$lib/edit/Radio.svelte';
	import Select from '$lib/edit/Select.svelte';
</script>

<Select key="category" labels={house_category} />
<Radio key="sort" labels={order_sort} />
