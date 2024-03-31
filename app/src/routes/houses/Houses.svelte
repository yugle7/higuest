<script>
	import { page } from '$app/stores';
	import { normText } from '$lib/data/edit';
	import House from '$lib/show/house/House.svelte';

	export let houses;
	export let profile;

	export let params;

	$: search = $page.url.searchParams.get('search') || null;
	$: dst = search ? houses.filter(({ name }) => normText(name).includes(search)) : houses;
</script>

{#if dst?.length}
	<ul class="top-5">
		{#each dst as house (house.id)}
			<li class="hover content-900 padding-20">
				<House {house} {params} {profile} />
			</li>
		{/each}
	</ul>
{:else}
	<h1 class="title shy line-3">Ничего не найдено</h1>
{/if}
