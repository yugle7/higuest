<script>
	import { user_role } from '$lib/data/user';
	import { enhance } from '$app/forms';

	import ToRole from './ToRole.svelte';

	import Contacts from '$lib/show/user/Contacts.svelte';
	import Link from '$lib/show/Link.svelte';

	export let profile;

	const { role, email, phone, fullname, contacts, friends, orders, houses, discussions } = profile;
</script>

<div class="col scroll gap-30 padding-20 center">
	<div class="col">
		<h1>{profile.username}</h1>
		{#if email}<span class="subtitle">{email}</span>{/if}
	</div>

	<div class="col">
		{#if fullname}<h2>{fullname}</h2>{/if}
		{#if phone}<span class="subtitle">{phone}</span>{/if}
	</div>

	{#if contacts}<Contacts {contacts} />{/if}

	<div class="col">
		<a class="link center" href="/change">Обновить данные</a>

		<form method="post" action="?/email_visibility" use:enhance>
			<input
				type="hidden"
				bind:value={profile.emailVisibility}
				name="email_visibility"
				id="email_visibility"
			/>
			<button class="link center" type="submit">
				{#if profile.emailVisibility}
					Скрыть почту от всех
				{:else}
					Сделать почту видимой всем
				{/if}
			</button>
		</form>
	</div>

	{#if orders || friends || houses || discussions}
		<div class="row wrap">
			<Link href="/orders?client_id={profile.id}" count={orders} key="orders" />
			<Link href="/users?friend=1" count={friends} key="users" />

			<Link href="/houses?manager_id={profile.id}" count={houses} key="houses" />
			<Link href="/discussions?author_id={profile.id}" count={discussions} key="discussions" />
		</div>
	{/if}

	{#if role >= 2}
		<ToRole {profile} />
	{:else}
		<span>{user_role[role]}</span>
	{/if}

	<div class="col">
		<a class="link center" href="/create/discussion">Начать новое общение</a>
		<a class="link center" href="/create/house">Добавить дом</a>
	</div>

	<form method="post" action="?/logout" use:enhance>
		<button class="link" type="submit">Выйти</button>
	</form>
</div>
