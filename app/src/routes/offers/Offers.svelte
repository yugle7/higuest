<script>
	import Offer from './Offer.svelte';

	export let offers;
	export let params;
</script>

{#if offers.length > 0}
	<ul class="top-5">
		{#each offers as offer, i (i)}
			<li class="hover">
				<Offer {offer} {params} />
			</li>
		{/each}
	</ul>
{:else}
	<h1 class="title shy line-3">Ничего не найдено</h1>
{/if}
