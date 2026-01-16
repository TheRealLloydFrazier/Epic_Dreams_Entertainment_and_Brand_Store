'use client';

import Script from 'next/script';

export function ConvAIWidget() {
  return (
    <>
      {/* @ts-expect-error - Custom element from ElevenLabs ConvAI */}
      <elevenlabs-convai agent-id="agent_1101ka9stj9afmb9pz2gk8avqsg6"></elevenlabs-convai>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
