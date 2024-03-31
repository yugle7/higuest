<script>
	import { user_role, user_sort } from '$lib/data/user';
	import { state } from '$lib';

	import Radio from '$lib/edit/Radio.svelte';
	import Flag from '$lib/edit/Flag.svelte';
	import Select from '$lib/edit/Select.svelte';

	export let profile;

	$: roles = $state.wanted ? user_role.slice(0, profile.role) : user_role;
	$: if ($state.wanted && $state.role >= profile.role) $state.role = null;
</script>

{#if roles}
	<Select key="role" labels={roles} />
{/if}

{#if profile}
	<Flag key="friend" title="Друзья" />

	{#if profile.role >= 2}
		<Flag key="wanted" title="Запрошена роль" />
	{/if}
{/if}

<Radio key="sort" labels={user_sort} />
