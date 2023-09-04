import React from "react";

import styles from './HotCorner.module.scss';
import classNames from "classnames";

type HotCornerProps = React.PropsWithChildren<{
    onClick: () => void;
    size: number;
    position: "top-left" // i will add more i promise
}>

const HotCorner: React.FC<HotCornerProps> = ({
    children,
    onClick,
    size
}) => {
    return (
        <div className={classNames(styles.container, styles.topLeft)}>
            <div
                className={styles.hoverArea}
                style={{
                    width: size,
                    height: size
                }}
                onClick={() => onClick()}
            >
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { HotCorner }