<script lang="ts">
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldError
	} from '$lib/components/ui/field/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { resetMode, setMode } from 'mode-watcher';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { Box } from '@lucide/svelte';
	import { enhance } from '$app/forms';

	let { form } = $props();
	let username = $state('');
	let password = $state('');

	let showUsernameError = $derived(form?.invalidUsername);
	let showPasswordError = $derived(form?.invalidPassword);
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<div class="fixed top-4 right-5">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
					<SunIcon
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
					/>
					<MoonIcon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item onclick={() => setMode('light')}>Light</DropdownMenu.Item>
					<DropdownMenu.Item onclick={() => setMode('dark')}>Dark</DropdownMenu.Item>
					<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<form method="POST" action="?/login" use:enhance>
			<FieldGroup>
				<div class="flex flex-col items-center gap-4 text-center">
					<div class="flex flex-col items-center gap-2">
						<Box class="size-6" />

						<h1 class="text-xl font-bold">Welcome to Sentry</h1>
					</div>

					<FieldDescription>A smart document submission management system</FieldDescription>
				</div>

				<Field>
					<FieldLabel for="username">Username</FieldLabel>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="Username"
						required
						bind:value={username}
						class={showUsernameError ? 'border-destructive' : ''}
						oninput={() => (showUsernameError = false)}
					/>

					{#if showUsernameError}
						<FieldError>This username does not exist.</FieldError>
					{/if}
				</Field>

				<Field>
					<FieldLabel for="password">Password</FieldLabel>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Password"
						required
						bind:value={password}
						class={showPasswordError ? 'border-destructive' : ''}
						oninput={() => (showPasswordError = false)}
					/>

					{#if showPasswordError}
						<FieldError>This password is invalid.</FieldError>
					{/if}
				</Field>

				<Field>
					<Button class="hover:cursor-pointer" name="login" type="submit">Login</Button>
				</Field>
			</FieldGroup>
		</form>
	</div>
</div>
