<script>
	import { enhance } from '$app/forms';
	import { state, screen, loaded } from '$lib';
	import { discussion_topic } from '$lib/data/discussion';

	import One from '$lib/edit/One.svelte';
	import Text from '$lib/edit/text/Text.svelte';

	export let data;
	const { username } = data.profile;

	$state = {};
	$: disabled = ['title', 'topic', 'text'].some((k) => !$state[k]);

	$loaded = true;
</script>

<svelte:head>
	<title>Новое общение</title>
</svelte:head>

{#if $screen}
	<a class="top-right" href="/users/{username}">
		<img src="/icons/close.svg" alt="close" />
	</a>
{/if}

{#if $loaded}
	<div class="page">
		<form method="post" class="col padding-20 gap-30 content-900" use:enhance>
			<Text key="title" title="Заголовок" />
			<One key="topic" title="Раздел" labels={discussion_topic} />
			<Text key="text" title="Описание" />

			<div class="row gap-15 center right">
				{#if !$screen}
					<a class="link" href="/users/{username}">Отменить</a>
				{/if}
				<button class="button" {disabled} type="submit">Создать</button>
			</div>
		</form>
	</div>
{/if}
