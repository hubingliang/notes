import { useState } from "react";
import { ControlPanel } from "./control";
import { Player } from "./notes";

export const Page: React.FC = () => {
  const [bpm, setBpm] = useState<number>(40);
  const [isHard, setIsHard] = useState<boolean>(false);
  const [playing, setPlaying] = useState<Boolean>(false);

  return (
    <div style={{}}>
      <Player bpm={bpm} playing={playing} isHard={isHard} />
      <ControlPanel
        isHard={isHard}
        setIsHard={setIsHard}
        setBpm={setBpm}
        playing={playing}
        setPlaying={setPlaying}
      />
    </div>
  );
};
