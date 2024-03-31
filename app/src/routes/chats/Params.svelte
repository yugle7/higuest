<script>
	import Select from '$lib/edit/Select.svelte';
	import { chat_type } from '$lib/chat/data';
</script>

<Select key="type" labels={chat_type} />
<a class="link" href="/users/support?type=0">Написать в поддержку</a>
