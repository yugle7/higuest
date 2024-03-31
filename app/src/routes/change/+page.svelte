<script>
	import { screen, state, error } from '$lib';
	import { enhance } from '$app/forms';

	import Username from '$lib/edit/user/Username.svelte';
	import Fullname from '$lib/edit/user/Fullname.svelte';
	import Phone from '$lib/edit/user/Phone.svelte';
	import Contacts from '$lib/edit/user/Contacts.svelte';

	export let data;
	export let form;

	const { username, fullname, phone, contacts } = data.profile;
	$state = { username, fullname, phone, contacts: contacts?.join('\n') || '' };

	const keys = ['username', 'fullname', 'phone', 'contacts'];

	$: disabled = keys.some((k) => !!$error[k]) || !$state.username;
	$: if (form) keys.forEach((k) => ($error[k] = form.error[k]));
</script>

<svelte:head>
	<title>Редактирование моего профиля</title>
</svelte:head>

{#if $screen}
	<a class="top-right" href="/users/{username}">
		<img src="/icons/close.svg" alt="close" />
	</a>
{/if}

<form class="auth" method="post" use:enhance>
	<Username />
	<Fullname />

	<Phone />
	<Contacts />

	<button {disabled} class="button" type="submit">Обновить</button>
</form>
