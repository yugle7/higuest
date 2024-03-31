<script>
	import { state, error } from '$lib';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import Phone from '$lib/edit/user/Phone.svelte';
	import Password from '$lib/edit/user/Password.svelte';
	import Email from '$lib/edit/user/Email.svelte';
	import Fullname from '$lib/edit/user/Fullname.svelte';
	import Username from '$lib/edit/user/Username.svelte';
	import Contacts from '$lib/edit/user/Contacts.svelte';

	export let form;

	$: disabled =
		$error.username ||
		$error.fullname ||
		$error.email ||
		$error.phone ||
		$error.password ||
		$error.contacts ||
		$state.username === '' ||
		$state.email === '' ||
		$state.password === '';

	let user_id;
	onMount(() => (user_id = localStorage.getItem('user_id')));
	$: if (user_id && form?.profile) localStorage.removeItem('user_id');
</script>

<svelte:head>
	<title>Регистрация</title>
</svelte:head>

{#if form?.profile}
	<div class="auth">
		<p>
			Hа почту <code>{$state.email}</code> отправлено письмо с просьбой ее подтвердить.
		</p>
		<a class="link" href="/users/{form.profile.username}">Перейти в аккаунт?</a>
	</div>
{:else}
	<form
		class="auth"
		method="post"
		use:enhance={(cancel) => {
			if (disabled) cancel();
		}}
	>
		<Username />
		<Fullname />

		<Email />
		<Phone />
		<Contacts />

		<Password />

		{#if user_id}
			<input type="hidden" value={user_id} name="user_id" id="user_id" />
		{/if}

		<div class="col">
			{#if form?.error}
				<span class="failed">{form.error}</span>
			{/if}
			<button class="button" {disabled} type="submit">Регистрация</button>
			<a class="link right font-14" href="/login">Вернуться в форму входа?</a>
		</div>
	</form>
{/if}
