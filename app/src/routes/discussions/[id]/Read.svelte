<script>
	import { discussion_topic } from '$lib/data/discussion';

	import ToReact from '../ToReact.svelte';
	import ToAuthor from '$lib/show/user/ToAuthor.svelte';
	import Date from '$lib/show/time/Date.svelte';

	import Text from '$lib/show/text/Text.svelte';

	export let discussion;
	export let chat = true;

	export let profile;

	const { title, topic, text, author_id, author, created } = discussion;
</script>

<div class="col scroll gap-10 padding-20 content-900">
	<span class="col top">
		<h1 class="line-1">{title}</h1>
		<span class="subtitle">{discussion_topic[topic]}</span>
	</span>

	<Text {text} />

	<div class="row away center">
		<ToReact {profile} {discussion} />
		<span class="right line-2">
			<ToAuthor {author} />
			<Date time={created} />
		</span>
	</div>

	<div class="row away center">
		{#if chat}
			<a class="link" href="?type=1">Открыть чат</a>
		{:else}
			<span></span>
		{/if}
		{#if profile && (profile.role >= 3 || profile.id === author_id)}
			<button class="button" on:click>Исправить</button>
		{/if}
	</div>
</div>
