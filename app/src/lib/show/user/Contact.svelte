<script>
	import { hosts } from '$lib/data/user';

	export let contact;
	const [domain, id] = contact.split('/');
</script>


<a class="link font-16" href="https://{hosts[domain]}/{id}" target="_blank">{domain}</a>
