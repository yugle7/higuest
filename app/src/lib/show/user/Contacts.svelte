<script>
	import Contact from './Contact.svelte';

	export let contacts;
</script>

<div class="row gap-15">
	{#each contacts as contact}
		<Contact {contact} />
	{/each}
</div>
