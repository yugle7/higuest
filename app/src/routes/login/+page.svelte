<script>
	import { checkPassword, auth_provider, checkLogin } from '$lib/data/user';
	import { back } from '$lib';
	import { onMount } from 'svelte';

	export let data;
	export let form;

	let login = '';
	let password = '';

	let error = {};

	$: disabled = error.password || error.login || form?.error || password === '' || login === '';

	let user_id;
	onMount(() => (user_id = localStorage.getItem('user_id')));
</script>

<svelte:head>
	<title>Вход</title>
</svelte:head>

<form class="auth" method="post" action="?/login">
	{#if data.providers.length > 0}
		{#each data.providers as provider}
			<button class="button" formaction="?/{provider.name}">
				{auth_provider[provider.name]}
			</button>
		{/each}
		<span class="center font-14">или</span>
	{/if}

	<div class="col">
		<input
			class="input"
			class:failed={error.login}
			placeholder="Email или Username"
			bind:value={login}
			on:keydown={() => {
				delete error.login;
				if (form) delete form.error;
			}}
			on:blur={() => {
				error.login = checkLogin(login);
			}}
			id="login"
			type="text"
			name="login"
		/>
		{#if error.login}
			<span class="failed">{error.login}</span>
		{/if}
	</div>

	<div class="col">
		<input
			class="input"
			class:failed={error.password}
			placeholder="Пароль"
			bind:value={password}
			on:keydown={() => {
				delete error.password;
				if (form) delete form.error;
			}}
			on:blur={() => {
				error.password = checkPassword(password);
			}}
			id="password"
			type="password"
			name="password"
		/>
		{#if error.password}
			<span class="failed">{error.password}</span>
		{/if}
		<a class="link right font-14" href="/reset">Забыл пароль?</a>
	</div>

	{#if $back}
		<input type="hidden" value={$back} name="back" id="back" />
	{/if}
	{#if user_id}
		<input type="hidden" value={user_id} name="user_id" id="user_id" />
	{/if}

	<div class="col">
		{#if form?.error}
			<span class="failed">{form.error}</span>
		{/if}
		<button class="button" {disabled} type="submit"> Войти </button>
		<a class="link right font-14" href="/signup">Eще нет аккаунта?</a>
	</div>
</form>
