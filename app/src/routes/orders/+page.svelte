<script>
	import { screen } from '$lib';

	import { order_sort, default_params } from '$lib/data/order';

	import Header from '$lib/menu/Header.svelte';
	import Smooth from '$lib/show/Smooth.svelte';

	import Orders from './Orders.svelte';

	import Params from './Params.svelte';
	import Resize from '$lib/show/Resize.svelte';

	import Page from '$lib/show/Page.svelte';
	import Side from '$lib/show/Side.svelte';

	export let data;

	$: params = data.params;
	$: profile = data.profile;

	const getTitle = (params) => {
		if (!params) return '';

		const { sort, profile_id, house_id, room_id } = params;
		const names = [order_sort[sort]];
		if (profile_id) names.push('Гость');
		if (house_id) names.push('Дом');
		if (room_id) names.push('Номер');
		return names.join(' – ');
	};
</script>

<svelte:head>
	<title>Заказы – {getTitle(params)}</title>
</svelte:head>

{#if $screen}
	<Header>Заказы</Header>

	{#await data.orders}
		<h1 class="title shy line-3">Получаем</h1>
	{:then orders}
		<h1 class="title line-2">{getTitle(params)}</h1>
		<Orders {orders} {params} />
	{/await}

	<Page {default_params}>
		<Params {profile} />
	</Page>
{:else}
	<Smooth>
		{#await data.orders}
			<h1 class="title shy line-3">Получаем</h1>
		{:then orders}
			<Orders {orders} {params} />
		{/await}
	</Smooth>

	<Resize>
		<Side {default_params}>
			<Params {profile} />
		</Side>
	</Resize>
{/if}
