<script>
	import { enhance } from '$app/forms';
	import { state } from '$lib';

	import One from '$lib/edit/One.svelte';
	import Text from '$lib/edit/text/Text.svelte';

	import { discussion_topic } from '$lib/data/discussion';

	export let discussion;

	const { title, topic, text } = discussion;
	$state = { title, topic, text };

	$: disabled = !Object.entries($state).some(([k, v]) => v != discussion[k]);
</script>

<form method="post" class="col gap-30 padding-20 content-900 scroll" use:enhance>
	<Text key="title" title="Заголовок" />

	<One key="topic" title="Раздел" labels={discussion_topic} />
	<Text key="text" title="Описание" />

	<div class="row right gap-15">
		<button class="link" on:click|preventDefault|stopPropagation>Отменить</button>
		<button class="button" {disabled} type="submit">Обновить</button>
	</div>
</form>
