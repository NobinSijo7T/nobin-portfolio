'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Check, Pause, Play, Settings } from 'lucide-react';
import { cn } from '@/utils/utils';
import { generateAlbumArtPlaceholder } from '@/utils/albumArt';
import styles from './AudioPlayerNew.module.scss';

// Music files from public/Music folder
// Add artwork images to public/Music folder with same name as .mp3 but .jpg/.png extension
const musicFiles = [
  { id: '0', name: 'Prism', src: '/Music/Prism.mp3', artwork: '/Music/Prism.webp' },
  { id: '1', name: 'Screamvillain', src: '/Music/Screamvillain.mp3', artwork: '/Music/Screamvillian.webp' },
];

// You can add more tracks here:
// { id: '2', name: 'II - 02', src: '/Music/YourTrack.mp3', artwork: '/Music/YourTrack.jpg' },

const ReadyState = {
  HAVE_NOTHING: 0,
  HAVE_METADATA: 1,
  HAVE_CURRENT_DATA: 2,
  HAVE_FUTURE_DATA: 3,
  HAVE_ENOUGH_DATA: 4,
};

const NetworkState = {
  NETWORK_EMPTY: 0,
  NETWORK_IDLE: 1,
  NETWORK_LOADING: 2,
  NETWORK_NO_SOURCE: 3,
};

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = mins < 10 ? `0${mins}` : mins;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;

  return hrs > 0 ? `${hrs}:${formattedMins}:${formattedSecs}` : `${mins}:${formattedSecs}`;
}

function useAnimationFrame(callback) {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== null) {
        const delta = time - previousTimeRef.current;
        callbackRef.current(delta);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null;
    };
  }, []);
}

const AudioPlayerContext = createContext(null);
const AudioPlayerTimeContext = createContext(null);

export function useAudioPlayer() {
  const api = useContext(AudioPlayerContext);
  if (!api) {
    throw new Error('useAudioPlayer cannot be called outside of AudioPlayerProvider');
  }
  return api;
}

export function useAudioPlayerTime() {
  const time = useContext(AudioPlayerTimeContext);
  if (time === null) {
    throw new Error('useAudioPlayerTime cannot be called outside of AudioPlayerProvider');
  }
  return time;
}

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const itemRef = useRef(null);
  const playPromiseRef = useRef(null);
  const hasAutoPlayedRef = useRef(false);
  const [readyState, setReadyState] = useState(0);
  const [networkState, setNetworkState] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(undefined);
  const [error, setError] = useState(null);
  const [activeItem, _setActiveItem] = useState(null);
  const [paused, setPaused] = useState(true);
  const [playbackRate, setPlaybackRateState] = useState(1);

  const play = useCallback(async (item) => {
    if (!audioRef.current) return;

    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch (error) {
        console.error('Play promise error:', error);
      }
    }

    // If no item provided and there's an active item, just play/resume
    if (item === undefined || item === null) {
      if (activeItem && audioRef.current.src) {
        const playPromise = audioRef.current.play();
        playPromiseRef.current = playPromise;
        return playPromise;
      }
      return;
    }

    // If clicking the same item that's already active, just play/resume
    if (item?.id === activeItem?.id) {
      const playPromise = audioRef.current.play();
      playPromiseRef.current = playPromise;
      return playPromise;
    }

    // Load new track
    itemRef.current = item;
    const currentRate = audioRef.current.playbackRate || 1;
    if (!audioRef.current.paused) {
      audioRef.current.pause();
    }
    audioRef.current.currentTime = 0;
    audioRef.current.src = item.src;
    audioRef.current.load();
    audioRef.current.playbackRate = currentRate;
    
    // Wait for metadata to load before playing
    const handleCanPlay = () => {
      audioRef.current.removeEventListener('canplay', handleCanPlay);
      audioRef.current.play().catch((err) => {
        console.error('Error playing audio:', err);
      });
    };
    
    audioRef.current.addEventListener('canplay', handleCanPlay);
    
    // Fallback: try playing after a short delay
    setTimeout(() => {
      if (audioRef.current.readyState >= ReadyState.HAVE_CURRENT_DATA) {
        const playPromise = audioRef.current.play();
        playPromiseRef.current = playPromise;
        playPromise.catch((err) => {
          console.error('Error playing audio:', err);
        });
      }
    }, 100);
  }, [activeItem]);

  const pause = useCallback(async () => {
    if (!audioRef.current) return;
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch (e) {
        console.error(e);
      }
    }
    audioRef.current.pause();
    playPromiseRef.current = null;
  }, []);

  const seek = useCallback((time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }, []);

  const setPlaybackRate = useCallback((rate) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRateState(rate);
  }, []);

  const isItemActive = useCallback((id) => {
    return activeItem?.id === id;
  }, [activeItem]);

  useAnimationFrame(() => {
    if (audioRef.current) {
      _setActiveItem(itemRef.current);
      setReadyState(audioRef.current.readyState);
      setNetworkState(audioRef.current.networkState);
      setTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
      setPaused(audioRef.current.paused);
      setError(audioRef.current.error);
      setPlaybackRateState(audioRef.current.playbackRate);
    }
  });

  const isPlaying = !paused;
  const isBuffering =
    readyState < ReadyState.HAVE_FUTURE_DATA &&
    networkState === NetworkState.NETWORK_LOADING;

  const api = useMemo(
    () => ({
      ref: audioRef,
      duration,
      error,
      isPlaying,
      isBuffering,
      activeItem,
      playbackRate,
      isItemActive,
      play,
      pause,
      seek,
      setPlaybackRate,
    }),
    [
      audioRef,
      duration,
      error,
      isPlaying,
      isBuffering,
      activeItem,
      playbackRate,
      isItemActive,
      play,
      pause,
      seek,
      setPlaybackRate,
    ]
  );

  // Auto-play Prism song on mount
  useEffect(() => {
    if (!hasAutoPlayedRef.current && audioRef.current) {
      hasAutoPlayedRef.current = true;
      // Find Prism track
      const prismTrack = musicFiles.find(track => track.name === 'Prism');
      if (prismTrack) {
        // Small delay to ensure everything is mounted
        setTimeout(() => {
          play(prismTrack).catch(err => {
            console.log('Auto-play prevented by browser:', err);
          });
        }, 500);
      }
    }
  }, [play]);

  return (
    <AudioPlayerContext.Provider value={api}>
      <AudioPlayerTimeContext.Provider value={time}>
        <audio ref={audioRef} className={styles.hiddenAudio} crossOrigin="anonymous" />
        {children}
      </AudioPlayerTimeContext.Provider>
    </AudioPlayerContext.Provider>
  );
}

function Spinner() {
  return (
    <div className={styles.spinner} role="status" aria-label="Loading">
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}

export function AudioPlayerProgress({ className, ...props }) {
  const player = useAudioPlayer();
  const time = useAudioPlayerTime();
  const wasPlayingRef = useRef(false);
  
  const maxDuration = player.duration && Number.isFinite(player.duration) && !Number.isNaN(player.duration) 
    ? player.duration 
    : 0;

  return (
    <SliderPrimitive.Root
      {...props}
      value={[time]}
      onValueChange={(vals) => {
        player.seek(vals[0]);
        props.onValueChange?.(vals);
      }}
      min={0}
      max={maxDuration || 100}
      step={props.step || 0.25}
      onPointerDown={(e) => {
        wasPlayingRef.current = player.isPlaying;
        player.pause();
        props.onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        if (wasPlayingRef.current && player.activeItem) {
          player.play();
        }
        props.onPointerUp?.(e);
      }}
      className={cn(styles.progressSlider, className)}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          if (!player.isPlaying && player.activeItem) {
            player.play();
          } else {
            player.pause();
          }
        }
        props.onKeyDown?.(e);
      }}
      disabled={maxDuration === 0}
    >
      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={styles.thumb}>
        <div className={styles.thumbCircle} />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
}

export function AudioPlayerTime({ className, ...props }) {
  const time = useAudioPlayerTime();
  return (
    <span {...props} className={cn(styles.timeText, className)}>
      {formatTime(time)}
    </span>
  );
}

export function AudioPlayerDuration({ className, ...props }) {
  const player = useAudioPlayer();
  return (
    <span {...props} className={cn(styles.timeText, className)}>
      {player.duration !== null &&
      player.duration !== undefined &&
      !Number.isNaN(player.duration)
        ? formatTime(player.duration)
        : '--:--'}
    </span>
  );
}

function PlayButton({ playing, onPlayingChange, className, onClick, loading, ...props }) {
  return (
    <button
      {...props}
      onClick={(e) => {
        onPlayingChange(!playing);
        onClick?.(e);
      }}
      className={cn(styles.playButton, className)}
      aria-label={playing ? 'Pause' : 'Play'}
      type="button"
    >
      {playing ? (
        <Pause className={cn(styles.icon, loading && styles.iconHidden)} aria-hidden="true" />
      ) : (
        <Play className={cn(styles.icon, loading && styles.iconHidden)} aria-hidden="true" />
      )}
      {loading && (
        <div className={styles.loadingOverlay}>
          <Spinner />
        </div>
      )}
    </button>
  );
}

export function AudioPlayerButton({ item, ...props }) {
  const player = useAudioPlayer();

  if (!item) {
    return (
      <PlayButton
        {...props}
        playing={player.isPlaying && !!player.activeItem}
        onPlayingChange={(shouldPlay) => {
          if (shouldPlay && player.activeItem) {
            player.play();
          } else {
            player.pause();
          }
        }}
        loading={player.isBuffering && player.isPlaying}
      />
    );
  }

  return (
    <PlayButton
      {...props}
      playing={player.isItemActive(item.id) && player.isPlaying}
      onPlayingChange={(shouldPlay) => {
        if (shouldPlay) {
          player.play(item);
        } else {
          player.pause();
        }
      }}
      loading={player.isItemActive(item.id) && player.isBuffering && player.isPlaying}
    />
  );
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export function AudioPlayerSpeed({ speeds = PLAYBACK_SPEEDS, className, ...props }) {
  const player = useAudioPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const currentSpeed = player.playbackRate;

  return (
    <div className={styles.speedDropdown}>
      <button
        {...props}
        className={cn(styles.speedButton, className)}
        aria-label="Playback speed"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className={styles.icon} />
      </button>
      {isOpen && (
        <>
          <div className={styles.speedDropdownBackdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.speedDropdownContent}>
            {speeds.map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  player.setPlaybackRate(speed);
                  setIsOpen(false);
                }}
                className={cn(styles.speedMenuItem, currentSpeed === speed && styles.speedMenuItemActive)}
              >
                <span className={speed === 1 ? '' : styles.monoFont}>
                  {speed === 1 ? 'Normal' : `${speed}x`}
                </span>
                {currentSpeed === speed && <Check className={styles.checkIcon} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AudioPlayerNew({ isOpen, onClose }) {
  const [selectedTrack, setSelectedTrack] = useState(null);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.playerContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close audio player">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles.playerContent}>
          {/* Left Panel - Tracklist */}
          <div className={styles.tracklistPanel}>
            <div className={styles.tracklistHeader}>
              <h3 className={styles.tracklistTitle}>Playlist</h3>
            </div>
            <ul className={styles.tracklist}>
              {musicFiles.map((track, index) => (
                <TrackListItem key={track.id} track={track} index={index} />
              ))}
            </ul>
          </div>

          {/* Right Panel - Controls */}
          <div className={styles.controlsPanel}>
            <TrackInfo />
            <PlayerControls />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackListItem({ track, index }) {
  const player = useAudioPlayer();
  const isActive = player.isItemActive(track.id);

  const handleClick = () => {
    if (isActive && player.isPlaying) {
      player.pause();
    } else {
      // Always play the clicked track
      player.play(track);
    }
  };

  return (
    <li
      className={cn(styles.trackItem, isActive && styles.trackItemActive)}
      onClick={handleClick}
    >
      <span className={styles.trackNumber}>{index + 1}</span>
      <span className={styles.trackName}>{track.name}</span>
      {isActive && player.isPlaying && <div className={styles.playingIndicator} />}
    </li>
  );
}

function TrackInfo() {
  const player = useAudioPlayer();
  const activeTrack = player.activeItem;
  const [artworkUrl, setArtworkUrl] = useState(null);
  const [showArtwork, setShowArtwork] = useState(true);

  useEffect(() => {
    if (activeTrack?.artwork) {
      setArtworkUrl(activeTrack.artwork);
      setShowArtwork(true);
    } else {
      setArtworkUrl(null);
      setShowArtwork(false);
    }
  }, [activeTrack]);

  return (
    <div className={styles.trackInfo}>
      {activeTrack ? (
        <>
          <div className={styles.artworkContainer}>
            {artworkUrl && showArtwork ? (
              <img
                src={artworkUrl}
                alt={activeTrack.name}
                className={styles.artwork}
                onError={() => setShowArtwork(false)}
              />
            ) : (
              <div className={styles.artworkPlaceholder}>
                <MusicIcon />
              </div>
            )}
          </div>
          <h2 className={styles.trackTitle}>{activeTrack.name}</h2>
        </>
      ) : (
        <>
          <div className={styles.artworkContainer}>
            <div className={styles.artworkPlaceholder}>
              <MusicIcon />
            </div>
          </div>
          <h2 className={styles.trackTitle}>No track selected</h2>
        </>
      )}
    </div>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.musicIcon}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

function PlayerControls() {
  const player = useAudioPlayer();
  const activeItem = player.activeItem;

  return (
    <div className={styles.controls}>
      <div className={styles.controlsRow}>
        <AudioPlayerButton item={activeItem || null} />
        <AudioPlayerTime className={styles.timeDisplay} />
        <div className={styles.progressWrapper}>
          <AudioPlayerProgress />
        </div>
        <AudioPlayerDuration className={styles.timeDisplay} />
        <AudioPlayerSpeed />
      </div>
    </div>
  );
}

