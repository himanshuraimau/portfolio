import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Himanshu Rai - Software Engineer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  // Font
  const interSemiBold = fetch(
    new URL('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #000000, #111827)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Himanshu Rai
        </div>
        <div
          style={{
            fontSize: '32px',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Full Stack • DevOps • AI Engineer
        </div>
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginTop: '30px',
            textAlign: 'center',
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          enghimanshu.tech
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
} 