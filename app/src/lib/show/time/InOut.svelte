<script>
	import { asDay } from '$lib/data/time';

	export let check_in;
	export let check_out;
</script>

<div class="row gap-15 font-24 line-0">
	<span>
		{#if check_in}
			{asDay(String(check_in))}
		{:else}
			Въезд
		{/if}
	</span>
	–
	<span>
		{#if check_out}
			{asDay(String(check_out))}
		{:else}
			Выезд
		{/if}
	</span>
</div>
