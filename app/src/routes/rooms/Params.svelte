<script>
	import { room_sort } from '$lib/data/room';

	import Radio from '$lib/edit/Radio.svelte';

	export let profile;
</script>

<Radio key="sort" labels={room_sort} />
