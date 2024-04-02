<script>
	import { plus, state } from '$lib';
	import Photo from './Photo.svelte';

	export let i = null;
	const data = i == null ? $state : $state.rooms[i];

	data.photo_ids = [...Array(data.photos.length).keys()];

	let inputs;
	let src, dst, tap;

	const move = () => {
		if (src == null || dst == null) return;

		const i = data.photo_ids.findIndex((id) => id == src);
		if (i < 0) return;

		const j = data.photo_ids.findIndex((id) => id == dst);
		if (j < 0) return;

		if (i < j) {
			data.photo_ids = [
				...data.photo_ids.slice(0, i),
				...data.photo_ids.slice(i + 1, j + 1),
				data.photo_ids[i],
				...data.photo_ids.slice(j + 1)
			];
		} else if (j < i) {
			data.photo_ids = [
				...data.photo_ids.slice(0, j),
				data.photo_ids[i],
				...data.photo_ids.slice(j, i),
				...data.photo_ids.slice(i + 1)
			];
		}
	};

	let tapTime;

	const onChange = (e) => {
		for (const f of e.target.files) {
			data.photo_ids.push(data.photos.length);
			data.photos.push(URL.createObjectURL(f));
		}
		data.photo_ids = data.photo_ids;
	};
</script>

<ul
	class="row gap-4 wrap"
	on:drop={(e) => {
		if (src != null) {
			dst = e.target.closest('li').id;
			move();
		}
	}}
	on:dragover={(e) => e.preventDefault()}
>
	{#each data.photo_ids as id (id)}
		<Photo
			{id}
			src={data.photos[id]}
			selected={src == id}
			on:drag={() => (src = id)}
			on:dragover={(e) => e.preventDefault()}
			on:touchstart={() => {
				dst = i;

				if (tap == dst) {
					if (Date.now() - tapTime < 300) {
						data.photo_ids = data.photo_ids.filter((id) => id !== dst);
						src = tap = tapTime = null;
						return;
					} else {
						src = src != null ? null : dst;
						tapTime = Date.now();
					}
				} else if (src != null) {
					move();
					src = tap = tapTime = null;
				} else {
					src = tap = dst;
					tapTime = Date.now();
				}
			}}
			on:dragend={() => (src = null)}
			on:click={() => (data.photo_ids = data.photo_ids.filter((p) => p !== id))}
		/>
	{/each}
</ul>

<div hidden bind:this={inputs}></div>
<button
	class="link"
	on:click|preventDefault={() => {
		const input = document.createElement('input');
		input.type = 'file';
		input.name = (i == null ? '' : i) + '+';
		input.multiple = true;
		input.accept = 'image/*';
		input.addEventListener('change', onChange);
		inputs.appendChild(input);
		input.click();
	}}
>
	{plus} Фото
</button>
