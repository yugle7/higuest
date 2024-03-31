<script>
	import { screen } from '$lib';

	import { chat_type } from '$lib/chat/data';

	import Edit from './Edit.svelte';
	import House from './House.svelte';

	import Chat from '$lib/chat/Chat.svelte';
	import Resize from '$lib/show/Resize.svelte';
	import Close from '$lib/show/Close.svelte';

	import Header from '../../chats/Header.svelte';

	export let data;
	export let form;

	$: house = data.house;
	$: rooms = data.rooms;
	$: profile = data.profile;

	$: chat = data.chat;
	$: talk = data.talk;

	let edit;
	$: if (form) edit = false;
</script>

<svelte:head>
	<title>Дом – {house.title}</title>
	<meta name="description" content="Дом: {house.title}" />
</svelte:head>

{#if $screen}
	{#if chat}
		<Chat {chat} {rooms} {talk} {profile} />
	{:else if house}
		{#if edit}
			<Close on:click={() => (edit = null)} />
			<Edit {house} {rooms} on:click={() => (edit = false)} />
		{:else if $screen === 'params'}
			<div class="col center gap-20 padding-20">
				<Close on:click={() => ($screen = 'content')} />
				<a href="?type=2">{chat_type[2]}</a>
			</div>
		{:else}
			<Header type="2">Дом</Header>
			<House {house} {rooms} {profile} on:click={() => (edit = true)} />
		{/if}
	{/if}
{:else if house}
	{#if edit}
		<Edit {house} {rooms} on:click={() => (edit = false)} />
	{:else}
		<div class="scroll">
			<House {house} {rooms} {profile} chat={!chat} on:click={() => (edit = true)} />
		</div>
	{/if}
	{#if chat}
		<Resize>
			{#if chat}
				<Chat {chat} {talk} {profile} />
			{/if}
		</Resize>
	{/if}
{/if}
