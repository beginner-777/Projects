"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type EventKey = "mehndi" | "barat" | "walima";

type WeddingEvent = {
  name: string;
  phrase: string;
  date: string;
  venue: string;
  address?: string;
  mapUrl?: string;
  schedule: { label: string; time: string }[];
  invitation: string;
  symbol: string;
};

const events: Record<EventKey, WeddingEvent> = {
  mehndi: {
    name: "Mehndi",
    phrase: "An evening of colour, music & joy",
    date: "Friday, 16 October 2026",
    venue: "Hotel New Royal Palace",
    address: "53 Khayaban-e-Firdousi, Block A, Phase 1, Johar Town, Lahore",
    mapUrl: "https://maps.app.goo.gl/DfC3uinWUwLgDcTPA?g_st=ac",
    schedule: [{ label: "Celebration", time: "8:00 PM" }],
    invitation:
      "Join us for a joyful evening filled with music, laughter and the colours of mehndi.",
    symbol: "✦",
  },
  barat: {
    name: "Barat",
    phrase: "With the blessings of our families",
    date: "Saturday, 17 October 2026",
    venue: "Lasani Palace",
    address: "Harbanspura Road, near Bin Daud Store, Taj Bagh Scheme, Lahore",
    mapUrl: "https://maps.app.goo.gl/Nmk26u3gzygRNt1D7?g_st=ac",
    schedule: [
      { label: "Reception", time: "7:00 PM" },
      { label: "Dinner", time: "8:00 PM" },
      { label: "Rukhsati", time: "9:30 PM" },
    ],
    invitation:
      "We warmly invite you to witness the beginning of our forever and bless us with your presence.",
    symbol: "❈",
  },
  walima: {
    name: "Walima",
    phrase: "A graceful evening of togetherness",
    date: "Date to be announced",
    venue: "Venue to be announced",
    schedule: [{ label: "Reception", time: "7:00 PM" }],
    invitation:
      "Please join us as we celebrate a beautiful new chapter with warmth, gratitude and togetherness.",
    symbol: "✧",
  },
};

type SoftMusicEngine = {
  context: AudioContext;
  timer: number;
};

function playSoftTone(
  context: AudioContext,
  output: AudioNode,
  frequency: number,
  startAt: number,
  duration: number,
  volume: number,
) {
  const primary = context.createOscillator();
  const shimmer = context.createOscillator();
  const shimmerGain = context.createGain();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  primary.type = "sine";
  primary.frequency.setValueAtTime(frequency, startAt);
  shimmer.type = "triangle";
  shimmer.frequency.setValueAtTime(frequency * 2, startAt);
  shimmerGain.gain.value = 0.12;
  filter.type = "lowpass";
  filter.frequency.value = 1350;
  filter.Q.value = 0.7;

  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.14);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  primary.connect(filter);
  shimmer.connect(shimmerGain).connect(filter);
  filter.connect(gain).connect(output);
  primary.start(startAt);
  shimmer.start(startAt);
  primary.stop(startAt + duration + 0.04);
  shimmer.stop(startAt + duration + 0.04);
}

function scheduleEventMelody(
  key: EventKey,
  context: AudioContext,
  output: AudioNode,
) {
  const start = context.currentTime + 0.08;
  const pattern = key === "mehndi"
    ? {
        step: 0.48,
        duration: 0.82,
        loop: 3950,
        notes: [293.66, 369.99, 440, 493.88, 440, 369.99, 329.63, 293.66],
        pads: [146.83, 220],
        padDuration: 3.9,
        volume: 0.047,
      }
    : key === "barat"
      ? {
          step: 0.78,
          duration: 1.42,
          loop: 6400,
          notes: [293.66, 440, 369.99, 329.63, 293.66, 277.18, 293.66, 369.99],
          pads: [146.83, 220, 293.66],
          padDuration: 6.3,
          volume: 0.04,
        }
      : {
          step: 0.92,
          duration: 1.72,
          loop: 7550,
          notes: [261.63, 329.63, 392, 493.88, 440, 392, 329.63, 293.66],
          pads: [130.81, 196, 261.63],
          padDuration: 7.45,
          volume: 0.035,
        };

  pattern.pads.forEach((frequency, index) => {
    playSoftTone(
      context,
      output,
      frequency,
      start + index * 0.04,
      pattern.padDuration,
      0.017 - index * 0.003,
    );
  });
  pattern.notes.forEach((frequency, index) => {
    playSoftTone(
      context,
      output,
      frequency,
      start + index * pattern.step,
      pattern.duration,
      index === 0 || index === 4 ? pattern.volume * 1.18 : pattern.volume,
    );
  });
  return pattern.loop;
}

export default function Home() {
  const [selected, setSelected] = useState<EventKey | null>(null);
  const [entering, setEntering] = useState<EventKey | null>(null);
  const [musicOn, setMusicOn] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const musicRef = useRef<SoftMusicEngine | null>(null);
  const activeEvent = useMemo(
    () => (selected ? events[selected] : null),
    [selected],
  );

  const stopMusic = useCallback(() => {
    const engine = musicRef.current;
    if (engine) {
      window.clearInterval(engine.timer);
      void engine.context.close();
      musicRef.current = null;
    }
    setMusicOn(false);
  }, []);

  const startMusic = useCallback((key: EventKey) => {
    stopMusic();
    const AudioContextConstructor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextConstructor) return;

    const context = new AudioContextConstructor();
    const master = context.createGain();
    const compressor = context.createDynamicsCompressor();
    master.gain.value = 0.8;
    compressor.threshold.value = -22;
    compressor.knee.value = 20;
    compressor.ratio.value = 4;
    master.connect(compressor).connect(context.destination);
    void context.resume();

    const loopDuration = scheduleEventMelody(key, context, master);
    const timer = window.setInterval(
      () => scheduleEventMelody(key, context, master),
      loopDuration,
    );
    musicRef.current = { context, timer };
    setMusicOn(true);
  }, [stopMusic]);

  const closeInvitation = useCallback(() => {
    stopMusic();
    setSelected(null);
    setEntering(null);
  }, [stopMusic]);

  useEffect(() => {
    document.body.style.overflow = selected || showCreator ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (showCreator) {
        setShowCreator(false);
        return;
      }
      closeInvitation();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeInvitation, selected, showCreator]);

  useEffect(() => () => {
    const engine = musicRef.current;
    if (engine) {
      window.clearInterval(engine.timer);
      void engine.context.close();
    }
  }, []);

  const openDoor = (key: EventKey) => {
    startMusic(key);
    setSelected(key);
    setEntering(key);
    window.setTimeout(() => setEntering(null), 780);
  };

  return (
    <main className="wedding-site">
      <section className="portal" aria-label="Wedding ceremony celebrations">
        <div className="palace-image" aria-hidden="true" />
        <div className="palace-vignette" aria-hidden="true" />

        <header className="couple-heading">
          <p>Wedding Ceremony</p>
          <h1>
            <span className="bride-name">Hafiza Arooba Shakeel</span>
            <i aria-hidden="true">&amp;</i>
            <span className="groom-name">Junaid Saddique</span>
          </h1>
        </header>

        <div className="door-grid" aria-label="Choose a wedding function">
          {(Object.keys(events) as EventKey[]).map((key) => (
            <button
              key={key}
              className={`door-hit door-${key}`}
              onClick={() => openDoor(key)}
              aria-label={`Open ${events[key].name} invitation`}
            >
              <span className="mobile-door-image" aria-hidden="true" />
              <span className="door-plaque">
                <i>{events[key].symbol}</i>
                <strong>{events[key].name}</strong>
              </span>
              <span className="door-glow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      {entering && (
        <div
          className={`door-transition transition-${entering}`}
          aria-hidden="true"
        >
          <div className="transition-light" />
          <div className="transition-seal">
            <span>{events[entering].symbol}</span>
          </div>
        </div>
      )}

      {selected && activeEvent && (
        <section
          className={`event-page theme-${selected}`}
          aria-label={`${activeEvent.name} invitation details`}
        >
          <div className="event-image" aria-hidden="true" />
          <div className="event-overlay" aria-hidden="true" />
          <button className="back-button" onClick={closeInvitation}>
            <span>←</span> Back to the doors
          </button>
          <button
            className={musicOn ? "music-control is-playing" : "music-control"}
            onClick={() => musicOn ? stopMusic() : startMusic(selected)}
            aria-label={musicOn ? "Pause background music" : "Play background music"}
          >
            <span aria-hidden="true">{musicOn ? "♫" : "♪"}</span>
            {musicOn ? "Pause music" : "Play music"}
          </button>

          <article className="invitation-card">
            <p className="event-bismillah">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
            <div className="event-mark" aria-hidden="true">
              <span />
              {activeEvent.symbol}
              <span />
            </div>
            <p className="event-eyebrow">{activeEvent.phrase}</p>
            <h2>{activeEvent.name}</h2>

            <div className={`couple-mini couple-mini-${selected}`}>
              {selected === "mehndi" ? (
                <strong>Hafiza Arooba Shakeel</strong>
              ) : selected === "walima" ? (
                <>
                  <strong>Junaid Saddique</strong>
                  <i>with</i>
                  <strong>Hafiza Arooba Shakeel</strong>
                </>
              ) : (
                <>
                  <strong>Hafiza Arooba Shakeel</strong>
                  <i>with</i>
                  <strong>Junaid Saddique</strong>
                </>
              )}
            </div>

            <p className="event-invitation">{activeEvent.invitation}</p>

            <div className="date-ribbon">
              <small>Date</small>
              <strong>{activeEvent.date}</strong>
            </div>

            <div className="schedule-grid">
              {activeEvent.schedule.map((item) => (
                <div key={item.label}>
                  <small>{item.label}</small>
                  <strong>{item.time}</strong>
                </div>
              ))}
            </div>

            <div className="venue-block">
              <small>Venue</small>
              <strong>{activeEvent.venue}</strong>
              {activeEvent.address && <span>{activeEvent.address}</span>}
            </div>

            {activeEvent.mapUrl ? (
              <a
                className="map-button"
                href={activeEvent.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open location map <span>↗</span>
              </a>
            ) : (
              <span className="map-button map-pending">Location coming soon</span>
            )}
          </article>
        </section>
      )}

      <button
        className="creator-credit"
        onClick={() => setShowCreator(true)}
        aria-haspopup="dialog"
        aria-expanded={showCreator}
      >
        <span>Created by</span>
      </button>

      {showCreator && (
        <div
          className="creator-reveal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="creator-name"
          onClick={(event) => {
            if (event.currentTarget === event.target) setShowCreator(false);
          }}
        >
          <button
            className="creator-close"
            onClick={() => setShowCreator(false)}
            aria-label="Close creator credit"
            autoFocus
          >
            ×
          </button>
          <div className="creator-reveal-content">
            <p>Created by</p>
            <div className="creator-rule" aria-hidden="true">
              <span />
              ✦
              <span />
            </div>
            <h2 id="creator-name" aria-label="Musfirah Shakeel">
              {["Musfirah", "Shakeel"].map((word, wordIndex) => (
                <span className="signature-word" key={word} aria-hidden="true">
                  {Array.from(word).map((letter, letterIndex) => {
                    const sequence = letterIndex + (wordIndex === 0 ? 0 : 8);
                    return (
                      <span
                        className="signature-letter"
                        key={`${letter}-${letterIndex}`}
                        style={{ animationDelay: `${160 + sequence * 75}ms` }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h2>
          </div>
        </div>
      )}
    </main>
  );
}
