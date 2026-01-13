<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	interface Props {
		role: string;
		form: {
			missing?: boolean;
			mismatchPassword?: boolean;
			success?: boolean;
			usernameExists?: boolean;
			emailExists?: boolean;
		} | null;
	}

	let { role, form }: Props = $props();

	let showEmailExists = $derived(form?.emailExists);
	let showUsernameExists = $derived(form?.usernameExists);
	let showPasswordError = $derived(form?.mismatchPassword);
</script>

<Field.Group>
	<!-- Full Name -->
	<Field.Field>
		<Field.Field class="grid grid-cols-2 gap-4">
			<Field.Field>
				<Field.Label for="first-name">First Name</Field.Label>
				<Input id="first-name" type="text" name="first-name" placeholder="Joeniesus" required />
			</Field.Field>
			<Field.Field>
				<Field.Label for="last-name">Last Name</Field.Label>
				<Input id="last-name" type="text" name="last-name" placeholder="Vidal" required />
			</Field.Field>
		</Field.Field>
	</Field.Field>

	<!-- Email -->
	<Field.Field>
		<Field.Label for="email">Email</Field.Label>
		<Input
			id="email"
			type="email"
			name="email"
			placeholder="joe@example.com"
			class={showEmailExists ? 'border-destructive' : ''}
			oninput={() => (showEmailExists = false)}
			required
		/>

		{#if showEmailExists}
			<Field.FieldError>An account with this email already exists.</Field.FieldError>
		{/if}
	</Field.Field>

	{#if role === 'student'}
		<!-- RFID -->
		<Field.Field>
			<Field.Label for="tag">RFID Tag</Field.Label>
			<Input id="tag" type="text" name="tag" placeholder="RFID-01" required />
		</Field.Field>
	{/if}

	<!-- Username -->
	<Field.Field>
		<Field.Label for="username">Username</Field.Label>
		<Input
			id="username"
			type="username"
			name="username"
			placeholder="joe"
			class={showUsernameExists ? 'border-destructive' : ''}
			oninput={() => (showUsernameExists = false)}
			required
		/>

		{#if showUsernameExists}
			<Field.FieldError>That username is taken. Try another one!</Field.FieldError>
		{/if}
	</Field.Field>

	<!-- Password -->
	<Field.Field>
		<Field.Field class="grid grid-cols-2 gap-4">
			<Field.Field>
				<Field.Label for="password">Password</Field.Label>
				<Input
					id="password"
					type="password"
					name="password"
					class={showPasswordError ? 'border-destructive' : ''}
					oninput={() => (showPasswordError = false)}
					required
				/>
			</Field.Field>
			<Field.Field>
				<Field.Label for="confirm-password">Confirm Password</Field.Label>
				<Input
					id="confirm-password"
					type="password"
					name="confirm-password"
					class={showPasswordError ? 'border-destructive' : ''}
					oninput={() => (showPasswordError = false)}
					required
				/>
			</Field.Field>
		</Field.Field>

		{#if showPasswordError}
			<Field.FieldError>Passwords don't match.</Field.FieldError>
		{/if}
	</Field.Field>
</Field.Group>
