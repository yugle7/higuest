<script>
	import { enhance, applyAction } from '$app/forms';

	import Order from '$lib/show/order/Order.svelte';
	import Room from '$lib/show/order/Room.svelte';

	export let chat;
	export let profile;

	export let order;
	let { status } = order;
</script>

<Order {order} {status} />

<div class="col padding-20 gap-40 content-900">
	{#each order.rooms as room}
		<Room {room} />
	{/each}

	<div class="row gap-15 away line-1">
		<a class="link" href="?type=4">
			{#if chat}Открыть чат{/if}
		</a>

		<form method="post" action="?/status" use:enhance={() => applyAction} class="row gap-15">
			<input type="hidden" bind:value={status} name="status" />

			<button class:hidden={status === 2} class="link" type="submit" on:click={() => (status = 2)}>
				Отменить
			</button>

			{#if profile?.manager}
				<button
					class:hidden={status === 1}
					class="button"
					type="submit"
					on:click={() => (status = 1)}
				>
					Одобрить
				</button>
			{/if}
		</form>
	</div>
</div>
