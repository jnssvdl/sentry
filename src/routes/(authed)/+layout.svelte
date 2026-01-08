<script lang="ts">
	let { children } = $props();
</script>

<form action="/logout" method="POST">
	<button type="submit">Logout</button>
</form>
{@render children()}
