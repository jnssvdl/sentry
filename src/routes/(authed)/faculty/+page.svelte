<script lang="ts">
	import type { PageProps } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { FileText, Calendar, ChartBarStacked, Users } from '@lucide/svelte';

	let { data }: PageProps = $props();

	const formatDate = (value: string | number | Date) =>
		new Intl.DateTimeFormat('en-US', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(new Date(value));

	const submissionCount = $derived(data.facultySubmissions.length);

	const uniqueStudents = $derived(new Set(data.facultySubmissions.map((s) => s.studentTag)).size);

	const uniqueCategories = $derived(
		new Set(data.facultySubmissions.map((s) => s.categoryName)).size
	);
</script>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="container mx-auto mb-12 max-w-7xl">
		<div class="mb-8">
			<h1 class="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">Student Submissions</h1>
			<p class="text-lg">Review submissions sent to your categories</p>
		</div>

		<!-- Stats -->
		<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium">Total Submissions</p>
						<p class="mt-1 text-3xl font-bold">{submissionCount}</p>
					</div>
					<div class="rounded-lg bg-accent p-3">
						<FileText class="h-6 w-6 text-accent-foreground" />
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium">Categories</p>
						<p class="mt-1 text-3xl font-bold">{uniqueCategories}</p>
					</div>
					<div class="rounded-lg bg-accent p-3">
						<ChartBarStacked class="h-6 w-6 text-accent-foreground" />
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium">Students</p>
						<p class="mt-1 text-3xl font-bold">{uniqueStudents}</p>
					</div>
					<div class="rounded-lg bg-accent p-3">
						<Users class="h-6 w-6 text-accent-foreground" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Table -->
	<div class="container mx-auto max-w-7xl">
		<div class="overflow-hidden rounded-xl border shadow-sm">
			<div class="overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row class="border-b bg-card">
							<Table.Head class="px-6 py-4 font-semibold">Student</Table.Head>
							<Table.Head class="px-6 py-4 font-semibold">Category</Table.Head>
							<Table.Head class="px-6 py-4 font-semibold">Reason</Table.Head>
							<Table.Head class="px-6 py-4 font-semibold">Date</Table.Head>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{#if data.facultySubmissions.length === 0}
							<Table.Row>
								<Table.Cell colspan={5} class="px-6 py-12 text-center text-muted-foreground">
									<div class="flex flex-col items-center gap-2">
										<FileText class="h-8 w-8 opacity-40" />
										<p>No submissions yet</p>
									</div>
								</Table.Cell>
							</Table.Row>
						{:else}
							{#each data.facultySubmissions as submission (submission.submissionId)}
								<Table.Row class="border-b">
									<!-- Student -->
									<Table.Cell class="px-6 py-4 font-medium">
										<div class="flex items-center gap-3">
											<div class="shrink-0">
												<div
													class="flex h-10 w-10 items-center justify-center rounded-full bg-accent"
												>
													<span class="text-sm font-semibold text-accent-foreground">
														{submission.studentFirstName.charAt(
															0
														)}{submission.studentLastName.charAt(0)}
													</span>
												</div>
											</div>

											<div>
												<p class="font-medium">
													{submission.studentFirstName}
													{submission.studentLastName}
												</p>
												<a
													href={`mailto:${submission.studentEmail}`}
													class="text-xs text-muted-foreground underline-offset-4 hover:underline"
												>
													{submission.studentEmail}
												</a>
											</div>
										</div>
									</Table.Cell>

									<!-- Category -->
									<Table.Cell class="px-6 py-4">
										<span
											class="inline-flex rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
										>
											{submission.categoryName}
										</span>
									</Table.Cell>

									<!-- Reason -->
									<Table.Cell class="max-w-xs px-6 py-4 text-sm">
										<span class="line-clamp-2" title={submission.reason ?? 'No reason provided'}>
											{submission.reason ?? '—'}
										</span>
									</Table.Cell>

									<!-- Date -->
									<Table.Cell class="px-6 py-4 text-sm">
										<div class="flex items-center gap-2">
											<Calendar class="h-4 w-4 text-muted-foreground" />
											{formatDate(submission.createdAt)}
										</div>
									</Table.Cell>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</div>

			{#if submissionCount > 0}
				<div class="border-t bg-card px-6 py-4 text-sm">
					Showing <span class="font-medium">{submissionCount}</span>
					submission{submissionCount !== 1 ? 's' : ''}
				</div>
			{/if}
		</div>
	</div>
</div>
