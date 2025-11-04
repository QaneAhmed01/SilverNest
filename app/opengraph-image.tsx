import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #FAF7F3 0%, #F2E8E5 50%, #E8F1ED 100%)',
          fontFamily: 'Inter, sans-serif',
          color: '#2B2B2B',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '28px',
            color: '#5B3C3C',
            fontWeight: 600,
          }}
        >
          ✶ SilverNest
        </div>
        <h1
          style={{
            fontSize: '72px',
            lineHeight: 1.1,
            marginTop: '40px',
            fontFamily: 'Playfair Display, serif',
          }}
        >
          Feel confident about your dating profile.
        </h1>
        <p
          style={{
            fontSize: '28px',
            marginTop: '24px',
            maxWidth: '780px',
          }}
        >
          Kind, practical feedback written for real connections — not gimmicks.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
