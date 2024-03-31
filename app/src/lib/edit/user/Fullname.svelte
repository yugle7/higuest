<script>
	import { state, error } from '$lib';
</script>

<div class="col">
	<input
		class="input"
		type="text"
		name="fullname"
		bind:value={$state.fullname}
		placeholder="Имя"
		on:blur={() => ($error.fullname = !$state.fullname && 'Как вас зовут?')}
		on:input={() => ($error.fullname = null)}
	/>
	{#if $error.fullname}
		<span class="failed">{$error.fullname}</span>
	{/if}
</div>
