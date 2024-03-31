<script>
	import { order_status, getCounts } from '$lib/data/order';

	import InOut from '$lib/show/time/InOut.svelte';
	import Date from '$lib/show/time/Date.svelte';
	import Text from '$lib/show/text/Text.svelte';

	import Price from './Price.svelte';
	import House from './House.svelte';

	import ToUser from '$lib/show/user/ToUser.svelte';

	export let order;
	export let status = order.status;

	const { client, text, created, check_in, check_out, phone } = order;
</script>

<div class="col content-900 padding-20 gap-10">
	<div class="relative">
		<House {order} />
		<span class="top-right">
			<Date time={created} />
		</span>
	</div>

	<div class="col line-1">
		<InOut {check_in} {check_out} />
		<span class="subtitle">{order_status[status]}</span>
	</div>

	<div class="col">
		<Price {order} />
		<span class="subtitle row gap-10">
			{#each getCounts(order) as count}
				<span>{count}</span>
			{/each}
		</span>
	</div>

	<div class="col">
		<ToUser user={client} />
		<span class="subtitle">{phone}</span>
	</div>

	{#if text}
		<Text {text} />
	{/if}
</div>
