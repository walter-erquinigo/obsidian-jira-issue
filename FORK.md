# Jira Issue Fast Fork

This is a personal fork of
[`marc0l92/obsidian-jira-issue`](https://github.com/marc0l92/obsidian-jira-issue)
at version 1.58.1.

## Why This Fork Exists

Inline issues waited for authenticated Jira icons and avatars before rendering
their text. On the target Jira server, several image requests fail only after
roughly 10-13 seconds and are performed sequentially.

This fork adds a `fetchImages` option to `JiraClient.getIssue()` and disables
image prefetching for inline issues in Reading View and Live Preview. Jira
issue blocks, searches, and public API calls keep the upstream default of
fetching images.

The Obsidian plugin ID is `obsidian-jira-issue-fast`, allowing it to be tested
beside the official plugin. Never enable both plugins simultaneously because
they register the same Markdown processors and global API.

## Build

```sh
npx --yes pnpm@10.14.0 install --frozen-lockfile
npx --yes pnpm@10.14.0 test
npx --yes pnpm@10.14.0 run build
```

Install `main.js`, `manifest.json`, and `styles.css` in:

```text
<vault>/.obsidian/plugins/obsidian-jira-issue-fast/
```

The plugin's `data.json` contains Jira credentials. Keep it local and never
commit it to this repository.
