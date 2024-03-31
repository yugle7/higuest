<script>
	import { state } from '$lib';
	import { getAddress } from '$lib/data/house';
	
	import Text from '$lib/edit/text/Text.svelte';

	let address = getAddress($state);
</script>

<button
	class="font-14 link"
	on:click|preventDefault={() => (address = !address && getAddress($state))}
>
	{#if address}
		{address}
	{:else}
		Адрес
	{/if}
</button>

<div class:hidden={address} class="col gap-10">
	<Text key="city" title="Город" />
	<Text key="street" title="Улица" />
	<Text key="building" title="Дом" />
</div>
