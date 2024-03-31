<script>
	export let user;

	const { username, fullname } = user;
</script>

{#if username}
	<a class="link" href="/users/{username}">{fullname || username}</a>
{:else}
	<span>{fullname}</span>
{/if}

<style>
	a {
		opacity: 75%;
		padding-right: 5px;
	}
	a:hover {
		opacity: 100%;
	}
</style>
