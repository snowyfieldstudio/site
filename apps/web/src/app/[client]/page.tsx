'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useAtomValue } from 'jotai';

import { clientsAtom } from '@/lib/atoms/clients';
import type { Sample } from '@/lib/sanity.types';
import { isSlugMatch } from '@/lib/slug';

import { Table } from '@/components/Table';
import { BrowserMockup } from '@/components/browser-mockup';
import { MobileBrowserMockup } from '@/components/mobile-browser-mockup';

import MuxPlayer from '@mux/mux-player-react';

type ClientPageProps = {
  params: Promise<{
    client: string;
  }>;
};

export default function ClientPage({ params }: ClientPageProps) {
  const resolvedParams = React.use(params);

  const [desktopVideoAspectRatio, setDesktopVideoAspectRatio] =
    React.useState('16 / 9');

  const [mobileVideoAspectRatio, setMobileVideoAspectRatio] =
    React.useState('9 / 16');

  type MuxPlayerRef = React.ElementRef<typeof MuxPlayer>;

  const desktopPlayerRef = React.useRef<MuxPlayerRef | null>(null);

  const mobilePlayerRef = React.useRef<MuxPlayerRef | null>(null);

  const clients = useAtomValue(clientsAtom);

  const requestedSlug = resolvedParams.client ?? '';

  const client = clients
    ? clients.find((c) => isSlugMatch(c.slug, requestedSlug))
    : null;

  const desktopSample =
    client?.samples?.find((sample) => sample.deviceType === 'laptop') ?? null;

  const mobileSample =
    client?.samples?.find((sample) => sample.deviceType === 'phone') ?? null;

  type ImageSample = Extract<Sample, { sampleType: 'image' }>;

  const getImageAspectRatio = (sample: ImageSample | null) => {
    const dimensions = sample?.image?.asset?.metadata?.dimensions;

    if (!dimensions?.width || !dimensions?.height) return null;

    return `${dimensions.width} / ${dimensions.height}`;
  };

  const updateVideoAspectRatio = (
    media: HTMLVideoElement | null,
    setAspectRatio: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (!media?.videoWidth || !media?.videoHeight) return;

    setAspectRatio(`${media.videoWidth} / ${media.videoHeight}`);
  };

  const attachVideoAspectRatioListener = React.useCallback(
    (
      player: MuxPlayerRef | null,
      setAspectRatio: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      if (!player) return undefined;

      let currentMedia: HTMLVideoElement | null = null;
      let frameId: number | null = null;

      const handleLoadedMetadata = () => {
        updateVideoAspectRatio(currentMedia, setAspectRatio);
      };

      const attachListeners = () => {
        const typedPlayer = player as MuxPlayerRef & {
          media?: HTMLVideoElement | null;
        };
        const media = typedPlayer.media ?? null;

        if (!media) {
          frameId = window.requestAnimationFrame(attachListeners);
          return;
        }

        currentMedia = media;

        updateVideoAspectRatio(currentMedia, setAspectRatio);

        currentMedia.addEventListener('loadedmetadata', handleLoadedMetadata);
        currentMedia.addEventListener('loadeddata', handleLoadedMetadata);
      };

      attachListeners();

      return () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }

        if (currentMedia) {
          currentMedia.removeEventListener(
            'loadedmetadata',
            handleLoadedMetadata,
          );
          currentMedia.removeEventListener('loadeddata', handleLoadedMetadata);
        }
      };
    },
    [],
  );

  const desktopImageAspectRatio =
    desktopSample?.sampleType === 'image'
      ? getImageAspectRatio(desktopSample)
      : null;

  const mobileImageAspectRatio =
    mobileSample?.sampleType === 'image'
      ? getImageAspectRatio(mobileSample)
      : null;

  const desktopAspectRatio =
    desktopSample?.sampleType === 'image'
      ? (desktopImageAspectRatio ?? '16 / 9')
      : desktopVideoAspectRatio;

  const mobileAspectRatio =
    mobileSample?.sampleType === 'image'
      ? (mobileImageAspectRatio ?? '9 / 16')
      : mobileVideoAspectRatio;

  const handleDesktopMetadata = (event: CustomEvent) => {
    const target = event.target as
      | (HTMLElement & { media?: HTMLVideoElement | null })
      | null;

    const video = target?.media ?? (target as HTMLVideoElement | null);

    if (!video?.videoWidth || !video?.videoHeight) return;

    setDesktopVideoAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
  };

  const handleMobileMetadata = (event: CustomEvent) => {
    const target = event.target as
      | (HTMLElement & { media?: HTMLVideoElement | null })
      | null;

    const video = target?.media ?? (target as HTMLVideoElement | null);

    if (!video?.videoWidth || !video?.videoHeight) return;

    setMobileVideoAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
  };

  React.useEffect(() => {
    if (desktopSample?.sampleType !== 'video') return undefined;

    return attachVideoAspectRatioListener(
      desktopPlayerRef.current,
      setDesktopVideoAspectRatio,
    );
  }, [attachVideoAspectRatioListener, desktopSample?.sampleType]);

  React.useEffect(() => {
    if (mobileSample?.sampleType !== 'video') return undefined;

    return attachVideoAspectRatioListener(
      mobilePlayerRef.current,
      setMobileVideoAspectRatio,
    );
  }, [attachVideoAspectRatioListener, mobileSample?.sampleType]);

  // Wait for layout hydration if clients are not ready yet.
  if (!clients) return null;

  if (!client) return notFound();

  return (
    <>
      <div className="mb-6 md:mb-10">
        <Table
          rows={[client]}
          columns={[
            {
              header: 'Client',
              render: (c) => <div>{c.name}</div>,
            },
            { header: 'Year', render: (c) => c.year },
            { header: 'Focus', render: (c) => c.focus?.join(', ') },
          ]}
        />
      </div>

      {/* spacing: keep two breaks */}
      {/* spacing: keep two breaks */}

      <div className="flex flex-col gap-10">
        {desktopSample ? (
          <BrowserMockup
            url={client.displayUrl}
            aspectRatio={desktopAspectRatio}
            contentClassName="relative"
          >
            {desktopSample.sampleType === 'video' ? (
              <MuxPlayer
                ref={desktopPlayerRef}
                playbackId={desktopSample.videoPlaybackId}
                muted
                autoPlay
                loop
                nohotkeys
                disablePictureInPicture
                playsInline
                preload="metadata"
                className="pointer-events-none h-full w-full"
                style={{
                  '--controls': 'none',
                  '--play-button': 'none',
                  '--media-object-fit': 'cover',
                  '--media-object-position': 'center',
                }}
                onLoadedMetadata={handleDesktopMetadata}
              />
            ) : (
              <Image
                src={desktopSample.image.asset.url}
                alt={`${client.name} desktop sample`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </BrowserMockup>
        ) : null}

        {/* spacing: keep two breaks */}
        {/* spacing: keep two breaks */}

        {mobileSample ? (
          <MobileBrowserMockup
            url={client.displayUrl}
            aspectRatio={mobileAspectRatio}
            contentClassName="relative"
          >
            {mobileSample.sampleType === 'video' ? (
              <MuxPlayer
                ref={mobilePlayerRef}
                playbackId={mobileSample.videoPlaybackId}
                muted
                autoPlay
                loop
                nohotkeys
                disablePictureInPicture
                playsInline
                preload="metadata"
                className="pointer-events-none h-full w-full"
                style={{
                  '--controls': 'none',
                  '--play-button': 'none',
                  '--media-object-fit': 'cover',
                  '--media-object-position': 'center',
                }}
                onLoadedMetadata={handleMobileMetadata}
              />
            ) : (
              <Image
                src={mobileSample.image.asset.url}
                alt={`${client.name} mobile sample`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </MobileBrowserMockup>
        ) : null}
      </div>
    </>
  );
}
