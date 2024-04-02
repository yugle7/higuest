<script>
	import { screen } from '$lib';

	import Room from './Room.svelte';

	import Chat from '$lib/chat/Chat.svelte';
	import Resize from '$lib/show/Resize.svelte';

	import Header from '../../chats/Header.svelte';
	import Edit from './Edit.svelte';

	export let data;
	export let form;

	$: room = data.room;
	$: house = data.house;

	$: profile = data.profile;

	$: chat = data.chat;
	$: talk = data.talk;

	let edit;
	$: if (form) edit = false;
</script>

<svelte:head>
	<title>Номер – {room.name}</title>
	<meta name="description" content="Номер: {room.name}" />
</svelte:head>

{#if edit}
	<Edit {room} on:click={() => (edit = false)} />
{:else if room}
	{#if $screen}
		<Header type="3">Номер</Header>
		<Room {room} {house} {profile} on:click={() => (edit = true)} />
		{#if chat}
			<Chat {chat} {talk} {profile} />
		{/if}
	{:else}
		<div class="scroll">
			<Room {room} {house} {profile} chat={!chat} on:click={() => (edit = true)} />
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
