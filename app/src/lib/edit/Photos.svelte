<script>
	import { plus, state } from '$lib';
	import Photo from './Photo.svelte';

	export let i = null;
	const data = i == null ? $state : $state.rooms[i];

	let photos = data.photos;
	$: data.photos = photos.map(({ id }) => id);

	let inputs;

	let src, dst, tap;
	let id = photos.length;

	const move = () => {
		if (src == null || dst == null) return;

		const i = photos.findIndex(({ id }) => id == src);
		if (i < 0) return;

		const j = photos.findIndex(({ id }) => id == dst);
		if (j < 0) return;

		if (i < j) {
			photos = [
				...photos.slice(0, i),
				...photos.slice(i + 1, j + 1),
				photos[i],
				...photos.slice(j + 1)
			];
		} else if (j < i) {
			photos = [...photos.slice(0, j), photos[i], ...photos.slice(j, i), ...photos.slice(i + 1)];
		}
	};

	let tapTime;

	const onChange = (e) => {
		for (const f of e.target.files) {
			photos.push({ id: id++, url: URL.createObjectURL(f) });
		}
		photos = photos;
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
	{#each photos as photo (photo.id)}
		<Photo
			{photo}
			selected={src == photo.id}
			on:drag={() => (src = photo.id)}
			on:dragover={(e) => e.preventDefault()}
			on:touchstart={() => {
				dst = photo.id;

				if (tap == dst) {
					if (Date.now() - tapTime < 300) {
						photos = photos.filter(({ id }) => id !== dst);
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
			on:click={() => (photos = photos.filter(({ id }) => id !== photo.id))}
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
