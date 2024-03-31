<script>
	import { state, error } from '$lib';
	import { checkContacts, normContacts } from '$lib/data/user';
	import { copyPaste } from '$lib/data/edit';

	let contacts = $state.contacts;
</script>

<div class="col">
	<input type="hidden" bind:value={$state.contacts} id="contacts" name="contacts" />

		<div
			class="placeholder"
			role="textbox"
			name="contacts"
			tabindex="0"
			contenteditable="true"
			on:keydown={() => delete $error.contacts}
			on:paste|preventDefault={copyPaste}
			placeholder="Соцсети"
			bind:innerText={contacts}
			type="text"
			on:blur={() => {
				if (contacts !== '') {
					$error.contacts = checkContacts(contacts);
					if (!$error.contacts) $state.contacts = contacts = normContacts(contacts);
				}
			}}
		/>

	{#if $error.contacts}
		<span class="failed">{$error.contacts}</span>
	{/if}
</div>
