
import { Route, Routes } from "react-router-dom";
import ListView from "./ListView";
import EditCreateUser from "./EditCreateUser";


export default function FrameSet() {
    return (
        <div>
            <Routes>
                <Route path="/edit" element={<EditCreateUser />} />
                <Route path="/" element={<ListView />} />
                <Route path="/root" element={<div> Hallo Root X</div>} />
            </Routes>
        </div>
    )
}

