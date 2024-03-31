<script>
	import { state, error } from '$lib';
	import { checkEmail } from '$lib/data/user';
</script>

<div class="col">
	<input
		class="input"
		class:failed={$error.email}
		placeholder="Email"
		bind:value={$state.email}
		on:input={() => ($error.email = null)}
		on:blur={() => ($error.email = checkEmail($state.email))}
		type="email"
		name="email"
	/>
	{#if $error.email}
		<span class="failed">{$error.email}</span>
	{/if}
</div>
