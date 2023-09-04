import styles from "./FullscreenLoader.module.scss";
import {AsciiLoader} from "../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../ascii-loader/AsciiLoaderTileset";

const FullscreenLoader = () => {
    return (
        <div className={styles.loader}>
            <AsciiLoader type={AsciiLoaderTilesetType.Sonar} />
        </div>
    )
}

export { FullscreenLoader }