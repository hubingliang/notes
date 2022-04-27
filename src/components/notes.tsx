import { join } from "path";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { Howl } from "howler";

export function CSSCenterFlex(
  flexDirection: "column" | "row" = "column"
): CSSProperties {
  return {
    display: "flex",
    flexDirection,
    alignItems: "center",
    justifyContent: "center",
  };
}

function sample<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
}

function generateNote(): string {
  const notes = ["C", "D", "E", "F", "G", "A", "B"];

  return sample(notes);
}

function generateKey(): string {
  return Math.random().toString(36).substr(2, 5);
}

function bpmToInterval(bpm: number): number {
  return Math.floor((60 * 1000) / bpm);
}

const ANIMATTION_ENTER = `animate__animated animate__fadeIn`;

const PlayerBox: React.FC = ({ children }) => {
  return (
    <div
      style={{
        width: "40vw",
        height: "40vh",
        backgroundColor: "skyblue",
        ...CSSCenterFlex(),
        fontSize: "120px",
      }}
    >
      {children}
    </div>
  );
};
const random = () => {
  const result = Math.round(Math.random()) === 0;
  return result;
};
const optionGenerator = (note: string) => {
  let result = random() ? "flat" : "sharp";
  if (["C", "F"].includes(note)) {
    result = `sharp`;
  }
  if (["B", "E"].includes(note)) {
    result = `flat`;
  }
  return join(process.env.PUBLIC_URL, `assets/${result}.mp3`);
};
const Note: React.FC<{ note: string }> = ({ note }) => {
  const audioPath = join(process.env.PUBLIC_URL, `assets/${note}.mp3`);
  const audioPathExtra = optionGenerator(note);

  var sound1 = new Howl({
    src: [audioPath],
  });
  var sound2 = new Howl({
    src: [audioPathExtra],
  });
  var sound2Callback = useCallback(() => {
    return sound2;
  }, [sound2]);
  var sound1Callback = useCallback(() => {
    return sound1;
  }, [sound1]);

  useEffect(() => {
    sound1.play();
    sound1.on("end", function () {
      {
        random() && sound2.play();
      }
    });
  }, []);
  return (
    <PlayerBox>
      <span
        className={ANIMATTION_ENTER}
        style={{
          fontSize: "120px",
          fontFamily: "Georgia",
          color: "#2860B4",
        }}
      >
        {note}
      </span>
    </PlayerBox>
  );
};

const Playing: React.FC<{ bpm: number }> = ({ bpm }) => {
  const [note, setNote] = useState<string>(generateNote());
  const [key, setKey] = useState<string>(generateKey());
  const interval = bpmToInterval(bpm);

  function refreshNote() {
    setNote(generateNote());
    setKey(generateKey());
  }

  useEffect(() => {
    const timerId = setInterval(refreshNote, interval);
    return function cleanup() {
      clearInterval(timerId);
    };
  });

  return <Note key={key} note={note} />;
};

const Paused: React.FC = () => {
  const msg = `PAUSED`;

  return (
    <PlayerBox>
      <span
        style={{
          fontFamily: "Lucida Console",
          color: "#F2569C",
        }}
      >
        {msg}
      </span>
    </PlayerBox>
  );
};

export const Player: React.FC<{ bpm: number; playing: Boolean }> = ({
  bpm,
  playing,
}) => {
  if (playing) {
    return <Playing bpm={bpm} />;
  }
  return <Paused />;
};
