<script>
	import { house_category } from '$lib/data/house';

	import Many from '$lib/edit/Many.svelte';
	import Text from '$lib/edit/text/Text.svelte';
	import Phone from './Phone.svelte';
	import Contacts from './Contacts.svelte';

	import Rooms from './Rooms.svelte';
	import Prices from './Prices.svelte';
	import Address from './Address.svelte';
	import Cars from './Cars.svelte';
	import Photos from '../Photos.svelte';
</script>

<div class="col gap-20">
	<Text key="title" title="Название" />
	<Address />

	<Many key="categories" title="Направление" labels={house_category} />
	<Photos />
	<Text key="about" title="Описание" />

	<Cars />
	<Prices />
</div>

<Phone />
<Contacts />

<Rooms />
