<script>
	import { user_role } from '$lib/data/user';

	export let user;
	export let params;

	const { username, role, friend } = user;

	const getSubtitle = () => {
		const names = [];
		if (params.role == null) names.push(user_role[role]);
		if (!params.friend && friend) names.push('Друг');
		return names.join(' – ');
	};
</script>

<a class="link" href="/users/{username}">
	<div>
		<span class="username font-20">{username}</span>
		<span class="font-14">{getSubtitle()}</span>
	</div>
</a>

<style>
	a {
		opacity: 90%;
	}
	.username {
		padding: 0 5px;
	}
	div {
		padding: 20px;
		margin: 0 auto;
		max-width: 600px;
	}
</style>
