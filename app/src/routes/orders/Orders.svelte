<script>
	import Order from '$lib/show/order/Order.svelte';

	export let orders;
</script>

{#if orders.length > 0}
	<ul class="top-5">
		{#each orders as order (order.id)}
			<li class="hover" class:disabled={order.status === 2}>
				<Order {order} />
			</li>
		{/each}
	</ul>
{:else}
	<h1 class="title shy line-3">Ничего не найдено</h1>
{/if}
