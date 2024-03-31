<script>
	import { state, error } from '$lib';
	import { checkPassword } from '$lib/data/user';
</script>

<div class="col">
	<input
		class="input"
		class:failed={$error.password}
		placeholder="Пароль"
		bind:value={$state.password}
		on:input={() => $error.password}
		on:blur={() => ($error.password = checkPassword($state.password))}
		type="password"
		name="password"
	/>
	{#if $error.password}
		<span class="failed">{$error.password}</span>
	{/if}
</div>
