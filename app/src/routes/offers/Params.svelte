<script>
	import { house_category } from '$lib/data/house';
	import { offer_sort } from '$lib/data/offer';

	import Radio from '$lib/edit/Radio.svelte';
	import Select from '$lib/edit/Select.svelte';

	import InOut from '$lib/edit/time/InOut.svelte';
	import Guests from '$lib/edit/offer/Guests.svelte';
</script>


<Guests />
<InOut />

<Select key="category" labels={house_category} />
<Radio key="sort" labels={offer_sort} />
