<script>
	import { user_role } from '$lib/data/user';

	import Contacts from '$lib/show/user/Contacts.svelte';
	import Link from '$lib/show/Link.svelte';

	import Role from './Role.svelte';
	import Friend from './Friend.svelte';

	export let user;
	export let chat = false;
	export let profile;

	const { role, email, phone, username, fullname, contacts, houses, discussions, orders } = user;
	const counts = profile && profile.role >= 2 && orders;
</script>

<div class="col scroll gap-30 padding-20 center">
	<div class="col">
		<h1>{username}</h1>
		{#if email}<span class="subtitle">{email}</span>{/if}
	</div>

	<div class="col">
		{#if fullname}<h2>{fullname}</h2>{/if}
		{#if phone}<span class="subtitle">{phone}</span>{/if}
	</div>

	{#if contacts}<Contacts {contacts} />{/if}

	{#if houses || discussions || counts}
		<div class="row wrap">
			<Link href="/houses?manager_id={user.id}" count={houses} key="houses" />
			<Link href="/discussions?author_id={user.id}" count={discussions} key="discussions" />
			{#if counts}
				<Link href="/orders?client_id={user.id}" count={orders} key="orders" />
			{/if}
		</div>
	{/if}

	{#if profile && profile.role >= 2 && profile.role > user.role}
		<Role {user} />
	{:else}
		<span>{user_role[role]}</span>
	{/if}

	{#if profile}
		<div class="col">
			{#if chat && profile.role}
				<a class="link center" href="?type=0">Написать лично</a>
			{/if}
			<Friend {user} />
		</div>
	{/if}
</div>
