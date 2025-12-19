
import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Modality } from "@google/genai";

// --- Styling ---
const styles = {
  container: {
    fontFamily: '"Courier New", Courier, monospace',
    backgroundColor: '#0a0a0c',
    color: '#b0b0b8',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '60px 20px',
    position: 'relative' as const,
    backgroundImage: 'radial-gradient(circle at 50% 30%, #15151a 0%, #0a0a0c 100%)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '60px',
    borderBottom: '1px solid #1a1a20',
    paddingBottom: '40px',
    width: '100%',
    maxWidth: '900px',
    position: 'relative' as const,
  },
  topControls: {
    position: 'absolute' as const,
    top: -30,
    right: 0,
    display: 'flex',
    gap: '20px',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#4a4a55',
    cursor: 'pointer',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    textDecoration: 'none',
    padding: '5px',
    transition: 'color 0.3s',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'normal',
    letterSpacing: '6px',
    margin: 0,
    textTransform: 'uppercase' as const,
    color: '#f8f8ff',
    textShadow: '0 0 30px rgba(255,255,255,0.05)',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#5a5a65',
    marginTop: '20px',
    fontStyle: 'italic',
    letterSpacing: '3px',
    textTransform: 'lowercase' as const,
  },
  inputSection: {
    width: '100%',
    maxWidth: '850px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px',
    marginBottom: '80px',
  },
  textarea: {
    width: '100%',
    height: '240px',
    backgroundColor: '#0d0d0f',
    border: '1px solid #1a1a20',
    color: '#e0e0e8',
    padding: '30px',
    fontSize: '1.2rem',
    fontFamily: '"Courier New", Courier, monospace',
    lineHeight: '1.8',
    resize: 'vertical' as const,
    outline: 'none',
    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
    transition: 'border-color 0.4s',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between', 
    gap: '20px',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#141418',
    color: '#7a7a85',
    border: '1px solid #25252d',
    padding: '16px 32px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  buttonPrimary: {
    backgroundColor: '#f0f0f5',
    color: '#0a0a0c',
    fontWeight: 'bold',
    border: '1px solid #ffffff',
  },
  loader: {
    color: '#3a3a45',
    fontStyle: 'italic',
    fontSize: '0.8rem',
    letterSpacing: '2px',
  },
  outputSection: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '60px',
    alignItems: 'center',
  },
  audioPlayer: {
    width: '100%',
    maxWidth: '750px',
    backgroundColor: '#121216',
    border: '1px solid #1a1a20',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '0',
    gap: '30px',
    flexWrap: 'wrap' as const,
    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
  },
  audioInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    minWidth: '240px',
  },
  audioLabel: {
    fontSize: '0.8rem',
    color: '#4a4a55',
    marginTop: '6px',
    letterSpacing: '1px',
  },
  audioControls: {
    display: 'flex',
    gap: '15px',
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '50px',
    width: '100%',
  },
  card: {
    backgroundColor: '#0d0d0f',
    border: '1px solid #1a1a20',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '25px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: '1/1',
    backgroundColor: '#050507',
    overflow: 'hidden',
    position: 'relative' as const,
    border: '1px solid #121216',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    filter: 'grayscale(100%) contrast(1.15) brightness(0.85)',
    display: 'block',
  },
  downloadBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#121216',
    color: '#6a6a75',
    border: '1px solid #1a1a20',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '0.7rem',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    letterSpacing: '2px',
    transition: 'all 0.3s',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.98)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backdropFilter: 'blur(15px)',
  },
  modalContent: {
    backgroundColor: '#0a0a0c',
    border: '1px solid #1a1a20',
    padding: '50px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
    boxShadow: '0 0 80px rgba(0,0,0,1)',
    position: 'relative' as const,
  },
  modalClose: {
    position: 'absolute' as const,
    top: '25px',
    right: '25px',
    background: 'transparent',
    border: 'none',
    color: '#3a3a45',
    fontSize: '2rem',
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: '2rem',
    marginBottom: '40px',
    borderBottom: '1px solid #121216',
    paddingBottom: '20px',
    color: '#ffffff',
    letterSpacing: '4px',
    textTransform: 'uppercase' as const,
  },
  modalSection: {
    marginBottom: '40px',
  },
  modalLabel: {
    display: 'block',
    marginBottom: '15px',
    color: '#5a5a65',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
  },
  modalTextarea: {
    width: '100%',
    minHeight: '140px',
    backgroundColor: '#050507',
    border: '1px solid #1a1a20',
    color: '#b0b0b8',
    padding: '20px',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    marginBottom: '15px',
    outline: 'none',
    lineHeight: '1.6',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '18px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    cursor: 'pointer',
    color: '#6a6a75',
    fontSize: '1rem',
    padding: '12px 18px',
    backgroundColor: '#0d0d0f',
    borderRadius: '0',
    border: '1px solid transparent',
    transition: 'all 0.3s',
  },
  radioLabelActive: {
    borderColor: '#2a2a35',
    color: '#d0d0d8',
    backgroundColor: '#121216',
  },
  radioInput: {
    accentColor: '#f0f0f5',
  },
};

// --- Data ---
const VOICE_OPTIONS = [
  { name: 'Charon', desc: 'The ferryman\'s tone. Deep, grave, world-weary.' },
  { name: 'Fenrir', desc: 'The wolf\'s resonance. Powerful, intense, and dramatic.' },
  { name: 'Kore', desc: 'The spring\'s whisper. Soft, feminine, and ethereal.' },
  { name: 'Puck', desc: 'The trickster\'s wit. Playful, mischievous, and sharp.' },
  { name: 'Zephyr', desc: 'The west wind. Calm, balanced, and observational.' },
];

const DEFAULT_VISUAL_PROMPT = `Generate a dark, raw charcoal interpretation of this poetry. Style: Gritty, smudge-textured, deeply atmospheric. Focus on high contrast, deep blacks, and ethereal gray highlights. Abstract and emotional.`;
const DEFAULT_VOICE_PROMPT = `A recitation saturated with stillness and gravity. Let the words echo. Long pauses between stanzas. Emotion: Profound reflection.`;

// --- Helpers ---
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array, 
  ctx: AudioContext, 
  sampleRate: number = 24000, 
  numChannels: number = 1
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createWavBlob(data: Uint8Array, sampleRate: number = 24000): Blob {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = new ArrayBuffer(44 + data.length);
  const view = new DataView(buffer);
  const writeString = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + data.length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, data.length, true);
  for (let i = 0; i < dataInt16.length; i++) {
    view.setInt16(44 + i * 2, dataInt16[i], true);
  }
  return new Blob([view], { type: 'audio/wav' });
}

// --- Components ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>&times;</button>
        <h2 style={styles.modalTitle}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

function CharcoalVerseApp() {
  const [poem, setPoem] = useState('');
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioDownloadUrl, setAudioDownloadUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [imageCount, setImageCount] = useState(3);
  const [visualPrompt, setVisualPrompt] = useState(DEFAULT_VISUAL_PROMPT);
  const [selectedVoice, setSelectedVoice] = useState('Charon');
  const [voicePrompt, setVoicePrompt] = useState(DEFAULT_VOICE_PROMPT);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
    return audioContextRef.current;
  };

  const handleGenerateImages = async () => {
    if (!poem.trim()) return;
    setLoadingImages(true);
    setImages([]);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const promises = Array.from({ length: imageCount }, (_, i) => 
        ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: `${visualPrompt}\n\nVision ${i+1}\nPoetry Segment: "${poem.slice(0, 450)}"` }] }
        }).then(res => {
          const part = res.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
          return part ? `data:${part.inlineData.mimeType};base64,${part.inlineData.data}` : '';
        })
      );
      const results = await Promise.all(promises);
      setImages(results.filter(Boolean));
    } catch (err) {
      console.error(err);
      alert("The ink has run dry. Try again.");
    } finally {
      setLoadingImages(false);
    }
  };

  const handleGenerateAudio = async () => {
    if (!poem.trim()) return;
    setLoadingAudio(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `(Echo Direction: ${voicePrompt})\n\nContent:\n${poem}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } } }
        }
      });
      const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (data) {
        const bytes = decodeBase64(data);
        const buffer = await decodeAudioData(bytes, getAudioContext());
        const wav = createWavBlob(bytes);
        setAudioBuffer(buffer);
        setAudioDownloadUrl(URL.createObjectURL(wav));
      }
    } catch (err) {
      console.error(err);
      alert("The voice could not be summoned.");
    } finally {
      setLoadingAudio(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioSourceRef.current?.stop();
      setIsPlaying(false);
    } else if (audioBuffer) {
      const ctx = getAudioContext();
      const src = ctx.createBufferSource();
      src.buffer = audioBuffer;
      src.connect(ctx.destination);
      src.onended = () => setIsPlaying(false);
      src.start();
      audioSourceRef.current = src;
      setIsPlaying(true);
    }
  };

  const handleExportSettings = () => {
    const data = JSON.stringify({ imageCount, visualPrompt, selectedVoice, voicePrompt }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'charcoal-verse-manifest.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const s = JSON.parse(ev.target?.result as string);
        if (s.imageCount) setImageCount(Math.min(3, Math.max(1, s.imageCount)));
        if (s.visualPrompt) setVisualPrompt(s.visualPrompt);
        if (s.selectedVoice) setSelectedVoice(s.selectedVoice);
        if (s.voicePrompt) setVoicePrompt(s.voicePrompt);
        alert("Manifest loaded.");
      } catch {
        alert("Manifest corrupted.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.topControls}>
          <button style={styles.navButton} onClick={() => setShowAbout(true)}>Philosophy</button>
          <button style={styles.navButton} onClick={() => setShowSettings(true)}>The Studio</button>
        </div>
        <h1 style={styles.title}>Charcoal & Verse</h1>
        <p style={styles.subtitle}>sketches from the ink. voices from the void.</p>
      </header>

      <div style={styles.inputSection}>
        <textarea
          style={styles.textarea}
          placeholder="Entrust your verse to the shadows..."
          value={poem}
          onChange={(e) => setPoem(e.target.value)}
          spellCheck={false}
        />
        <div style={styles.controls}>
          <div style={{display:'flex', gap: '20px'}}>
            <button 
              style={{...styles.button, ...(poem.trim() && !audioBuffer && !loadingAudio ? styles.buttonPrimary : {})}}
              onClick={handleGenerateAudio}
              disabled={loadingAudio || !poem.trim()}
            >
              {loadingAudio ? 'Awakening Echo...' : audioBuffer ? 'Recast Voice' : 'Speak Verse'}
            </button>
          </div>
          <div style={{display:'flex', gap: '25px', alignItems:'center'}}>
            {loadingImages && <span style={styles.loader}>The charcoal is smudging...</span>}
            <button 
              style={{...styles.button, ...(poem.trim() ? styles.buttonPrimary : {})}}
              onClick={handleGenerateImages}
              disabled={loadingImages || !poem.trim()}
            >
              Draw Visions
            </button>
          </div>
        </div>
      </div>

      <div style={styles.outputSection}>
        {audioBuffer && (
          <div style={styles.audioPlayer}>
            <div style={styles.audioInfo}>
              <span style={{color:'#f8f8ff', fontWeight:'bold', letterSpacing: '4px', fontSize: '0.8rem'}}>THE RECITATION</span>
              <span style={styles.audioLabel}>{selectedVoice} Persona</span>
            </div>
            <div style={styles.audioControls}>
              <button style={{...styles.button, ...styles.buttonPrimary}} onClick={togglePlayback}>
                {isPlaying ? 'SILENCE' : 'LISTEN'}
              </button>
              {audioDownloadUrl && <a href={audioDownloadUrl} download="echo_extract.wav" style={{...styles.button, textDecoration:'none'}}>SAVE</a>}
            </div>
          </div>
        )}

        {images.length > 0 && (
          <div style={styles.gallery}>
            {images.map((url, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.imageContainer}><img src={url} style={styles.image} /></div>
                <a href={url} download={`charcoal-vision-${i+1}.png`} style={styles.downloadBtn}>Extract Sketch</a>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title="Philosophy">
        <p style={{lineHeight: '2', color: '#6a6a75', marginBottom: '25px'}}>
          Charcoal & Verse is an altar for the ephemeral. It translates the internal landscape of poetry into high-contrast charcoal manifestations and deep-resonance soundscapes.
        </p>
        <p style={{lineHeight: '2', color: '#6a6a75'}}>
          It utilizes the Gemini 2.5 series to parse the emotional weight of your words, returning visions that are intentionally raw, abstract, and monochromatic.
        </p>
        <p style={{fontSize:'0.7rem', color:'#2a2a35', marginTop:'50px', textAlign: 'right', letterSpacing: '1px'}}>
          INK & SHADOW / GEMINI 2.5
        </p>
      </Modal>

      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="The Studio">
        <div style={styles.modalSection}>
          <label style={styles.modalLabel}>Vision Count</label>
          <div style={{display:'flex', gap: '20px'}}>
            {[1, 2, 3].map(n => (
              <label key={n} style={{...styles.radioLabel, ...(imageCount === n ? styles.radioLabelActive : {})}}>
                <input type="radio" checked={imageCount === n} onChange={() => setImageCount(n)} style={styles.radioInput} /> {n} Sketches
              </label>
            ))}
          </div>
        </div>

        <div style={styles.modalSection}>
          <label style={styles.modalLabel}>Aesthetic Direction</label>
          <textarea style={styles.modalTextarea} value={visualPrompt} onChange={e => setVisualPrompt(e.target.value)} />
          <button style={styles.navButton} onClick={() => setVisualPrompt(DEFAULT_VISUAL_PROMPT)}>Reset Aesthetic</button>
        </div>

        <div style={styles.modalSection}>
          <label style={styles.modalLabel}>Vocal Persona</label>
          <div style={styles.radioGroup}>
            {VOICE_OPTIONS.map(v => (
              <label key={v.name} style={{...styles.radioLabel, ...(selectedVoice === v.name ? styles.radioLabelActive : {})}}>
                <input type="radio" checked={selectedVoice === v.name} onChange={() => setSelectedVoice(v.name)} style={styles.radioInput} />
                <div style={{display:'flex', flexDirection:'column'}}>
                  <strong style={{color: '#ffffff', fontSize: '1.1rem', letterSpacing: '1px'}}>{v.name}</strong>
                  <span style={{fontSize: '0.85rem', color: '#4a4a55', marginTop: '4px'}}>{v.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.modalSection}>
          <label style={styles.modalLabel}>Resonance</label>
          <textarea style={styles.modalTextarea} value={voicePrompt} onChange={e => setVoicePrompt(e.target.value)} />
          <button style={styles.navButton} onClick={() => setVoicePrompt(DEFAULT_VOICE_PROMPT)}>Reset Resonance</button>
        </div>

        <div style={{...styles.modalSection, borderTop:'1px solid #121216', paddingTop:'40px', marginTop: '50px'}}>
          <label style={styles.modalLabel}>Data Manifest</label>
          <div style={{display:'flex', gap:'20px'}}>
            <button style={styles.button} onClick={handleExportSettings}>Export JSON</button>
            <button style={styles.button} onClick={() => fileInputRef.current?.click()}>Import JSON</button>
            <input type="file" ref={fileInputRef} style={{display:'none'}} accept=".json" onChange={handleImportSettings} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<CharcoalVerseApp />);
}
