// Contains game controls (restart, new game)

// Houses difficulty selector and timer

// Displays mine counter (flags remaining)
import DifficultySelector from "../DifficultySelector/DifficultySelector"
import Timer from "../Timer/Timer"

const ControlPanel () => {
    return(
        <>
            <DifficultySelector></DifficultySelector>
            <Timer></Timer>
        </>
    )
}