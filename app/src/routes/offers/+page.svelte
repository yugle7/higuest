<script>
	import { screen } from '$lib';

	import { offer_sort, default_params } from '$lib/data/offer';

	import Header from '$lib/menu/Header.svelte';
	import Smooth from '$lib/show/Smooth.svelte';

	import Offers from './Offers.svelte';
	import Params from './Params.svelte';

	import Resize from '$lib/show/Resize.svelte';

	import Page from '$lib/show/Page.svelte';
	import Side from '$lib/show/Side.svelte';

	export let data;

	$: params = data.params;

	let title;
	$: if (params) {
		const { sort, house_id } = params;
		const names = [offer_sort[sort]];
		if (house_id) names.push('Дом');
		title = names.join(' – ');
	}
</script>

<svelte:head>
	<title>Поиск – {title}</title>
</svelte:head>

{#if $screen}
	<Header>Поиск</Header>

	{#await data.offers}
		<h1 class="title shy line-3">Получаем</h1>
	{:then offers}
		<h1 class="title line-2">{title}</h1>
		<Offers {offers} {params} />
	{/await}

	<Page {default_params}>
		<Params />
	</Page>
{:else}
	<Smooth>
		{#await data.offers}
			<h1 class="title shy line-3">Получаем</h1>
		{:then offers}
			<Offers {offers} {params} />
		{/await}
	</Smooth>

	<Resize>
		<Side {default_params}>
			<Params />
		</Side>
	</Resize>
{/if}
