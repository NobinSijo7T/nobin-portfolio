'use client';

import { AudioPlayerProvider } from './AudioPlayerNew';

export default function AudioPlayerWrapper({ children }) {
  return <AudioPlayerProvider>{children}</AudioPlayerProvider>;
}
