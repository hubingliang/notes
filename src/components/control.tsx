import { Button, InputNumber, Switch } from "antd";
import { CSSCenterFlex } from "./notes";

interface ControlPanelProps {
  setBpm: (bpm: number) => void;
  setIsHard: (checked: boolean) => void;
  playing: Boolean;
  isHard: Boolean;
  setPlaying: (playing: Boolean) => void;
}

const DEFAULT_BPM = 60;

export const ControlPanel: React.FC<ControlPanelProps> = ({
  setBpm,
  playing,
  setPlaying,
  setIsHard,
}) => {
  const onChange = (value: string) => {
    const bpm = parseInt(value);
    if (Number.isNaN(bpm)) {
      setBpm(DEFAULT_BPM);
    } else {
      setBpm(bpm);
    }
  };

  const onClick = () => {
    setPlaying(!playing);
  };

  const label = playing ? `STOP` : `START`;

  return (
    <div
      style={{
        ...CSSCenterFlex("row"),
        marginTop: "16px",
      }}
    >
      <span style={{ margin: "8px" }}>
        <span style={{ marginRight: "8px", fontSize: "18px" }}>{`bpm`}</span>
        <InputNumber onChange={onChange} size="large" defaultValue="60" />
        <Switch onChange={(checked: boolean) => setIsHard(checked)}></Switch>
      </span>
      <Button
        onClick={onClick}
        size="large"
        style={{
          marginLeft: "12px",
          width: "90px",
        }}
      >
        {label}
      </Button>
    </div>
  );
};
