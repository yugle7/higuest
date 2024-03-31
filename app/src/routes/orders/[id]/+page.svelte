<script>
	import { screen } from '$lib';

	import { chat_type } from '$lib/chat/data';

	import Order from './Order.svelte';

	import Chat from '$lib/chat/Chat.svelte';
	import Resize from '$lib/show/Resize.svelte';
	import Close from '$lib/show/Close.svelte';

	import Header from '../../chats/Header.svelte';

	export let data;
	const { order } = data;
	const { house, client } = order;

	$: profile = data.profile;

	$: chat = data.chat;
	$: talk = data.talk;
</script>

<svelte:head>
	<title>Заказ – {house.title} – {client.fullname}</title>
</svelte:head>

{#if $screen}
	{#if chat}
		<Chat {chat} {talk} {profile} />
	{:else if data}
		{#if $screen === 'params'}
			<div class="col center gap-20 padding-20">
				<Close on:click={() => ($screen = 'content')} />
				<a href="?type=4">{chat_type[4]}</a>
			</div>
		{:else}
			<Header type="4">Заказ</Header>
			<Order {order} {profile} />
		{/if}
	{/if}
{:else if data}
	<div class="scroll">
		<Order {order} {profile} chat={!chat} />
	</div>
	{#if chat}
		<Resize>
			<Chat {chat} {talk} {profile} />
		</Resize>
	{/if}
{/if}
