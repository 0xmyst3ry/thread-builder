# Thread Builder

Paste a long piece of writing and get it back as a numbered thread of 280-character posts, ready to review, reorder and attach media to.

> **Status: working front end, mock posting.** The "Post Now" and "Schedule Post" buttons call a local API route that only simulates sending (see [What is real and what is mocked](#what-is-real-and-what-is-mocked)). Nothing is sent to X/Twitter.

## What it does

- **Splits text into a thread.** Paragraphs and sentences are kept together where possible, a sentence longer than 280 characters is split further, and posts are numbered `1/5`, `2/5` and so on when there is more than one.
- **Preview and edit.** Each post is shown as a card. You can delete a post and drag posts into a new order (built with `@dnd-kit`).
- **Attach media.** Add an image or video to a post, with alt text for accessibility.
- **Light and dark theme.**

The splitting logic lives in [`lib/threadutils.ts`](lib/threadutils.ts).

## Run it

You need Node.js 20.9 or newer (required by Next.js 16).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/thread-builder`.

Other scripts:

```bash
npm run lint    # ESLint
npm run build   # production build
```

## What is real and what is mocked

| Part | State |
| --- | --- |
| Splitting long text into 280-character posts | Real |
| Preview, delete, drag to reorder | Real |
| Media picker with alt text | Real |
| `POST /api/post-thread` ("Post Now", "Schedule Post") | **Mock.** It validates the request, waits 0.5 to 1.5 seconds, returns a fake thread ID, and fails about 10% of the time on purpose to exercise error handling |
| `GET /api/placeholder/[width]/[height]` | Returns a grey SVG placeholder image, capped at 2000 px |

Connecting a real X API client would mean replacing the mock handler in [`pages/api/post-thread.ts`](pages/api/post-thread.ts) with authenticated calls. That is not done.

## Tech

Next.js (Pages Router), React, TypeScript, Tailwind CSS, Radix UI primitives, `@dnd-kit`, `next-themes`.

## License

[MIT](LICENSE)
