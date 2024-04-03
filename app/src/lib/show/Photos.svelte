<script>
	import { screen } from '$lib';
	export let photos;

	const l = photos.length;
	let k = 0;
</script>

{#if !l}
	<span></span>
{:else if $screen}
	<button class="row one gap-4" on:click|preventDefault|stopPropagation>
		{#each photos as photo}
			<img src={photo} alt="slide" />
		{/each}
	</button>
{:else}
	<div class="two">
		<section class="relative">
			<div class="row absolute width-100 height-100">
				<button class="width-50" on:click|preventDefault={() => (k = k === l - 1 ? 0 : k + 1)} />
				<button class="width-50" on:click|preventDefault={() => (k = k === 0 ? l - 1 : k - 1)} />
			</div>
			<img src={photos[k]} alt="slide" />
		</section>
		<button on:click|preventDefault>
			{#if l < 4}
				<section class="relative">
					<img class="faded" src={photos[+(l > 1)]} alt="to slider" />
					<span class="middle col"><span class="font-32">{l}</span>фото</span>
				</section>
			{:else}
				<div class="two">
					{#each { length: 3 } as _, i}
						<section>
							<img src={photos[i + 1]} alt="to slider" />
						</section>
					{/each}
					<section class="relative">
						<img class="faded" src={photos[4 % l]} alt="to slider" />
						<span class="middle col"><span class="font-32">{l}</span>фото</span>
					</section>
				</div>
			{/if}
		</button>
	</div>
{/if}

<style>
	img {
		height: 300px;
		width: auto;
	}
	section img {
		height: auto;
		width: 100%;
		border-radius: 10px;
		aspect-ratio: 4/3;
		object-fit: cover;
		object-position: center;
	}

	.one {
		padding-top: 10px;
		padding-bottom: 2px;
		overflow-x: auto;
		margin-left: -20px;
		margin-right: -20px;
	}
	.two {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 4px;
	}
</style>
