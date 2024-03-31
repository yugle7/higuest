<script>
	import { state, error } from '$lib';
	import { checkUsername } from '$lib/data/user';
</script>

<div class="col">
	<input
		class="input"
		class:failed={$error.username}
		placeholder="Логин"
		bind:value={$state.username}
		on:input={() => ($error.username = null)}
		on:blur={() => ($error.username = checkUsername($state.username))}
		id="username"
		type="text"
		name="username"
		required
	/>
	{#if $error.username}
		<span class="failed">{$error.username}</span>
	{/if}
</div>
