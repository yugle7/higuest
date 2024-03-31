<script>
	import { screen } from '$lib';

	import Room from './Room.svelte';

	import Chat from '$lib/chat/Chat.svelte';
	import Resize from '$lib/show/Resize.svelte';

	import Header from '../../chats/Header.svelte';

	export let data;

	$: room = data.room;
	$: house = data.house;

	$: profile = data.profile;

	$: chat = data.chat;
	$: talk = data.talk;
</script>

<svelte:head>
	<title>Номер – {room.name}</title>
	<meta name="description" content="Номер: {room.name}" />
</svelte:head>

{#if room}
	{#if $screen}
		<Header type="3">Номер</Header>
		<Room {room} {house} {profile} />
		{#if chat}
			<Chat {chat} {talk} {profile} />
		{/if}
	{:else}
		<div class="scroll">
			<Room {room} {house} {profile} chat={!chat} />
		</div>
		{#if chat}
			<Resize>
				<Chat {chat} {talk} {profile} />
			</Resize>
		{/if}
	{/if}
{:else}
	<h1 class="title shy line-3">Получаем</h1>
{/if}
