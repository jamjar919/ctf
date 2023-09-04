import React from "react";
import {AsciiLoader} from "../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../ascii-loader/AsciiLoaderTileset";

import styles from "./FullscreenLoader.module.scss";

const FullscreenLoader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <AsciiLoader type={AsciiLoaderTilesetType.Sonar} />
        </div>
    )
}

export { FullscreenLoader }