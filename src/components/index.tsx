import { useState } from "react"
import { ControlPanel } from "./control"
import { Player } from "./notes"

export const Page: React.FC = () => {
    const [bpm, setBpm] = useState<number>(40)
    const [playing, setPlaying] = useState<Boolean>(false)

    return (
        <div style={{

        }}>
            <Player bpm={bpm} playing={playing} />
            <ControlPanel setBpm={setBpm} playing={playing} setPlaying={setPlaying} />
        </div>
    )
}