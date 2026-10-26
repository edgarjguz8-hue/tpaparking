import '@fontsource/archivo/700.css';
import '@fontsource/archivo/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './globals.css';

export const metadata = {
  title: 'TpaParking · Event parking in Tampa Bay',
  description: 'Find and book event parking near the stadium. Pay online, show your pass, skip the circling.',
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#F6F7F9' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
