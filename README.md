# Charcoal & Verse
> **Sketches from the ink. Voices from the void.**

Charcoal & Verse is an experimental altar for the ephemeral. It is a specialized interface designed to bridge the gap between written poetry, high-contrast visual manifestation, and deep-resonance soundscapes. Using the Gemini 2.5 series of models, the application parses the emotional weight of your words and returns visions and echoes that are intentionally raw, abstract, and monochromatic.

![Aesthetic Preview](https://img.shields.io/badge/Aesthetic-Obsidian%20Monochrome-121212?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Powered%20By-Gemini%202.5-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-black?style=for-the-badge&logo=react)

---

## 🌑 Core Manifestations

- **Visions from the Ink**: Generates up to 3 high-contrast, smudge-textured charcoal drawings per poem using `gemini-2.5-flash-image`.
- **Voices from the Void**: Recites your verse using `gemini-2.5-flash-preview-tts` with specialized vocal personas ranging from the world-weary *Charon* to the ethereal *Kore*.
- **The Manifest**: A JSON-based configuration system allowing users to export and import their studio settings, including aesthetic directions and resonance prompts.
- **Obsidian UX**: A minimalist, typography-first interface built for deep focus and poetic reflection.

## 🛠 Technical Architecture

### Model Suite
- **Visuals**: `gemini-2.5-flash-image` — Configured with abstract, gritty prompts to ensure output remains in the realm of raw charcoal sketches rather than photorealism.
- **Audio**: `gemini-2.5-flash-preview-tts` — Utilizing raw PCM stream processing to deliver low-latency, high-fidelity emotional recitations.

### Audio Pipeline
The application features a custom Web Audio API implementation to handle the raw PCM data returned by the Gemini API:
- Base64 to Uint8Array decoding.
- Int16 raw PCM to AudioBuffer conversion.
- Dynamic WAV blob generation for client-side audio "extraction" (downloading).

## 🚀 Setup & Installation

### Prerequisites
- Node.js / NPM
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/charcoal-and-verse.git
   cd charcoal-and-verse
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory (or ensure your environment provider has the key):
   ```env
   API_KEY=your_gemini_api_key_here
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Launch the Studio:**
   ```bash
   npm run dev
   ```

## 📜 Philosophy

The threshold between word and image is often too sharp. **Charcoal & Verse** seeks to blur it. By stripping away color and fine precision, we force the AI to focus on the *shadows* of the text—the parts that aren't explicitly said but are emotionally felt.

## 🎛 The Studio Controls

- **Vision Count**: Adjust the number of simultaneous manifestations (1-3).
- **Aesthetic Direction**: Override the default charcoal logic with your own abstract instructions.
- **Vocal Personas**:
  - `Charon`: Deep, grave, world-weary.
  - `Fenrir`: Intense, powerful, and dramatic.
  - `Kore`: Soft, feminine, and ethereal.
  - `Puck`: Mischievous and sharp.
  - `Zephyr`: Calm and observational.

---

Built with 🖤 by the Nocturne Systems team using Google Gemini.
