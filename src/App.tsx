import { useState } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { IPhonePreview } from "./components/ios/IPhonePreview";
import { IOSExperience } from "./components/ios/IOSExperience";
import { MacDesktop } from "./components/mac/MacDesktop";
import { PortfolioBot } from "./components/bot/PortfolioBot";
import { BotProvider } from "./context/BotContext";
import { PreferencesProvider } from "./context/PreferencesContext";

export default function App() {
  return (
    <PreferencesProvider>
      <BotProvider>
        <AppShell />
        <PortfolioBot />
      </BotProvider>
    </PreferencesProvider>
  );
}

function AppShell() {
  const isPhone = useMediaQuery("(max-width: 767px)");
  const [previewPhone, setPreviewPhone] = useState(false);

  if (isPhone) {
    return <IOSExperience />;
  }

  if (previewPhone) {
    return <IPhonePreview onExit={() => setPreviewPhone(false)} />;
  }

  return <MacDesktop onPreviewPhone={() => setPreviewPhone(true)} />;
}
