# AI Travel Planner ✈️

A premium, highly responsive **AI Travel Planner** web application built with **React 19**, **Vite 8**, **TypeScript**, and **Tailwind CSS v4**. Craft custom, detailed travel itineraries in seconds!

🌐 **Live Local Address**: `https://ai-travel-planner-with-gemini-4vfqlnj5f-gautam-shendes-projects.vercel.app/`

---

## Key Features

- 🌍 **9-Section Travel Plans**: Generates expert itineraries complete with Trip Summaries, tabbed Day-wise schedules, Budget breakdowns, Top attractions, Famous local foods, Packing checklists, Safety advices, Money saving tips, and Hidden gems.
- 🔌 **Dual-Mode AI Engine**:
  - **Gemini Mode (Online)**: Interacts with the real Google Gemini API to compile dynamic, real-time travel recommendations.
  - **Offline Mode (Simulated)**: A fast fallback engine utilizing curated high-fidelity travel templates for popular destinations (Tokyo, Paris, Goa) and custom procedural generation for any other location.
- 💾 **Recent Trips Storage**: Automatically saves the last 5 unique generated plans to browser `localStorage` for easy offline retrieval and comparison.
- 📄 **Export to PDF**: Generate and download a beautifully styled, multi-page PDF document of your complete itinerary client-side using `jsPDF`.
- 🌓 **Dynamic Theme Toggling**: Seamless light/dark mode persistence synced to your browser preference and persisted in `localStorage`.
- ⚠️ **Graceful Error Handling**: Automatically switches to Offline simulation mode if the Gemini API call encounters networking or key authorization failures, warning the traveler with a clean notification banner.
- 🎨 **Premium Visual Layout**: High-fidelity glassmorphism elements, micro-animations, loading loaders, canvas-confetti bursts, and responsive columns.
- ♿ **Enhanced Accessibility**: Keyboard focus indicators (`focus:ring-2`), semantic HTML5 tags, and contrast-aligned design.

---

## Technology Stack

- **Core Framework**: React 19, TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styles**: Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin)
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Celebration Effects**: Canvas Confetti

---

## Project Structure

```bash
c:/capston_project/
├── index.html                  # SEO structured entry HTML
├── vite.config.ts              # Vite configurations with Tailwind v4 plugin
├── package.json                # Project script commands and dependencies
├── README.md                   # Documentation file
└── src/
    ├── main.tsx                # React index rendering
    ├── App.tsx                 # App layout and state manager
    ├── index.css               # Tailwind directives, animations & resets
    ├── components/
    │   ├── ThemeToggle.tsx     # Floating light/dark button
    │   ├── TravelForm.tsx      # Travel inputs (presets, key configurations, validation)
    │   ├── LoadingScreen.tsx   # Progressive animated loader
    │   ├── ItineraryDashboard.ts # Dashboard tabs & operations
    │   ├── BudgetVisualizer.tsx # Budget progress charts & totals
    │   ├── PackingChecklist.tsx # Interactive packing todo items
    │   ├── GuideSection.tsx    # Weather advisories & Safety rules
    │   ├── TopPlaces.tsx       # Recommended sightseeing cards
    │   ├── LocalFoods.tsx      # Gastronomic recommendations
    │   ├── HiddenGems.tsx      # Uncrowded locations guide
    │   └── MoneySavingTips.tsx # Budget optimization list
    ├── services/
    │   └── travelPlanner.ts    # Dual-mode AI planner engine
    └── utils/
        └── pdfExporter.ts      # Multi-page PDF generation library using jsPDF
```

---

## Installation & Setup

Follow these steps to run the application on your local machine:

1. **Clone or Navigate to the Directory**:
   ```bash
   cd c:/capston_project
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The local server will start, typically at `http://localhost:5173/`. Open this link in your browser to view the application.

4. **Verify TypeScript & Production Build**:
   To verify that types are fully aligned and build files optimize without warning:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
