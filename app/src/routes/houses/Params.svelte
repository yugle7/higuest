<script>
	import { house_status, house_sort, house_category } from '$lib/data/house';

	import Search from '$lib/edit/Search.svelte';
	import Radio from '$lib/edit/Radio.svelte';
	import Select from '$lib/edit/Select.svelte';

	export let profile;
</script>

<Search key="search" title="Поиск" />
<Select key="category" labels={house_category} />

{#if profile && profile.role >= 2}
	<Radio key="status" labels={house_status} />
{/if}

<Radio key="sort" labels={house_sort} />
