<script lang="ts">
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogOut } from '@lucide/svelte';

	let { children } = $props();
</script>

<ModeToggle />
<form action="/logout" method="POST">
	<Button type="submit" variant="destructive"
		>Logout
		<LogOut />
	</Button>
</form>

<h1>TODO: Registration</h1>
