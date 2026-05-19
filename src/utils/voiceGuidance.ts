class VoiceGuidanceService {
  private synth: SpeechSynthesis | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (mute) {
      this.stop();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Speaks a single text instruction.
   */
  public speak(text: string, onEnd?: () => void) {
    if (!this.synth || this.isMuted) return;

    this.stop();

    // Clean up text for speech (e.g. remove symbols or replace abbreviations)
    let cleanText = text
      .replace(/₹/g, 'Rupees ')
      .replace(/m\b/g, ' meters')
      .replace(/km\b/g, ' kilometers')
      .replace(/~/g, 'approximately ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0; // natural rate
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick an English voice, preferably local or natural
    const voices = this.synth.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synth.speak(utterance);
  }

  /**
   * Speaks a list of instructions sequentially.
   */
  public speakAll(instructions: string[]) {
    if (!this.synth || instructions.length === 0 || this.isMuted) return;
    
    this.stop();
    
    let currentIndex = 0;
    
    const speakNext = () => {
      if (currentIndex < instructions.length) {
        this.speak(instructions[currentIndex], () => {
          currentIndex++;
          // Give a small pause between steps
          setTimeout(speakNext, 800);
        });
      }
    };
    
    speakNext();
  }

  /**
   * Stops active speech.
   */
  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const voiceGuidance = new VoiceGuidanceService();
export default voiceGuidance;
