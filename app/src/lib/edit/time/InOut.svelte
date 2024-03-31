<script>
	import { state } from '$lib';

	import { weekdays, getCalendar, getNow } from '$lib/data/date';
	import { holidays } from '$lib/data/day';

	import InOut from '$lib/show/time/InOut.svelte';

	let { check_in, check_out } = $state;
	export let checked = new Set([]);

	let width;

	let hidden = true;
	const now = getNow();

	$: max_check_out =
		check_in && checked.size && Math.min(...[...checked].filter((date) => date > check_in));
</script>

<button class="row away link top-5" on:click={() => (hidden = !hidden)}>
	<InOut {check_in} {check_out} />
</button>

<div class:hidden class="col calendar gap-20" bind:clientWidth={width}>
	<div class="row around">
		{#each weekdays as weekday, i}
			<span class:holiday={i >= 5}>{weekday}</span>
		{/each}
	</div>

	{#each getCalendar(now) as { year, month, dates }}
		{#if year}
			<h2>{year}</h2>
		{/if}

		{month}

		<div class="month font-20" style="font-size: {width ? Math.floor(width / 17) : 20}px">
			{#each dates as { day, today }}
				{#if !day}
					<span />
				{:else}
					<button
						disabled={today < now ||
							(today != check_out && checked.has(today) && (check_out || today != max_check_out))}
						class="day"
						class:holiday={holidays[today] > 0}
						class:highlighted={today > check_in && today < check_out}
						class:checked={check_in == today || check_out == today}
						class:in={check_out && check_in == today}
						class:out={check_in && check_out == today}
						on:click={() => {
							if (check_in && !check_out) {
								if (today < check_in || (max_check_out && today > max_check_out)) {
									check_in = today;
								} else {
									if (today > check_in) {
										check_out = today;
									} else {
										check_in = null;
									}
									$state.check_in = check_in;
									$state.check_out = check_out;
									$state = $state;
								}
							} else {
								check_in = today;
								check_out = null;
							}
						}}
					>
						{day}
					</button>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.calendar {
		max-width: 400px;
	}
	.month {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}
	.day {
		width: 100%;
		aspect-ratio: 1/1;
	}
	.holiday {
		color: var(--color-red);
	}

	.checked {
		border-radius: 10px;
	}
	.in {
		border-radius: 10px 0 0 10px;
	}
	.out {
		border-radius: 0 10px 10px 0;
	}
</style>
