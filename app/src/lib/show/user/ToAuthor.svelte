<script>
	export let author;
	const { username } = author;
</script>

<a class="link" href="/users/{username}">{username}</a>

<style>
	a {
		opacity: 75%;
		padding-right: 5px;
	}
	a:hover {
		opacity: 100%;
	}
</style>
