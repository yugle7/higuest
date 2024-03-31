<script>
	import { screen } from '$lib';

	import { room_sort, default_params } from '$lib/data/room';

	import Header from '$lib/menu/Header.svelte';
	import Smooth from '$lib/show/Smooth.svelte';

	import Rooms from './Rooms.svelte';

	import Params from './Params.svelte';
	import Resize from '$lib/show/Resize.svelte';

	import Page from '$lib/show/Page.svelte';
	import Side from '$lib/show/Side.svelte';

	export let data;

	$: params = data.params;
	$: profile = data.profile;

	let title;
	$: if (params) {
		const { sort, house_id } = params;
		const names = [room_sort[sort]];
		if (house_id) names.push('Дом');
		title = names.join(' – ');
	}
</script>

<svelte:head>
	<title>Номера – {title}</title>
</svelte:head>

{#if $screen}
	<Header>Номера</Header>

	{#await data.rooms}
		<h1 class="title shy line-3">Получаем</h1>
	{:then rooms}
		<h1 class="title line-2">{title}</h1>
		<Rooms {rooms} {params} {profile} />
	{/await}

	<Page {default_params}>
		<Params {profile} />
	</Page>
{:else}
	<Smooth>
		{#await data.rooms}
			<h1 class="title shy line-3">Получаем</h1>
		{:then rooms}
			<Rooms {rooms} {params} {profile} />
		{/await}
	</Smooth>

	<Resize>
		<Side {default_params}>
			<Params {profile} />
		</Side>
	</Resize>
{/if}
