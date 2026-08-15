import { registerRoot } from "remotion";
import { Composition } from "remotion";
import { FripsVideo } from "./FripsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FripsVideo"
        component={FripsVideo}
        durationInFrames={120}
        fps={30}
        width={720}
        height={900}
        defaultProps={{ flavor: "Original" }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
