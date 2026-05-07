import { useState } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { IPhonePreview } from "./components/ios/IPhonePreview";
import { IOSExperience } from "./components/ios/IOSExperience";
import { MacDesktop } from "./components/mac/MacDesktop";

export default function App() {
  const isPhone = useMediaQuery("(max-width: 767px)");
  const [previewPhone, setPreviewPhone] = useState(false);

  if (isPhone) {
    return <IOSExperience framed={false} />;
  }

  if (previewPhone) {
    return <IPhonePreview onExit={() => setPreviewPhone(false)} />;
  }

  return <MacDesktop onPreviewPhone={() => setPreviewPhone(true)} />;
}
