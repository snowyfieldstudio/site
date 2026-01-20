'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useAtomValue } from 'jotai';

import { clientsAtom } from '@/lib/atoms/clients';
import Link from 'next/link';

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

  const [desktopAspectRatio, setDesktopAspectRatio] = React.useState('16 / 9');

  const [mobileAspectRatio, setMobileAspectRatio] = React.useState('9 / 16');

  const clients = useAtomValue(clientsAtom);

  if (!clients) return null;

  const client = clients.find(
    (c) => c.slug === resolvedParams.client?.toLowerCase(),
  );

  console.log('client', client);

  if (!client) return notFound();

  const handleDesktopMetadata = (event: CustomEvent) => {
    const target = event.target as
      | (HTMLElement & { media?: HTMLVideoElement | null })
      | null;

    const video = target?.media ?? (target as HTMLVideoElement | null);

    if (!video?.videoWidth || !video?.videoHeight) return;

    setDesktopAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
  };

  const handleMobileMetadata = (event: CustomEvent) => {
    const target = event.target as
      | (HTMLElement & { media?: HTMLVideoElement | null })
      | null;

    const video = target?.media ?? (target as HTMLVideoElement | null);

    if (!video?.videoWidth || !video?.videoHeight) return;

    setMobileAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
  };

  return (
    <>
      <div className="mb-6 md:mb-10">
        <Table
          rows={[client]}
          columns={[
            {
              header: 'Client',
              render: (c) => (
                <Link
                  href={`/${c.slug}`}
                  className="text-body text-link cursor-pointer underline md:text-base"
                >
                  {c.name}
                </Link>
              ),
            },
            { header: 'Year', render: (c) => c.year },
            { header: 'Focus', render: (c) => c.focus?.join(', ') },
          ]}
        />
      </div>

      <div className="flex flex-col gap-10">
        <BrowserMockup url="www.noua-unu.com" aspectRatio={desktopAspectRatio}>
          <MuxPlayer
            playbackId="rUvZiRjJCwVoenqnlmqjy02olSJTnhxIPoptky2N2nks"
            muted
            autoPlay
            loop
            nohotkeys
            disablePictureInPicture
            className="pointer-events-none h-full w-full object-cover"
            style={{
              '--controls': 'none',
              '--play-button': 'none',
            }}
            onLoadedMetadata={handleDesktopMetadata}
            metadata={{
              video_id: 'video-id-123456',
              video_title: 'Bick Buck Bunny',
              viewer_user_id: 'user-id-bc-789',
            }}
          />
        </BrowserMockup>

        <MobileBrowserMockup
          url="www.noua-unu.com"
          aspectRatio={mobileAspectRatio}
        >
          <MuxPlayer
            playbackId="wk23bOewuOlE17MeEpr2QNobBsPukm9ZjO3PnmV6dxA"
            muted
            autoPlay
            loop
            nohotkeys
            disablePictureInPicture
            className="pointer-events-none h-full w-full object-cover"
            style={{
              '--controls': 'none',
              '--play-button': 'none',
            }}
            onLoadedMetadata={handleMobileMetadata}
            metadata={{
              video_id: 'video-id-123456',
              video_title: 'Bick Buck Bunny',
              viewer_user_id: 'user-id-bc-789',
            }}
          />
        </MobileBrowserMockup>
      </div>
    </>
  );
}
