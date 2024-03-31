<script>
	import { state, error } from '$lib';

	let phone;

	const normPhone = (v) => {
		let value = v.replace(/\D/g, '');

		let a;
		let b;
		let c;
		let d;

		if (value) {
			if (value[0] >= 7) {
				if (value[0] != 9) {
					value = value.substring(1);
				}
				const l = value.length;
				if (l > 0) a = value.substring(0, 3);
				if (l > 3) b = value.substring(3, 6);
				if (l > 6) c = value.substring(6, 8);
				if (l > 8) d = value.substring(8, 10);

				if (d) return `+7 (${a}) ${b}-${c}-${d}`;
				if (c) return `+7 (${a}) ${b}-${c}`;
				if (b) return `+7 (${a}) ${b}`;
				if (a) return `+7 (${a}`;

				return '+7 (';
			}
			if (v[0] != '+' && /\d/.test(v[0])) return value;
		}
		if (v[0] == '+') return '+7 (';
	};

	const handleInput = (e) => {
		if (!e.data && e.inputType != 'insertFromPaste') return;

		const v = phone.value;
		if (!v) return;

		const i = phone.selectionStart;
		if (i < v.length) {
			if (/\D/.test(e.data)) {
				phone.value = v.substring(0, i - 1) + v.substring(i);
				phone.setSelectionRange(i - 1, i - 1);
			}
		} else {
			phone.value = normPhone(v);
		}
	};
</script>

<div class="col">
	<input
		bind:this={phone}
		bind:value={$state.phone}
		class="input"
		type="tel"
		placeholder="Телефон"
		name="phone"
		on:input={(e) => {
			handleInput(e);
			$error.phone = null;
		}}
		on:blur={() => ($error.phone = !$state.phone && 'Как с вами связаться?')}
	/>
	{#if $error.phone}
		<span class="failed">{$error.phone}</span>
	{/if}
</div>
