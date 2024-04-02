<script>
	import Phone from '$lib/show/user/Phone.svelte';
	import Contacts from '$lib/show/user/Contacts.svelte';

	export let house;

	const { phone, contacts } = house;
</script>

<span class="row gap-15 center">
	{#if contacts}<Contacts {contacts} />{/if}
	{#if phone}<Phone {phone} />{/if}
</span>
