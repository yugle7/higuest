<script>
	import { state } from '$lib';
	import { enhance } from '$app/forms';

	import Fullname from '$lib/edit/user/Fullname.svelte';
	import Phone from '$lib/edit/user/Phone.svelte';
	import Contacts from '$lib/edit/user/Contacts.svelte';

	import Close from '$lib/show/Close.svelte';

	export let profile;

	const { check_in, check_out, adults, children, kids, cars } = $state;

	if (profile) ['phone', 'fullname', 'contacts'].forEach((k) => ($state[k] = $state[k] || profile[k]));
	$: disabled = ['fullname', 'phone'].some((k) => !$state[k]);

	let data;
</script>

<Close on:click />

<form method="post" class="auth" use:enhance>
	<Fullname />
	<Phone />
	<Contacts />

	<input type="hidden" value={data} name="data" />

	<button
		{disabled}
		class="button"
		on:click={() => (data = JSON.stringify({ check_in, check_out, adults, children, kids, cars }))}
	>
		Далее
	</button>
</form>
