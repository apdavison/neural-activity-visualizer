import React from "react";

function ListItemNonEmpty(props) {
    if (props.value) {
        return (
            <li className="nv-list-item">
                <span className="nv-list-item__primary">{props.value}</span>
                <span className="nv-list-item__secondary">{props.label}</span>
            </li>
        );
    } else {
        return null;
    }
}

export default function InfoPanel(props) {
    React.useEffect(() => {
        if (!props.open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") props.onClose();
        };

        const handleClickOutside = (e) => {
            const container = props.containerRef?.current;
            if (container && !container.contains(e.target)) {
                props.onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.open, props.onClose, props.containerRef]);

    if (!props.open) return null;

    return (
        <div className="nv-popover" id={props.id}>
            <ul className="nv-list">
                <ListItemNonEmpty label="Name" value={props.info.name} />
                <ListItemNonEmpty
                    label="Description"
                    value={props.info.description}
                />
                <ListItemNonEmpty
                    label="Recording date"
                    value={props.info.rec_datetime}
                />
                <ListItemNonEmpty label="Source" value={props.source} />
                {Object.entries(props.info.annotations || {}).map(
                    ([label, value]) => (
                        <ListItemNonEmpty key={value} label={label} value={value} />
                    )
                )}
            </ul>
        </div>
    );
}
