import React from "react";
import {Competitions} from "../common/Competitions";

const IndexPage: React.FC = () => {
    return (
        <div>
            <h1>://Competitions</h1>
            <ul>
                {Competitions.map(name => (
                    <li><a href={`/${name}`}>{name}</a></li>
                ))}
            </ul>
        </div>
    )
}

export default IndexPage