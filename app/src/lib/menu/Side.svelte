<script>
	import { onMount } from 'svelte';

	import Link from './Link.svelte';
	import Button from './Button.svelte';

	export let profile;

	let theme;
	let width;

	onMount(() => {
		theme = document.documentElement.dataset.theme;
		width = localStorage.getItem('menu_width') || 'auto';
	});

	function changeTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
		document.documentElement.dataset.theme = theme;
	}
	function changeWidth() {
		width = width === 'auto' ? '0' : 'auto';
		localStorage.setItem('menu_width', width);
	}
</script>

<menu class="col away">
	{#if width}
		<div class="col left-15 top-20 right-30 gap-20" style="width: {width}">

			<Link href="/offers" key="offers">Поиск</Link>

			{#if profile}
				{#if profile.role >= 2}
					<Link href="/houses" key="houses">Дома</Link>
					<Link href="/rooms" key="rooms">Номера</Link>

					<Link href="/orders" key="orders">Заказы</Link>
					<Link href="/users" key="users">Люди</Link>
				{:else}
					<Link href="/orders?client_id={profile.id}" key="orders">Заказы</Link>
				{/if}
			{/if}

			<Link href="/discussions" key="discussions">Общение</Link>

			{#if profile}
				<Link href="/chats" key="chats">Чаты</Link>
				<Link href="/users/{profile.username}" key="profile">Профиль</Link>
			{:else}
				<Link href="/login" key="login">Войти</Link>
			{/if}

			{#if theme}
				<Button key={theme} on:click={changeTheme}>
					{#if theme === 'light'}
						Тьма
					{:else}
						Свет
					{/if}
				</Button>
			{/if}
		</div>

		<button class="link" on:click={changeWidth}>
			{#if width === 'auto'}
				&larr;
			{:else}
				&rarr;
			{/if}
		</button>
	{/if}
</menu>

<style>
	menu {
		background-color: var(--nav-color);
		border-right: 1px solid var(--color-10);
		white-space: nowrap;
		overflow: hidden;
		min-width: 70px;
	}
	button {
		border-top: 1px solid var(--color-20);
		width: 100%;
		text-align: center;
	}

	@media (max-width: 700px) {
		menu {
			width: 0;
		}
		button {
			display: none;
		}
	}
</style>
