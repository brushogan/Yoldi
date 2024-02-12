import "./styles/globals.css";
import Layout from "./components/layout/Layout";
import { ProfileProvider } from "./context/ProfileContext";

export const metadata = {
  title: "Yoldi Agency",
  icons: {
    icon: "./icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          <Layout>{children}</Layout>
        </ProfileProvider>
      </body>
    </html>
  );
}
