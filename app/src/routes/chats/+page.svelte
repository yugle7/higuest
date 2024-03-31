<script>
	import { screen } from '$lib';
	import { default_params } from '$lib/chat/data';

	import Chats from './Chats.svelte';

	import Smooth from '$lib/show/Smooth.svelte';
	import Resize from '$lib/show/Resize.svelte';

	import Header from '$lib/menu/Header.svelte';

	import Page from '$lib/show/Page.svelte';
	import Side from '$lib/show/Side.svelte';
	import Params from './Params.svelte';

	export let data;

	$: params = data.params;
	$: profile = data.profile;

	const getTitle = (params) => {
		const { type } = params;
		return type == null ? 'Все' : chat_type[type];
	};
</script>

<svelte:head>
	<title>Чаты – {getTitle(params)}</title>
</svelte:head>

{#if $screen}
	<Header>Чаты</Header>
	<h1 class="title line-2">{getTitle(params)}</h1>

	{#await data.chats}
		<h1 class="title shy line-3">Получаем</h1>
	{:then chats}
		<Chats {chats} {params} {profile} />
	{/await}

	<Page>
		<Params />
	</Page>
{:else}
	<Smooth>
		{#await data.chats}
			<h1 class="title shy line-3">Получаем</h1>
		{:then chats}
			<Chats {chats} {params} {profile} />
		{/await}
	</Smooth>

	<Resize>
		<Side {default_params}>
			<Params />
		</Side>
	</Resize>
{/if}
