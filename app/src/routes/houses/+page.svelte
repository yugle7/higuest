<script>
	import { page } from '$app/stores';
	import { screen } from '$lib';

	import {
		house_status,
		house_sort,
		house_category,
		default_params
	} from '$lib/data/house';

	import Header from '$lib/menu/Header.svelte';
	import Smooth from '$lib/show/Smooth.svelte';

	import Houses from './Houses.svelte';

	import Params from './Params.svelte';
	import Resize from '$lib/show/Resize.svelte';

	import Page from '$lib/show/Page.svelte';
	import Side from '$lib/show/Side.svelte';

	export let data;

	$: params = data.params;
	$: profile = data.profile;

	const getTitle = (params) => {
		if (!params) return '';

		const { sort, status, category } = params;
		const names = [house_sort[sort]];
		if (status != default_params.status) names.push(house_status[status]);
		if (category != null) names.push(house_category[category]);
		if ($page.url.searchParams.get('search')) names.push('Поиск');
		return names.join(' – ');
	};
</script>

<svelte:head>
	<title>Дома – {getTitle(params)}</title>
</svelte:head>

{#if $screen}
	<Header>Дома</Header>

	{#await data.houses}
		<h1 class="title shy line-3">Получаем</h1>
	{:then houses}
		<h1 class="title line-2">{getTitle(params)}</h1>
		<Houses {houses} {params} {profile} />
	{/await}

	<Page {default_params}>
		<Params {profile} />
	</Page>
{:else}
	<Smooth>
		{#await data.houses}
			<h1 class="title shy line-3">Получаем</h1>
		{:then houses}
			<Houses {houses} {params} {profile} />
		{/await}
	</Smooth>

	<Resize>
		<Side {default_params}>
			<Params {profile} />
		</Side>
	</Resize>
{/if}
