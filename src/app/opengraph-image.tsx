import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Himanshu Rai - Engineering Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Define colors to match your website theme
  const bg = '#030711'; // Dark background
  const fg = '#f8fafc'; // Foreground text
  const muted = '#94a3b8'; // Muted text
  const primary = '#3b82f6'; // Primary accent (Blue/Cyan)
  const border = '#1e293b'; // Border color

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bg,
          // CSS Grid Pattern simulation
          backgroundImage: `
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Radial Glow Effect */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          }} 
        />

        {/* Main Card Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(3, 7, 17, 0.8)',
            border: `1px solid ${border}`,
            borderRadius: '20px',
            padding: '60px',
            width: '90%',
            height: '80%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header / Command Line */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', borderBottom: `1px solid ${border}`, paddingBottom: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', marginRight: '30px' }}>
              <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div style={{ fontSize: '24px', color: muted, fontFamily: 'monospace' }}>
              sys_admin@enghimanshu:~
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
             <div style={{ fontSize: '24px', color: primary, fontFamily: 'monospace', marginBottom: '10px' }}>
              &gt; fetch_user_profile --id &quot;himanshu&quot;
            </div>
            
            <div style={{ fontSize: '80px', fontWeight: 'bold', color: fg, lineHeight: 1, letterSpacing: '-2px' }}>
              Himanshu Rai
            </div>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
               <div style={{ 
                  fontSize: '32px', 
                  color: muted, 
                  background: 'rgba(30, 41, 59, 0.5)', 
                  padding: '5px 20px', 
                  borderRadius: '8px',
                  fontFamily: 'monospace'
                }}>
                  Full Stack Dev
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  color: primary, 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  padding: '5px 20px', 
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  border: `1px solid ${primary}`
                }}>
                  AI Engineer
                </div>
            </div>
          </div>

          {/* Footer / URL */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', paddingTop: '40px', borderTop: `1px solid ${border}` }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <div style={{ fontSize: '20px', color: muted, fontFamily: 'monospace' }}>Current Status:</div>
               <div style={{ fontSize: '24px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  ● System Online
               </div>
            </div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: fg }}>
              enghimanshu.space
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}