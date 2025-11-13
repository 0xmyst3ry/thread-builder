# Thread Builder

A modern web application for creating, previewing, and managing Twitter/X thread content. Convert long-form content into perfectly formatted threads with an intuitive drag-and-drop interface.

## Features

- **Intelligent Thread Splitting**: Automatically converts long-form content (blog posts, articles) into tweet-sized segments (280 characters)
- **Visual Thread Preview**: See exactly how your thread will look before posting
- **Drag & Drop Reordering**: Easily rearrange tweets within your thread
- **Media Support**: Add images and videos to individual tweets
- **Unsplash Integration**: Search and add images from Unsplash directly
- **Post or Schedule**: Post immediately or schedule threads for later
- **Real-time Validation**: Character count validation and error handling
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Drag & Drop**: @dnd-kit
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd thread-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your API keys (see Environment Variables section below).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file based on `.env.example`:

- **Twitter API Keys**: Required for posting threads to Twitter/X (get from [Twitter Developer Portal](https://developer.twitter.com/))
- **Unsplash API Key**: Required for image search functionality (get from [Unsplash Developers](https://unsplash.com/developers))

See `.env.example` for the complete list of environment variables.

## Usage

1. **Generate Thread**:
   - Paste your long-form content into the input area
   - Click "Generate Thread" to automatically split it into tweets

2. **Edit & Customize**:
   - Reorder tweets by dragging and dropping
   - Add media (images/videos) to individual tweets
   - Delete unwanted tweets
   - Edit text directly in the preview

3. **Post or Schedule**:
   - Click "Post Now" to publish immediately
   - Click "Schedule Post" to set a future date/time

## Project Structure

```
thread-builder/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── ImageUploader.tsx
│   ├── ThreadInput.tsx
│   └── ThreadPreview.tsx
├── pages/              # Next.js pages and API routes
│   ├── api/
│   │   └── post-thread.ts
│   ├── _app.tsx
│   ├── _document.tsx
│   └── thread-builder.tsx
├── lib/                # Utility functions
│   ├── utils.ts
│   └── threadutils.ts  # Thread splitting logic
├── styles/             # Global styles
│   └── globals.css
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Explained

### Thread Splitting Algorithm

The application uses an intelligent algorithm to split long-form content:
- Respects paragraph boundaries
- Splits by sentences using natural language processing
- Handles long sentences by finding natural breakpoints (colons, commas, conjunctions)
- Adds thread numbering (e.g., "1/5 ") automatically
- Maintains 280-character limit per tweet

### Media Upload

- Supports images: JPEG, PNG, GIF, WEBP
- Supports videos: MP4, WEBM
- Maximum file size: 25MB
- Alt text support for accessibility
- Preview before uploading

### Drag & Drop

Built with @dnd-kit for smooth, accessible drag-and-drop:
- Keyboard navigation support
- Touch device compatibility
- Visual feedback during dragging
- Automatic scroll during drag

## Current Limitations

- **Mock Twitter API**: Currently uses a mock API endpoint. Real Twitter API integration is pending.
- **No Authentication**: User authentication will be added in a future release.
- **Local Storage**: Threads are not persisted between sessions yet.

## Future Roadmap

- [ ] Real Twitter API integration
- [ ] User authentication and profiles
- [ ] Save drafts to database
- [ ] Thread analytics and insights
- [ ] Advanced scheduling options
- [ ] Thread templates
- [ ] Export threads to various formats
- [ ] Collaborative thread editing
- [ ] Dark mode toggle

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Development Notes

- Uses React 19 concurrent features
- TypeScript strict mode enabled
- ESLint configured with Next.js rules
- Responsive design with Tailwind CSS
- Accessibility-first component design

## License

[Add your license here]

## Support

For issues and questions, please [open an issue](https://github.com/your-username/thread-builder/issues).

---

Built with ❤️ using Next.js and React
