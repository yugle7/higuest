<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { state } from '$lib';

	export let default_params = null;

	$state = { ...default_params };
	$page.url.searchParams.forEach((v, k) => ($state[k] = v));

	$: if ($state) {
		const url = new URL($page.url);

		for (const [k, v] of Object.entries($state)) {
			if (v != default_params[k]) {
				url.searchParams.set(k, v);
			} else {
				url.searchParams.delete(k);
			}
		}
		goto(url);
	}
</script>

<div class="col gap-40 padding-20 page font-16">
	<slot />
</div>
