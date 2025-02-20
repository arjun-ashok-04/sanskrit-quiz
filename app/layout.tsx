import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "../styles/globals.css";
import { Header } from "@/components/content/header";
import {Footer} from "@/components/content/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang='en'>
      <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
      />
      <body>
      <Theme accentColor="blue">
          <Header/>
      {children}
          <Footer/>
      </Theme>
      </body>
      </html>
  );
}
