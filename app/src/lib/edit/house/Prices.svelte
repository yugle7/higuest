<script>
	import { state } from '$lib';
	import { getWidth } from '$lib/data/edit';

	export let i = null;
	const data = i == null ? $state : $state.rooms[i];
	$: price = Math.min(...data.price.filter((p) => p > 0));

	let hidden = price == Infinity;
</script>

<div class="col gap-20 font-16">
	<button
		disabled={price == Infinity}
		class="link"
		on:click|preventDefault={() => (hidden = !hidden)}
	>
		{#if hidden && price != Infinity}
			От <span class="monospace font-20 side-3">{price}</span> ₽ / ночь
		{:else}
			Стоимость
		{/if}
	</button>

	<div class="col gap-20" class:hidden>
		{#each ['Будни', 'Выходные', 'Долгие выходные', 'Праздники'] as label, j (j)}
			<span>
				<span class:disabled={!data.price[j]} class="right-5">{label}</span>
				<input
					id={i + ' ' + j}
					type="number"
					class="monospace font-20"
					bind:value={data.price[j]}
					step="100"
					placeholder="0"
					style="width: {getWidth(data.price[j], 0, 3)}px"
				/>
				<button
					class="left-5"
					on:click|preventDefault={() =>
						document
							.getElementById(i + ' ' + j)
							.closest('input')
							.focus()}
				>
					₽ / ночь
				</button>
			</span>
		{/each}
	</div>
</div>
