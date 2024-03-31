<script>
	import { discussion_topic, discussion_sort } from '$lib/data/discussion';

	import Search from '$lib/edit/Search.svelte';
	import Radio from '$lib/edit/Radio.svelte';
	import Select from '$lib/edit/Select.svelte';
</script>

<Search key="search" title="Поиск" />

<Select key="topic" labels={discussion_topic} />
<Radio key="sort" labels={discussion_sort} />
