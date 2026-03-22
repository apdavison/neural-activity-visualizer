import React from "react";

import {
    TimelineIcon,
    ScatterPlotIcon,
    InfoIcon,
    GetAppIcon,
} from "./icons";
import InfoPanel from "./InfoPanel";

function SegmentSelect(props) {
    let optionAll = null;
    if (props.consistent) {
        optionAll = <option value="all">All</option>;
    }
    return (
        <div className="nv-form-control">
            <label className="nv-label" htmlFor="select-segment">
                Segment
            </label>
            <select
                className="nv-select"
                id="select-segment"
                value={props.labels[props.segmentId] ? props.segmentId : 0}
                onChange={props.onChange}
            >
                {optionAll}
                {props.labels.map((seg, index) => (
                    <option key={index} value={index}>
                        {seg.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function SignalSelect(props) {
    let segmentId = props.segmentId;
    if (props.segmentId === "all") {
        segmentId = 0; // if plotting signals from all segments, the segments
        // have been checked for consistency, so we can take
        // the labels only from the first segment
    }
    if (props.show && props.labels[segmentId]) {
        return (
            <div className="nv-form-control">
                <label className="nv-label" htmlFor="select-signal">
                    Signal
                </label>
                <select
                    className="nv-select"
                    id="select-signal"
                    value={props.signalId}
                    onChange={props.onChange}
                >
                    {props.labels[segmentId].signalLabels.map((label, index) => (
                        <option key={index} value={index}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        );
    } else {
        return "";
    }
}

function LoadingAnimation(props) {
    if (props.loading) {
        return <span className="nv-spinner" aria-label="Loading" />;
    } else {
        return "";
    }
}

export default function HeaderPanel(props) {
    const infoContainerRef = React.useRef(null);
    const [infoOpen, setInfoOpen] = React.useState(false);

    React.useEffect(() => {
        console.log(props);
    }, []);

    const handleChangeSegment = (event) => {
        props.updateGraphData(
            event.target.value,
            props.signalId,
            props.showSignals,
            props.showSpikeTrains
        );
    };

    const handleChangeSignal = (event) => {
        props.updateGraphData(
            props.segmentId,
            event.target.value,
            props.showSignals,
            props.showSpikeTrains
        );
    };

    const handleChangeVisibility = (dataType) => {
        if (dataType === "signals") {
            props.updateGraphData(
                props.segmentId,
                props.signalId,
                !props.showSignals,
                props.showSpikeTrains
            );
        }
        if (dataType === "spiketrains") {
            props.updateGraphData(
                props.segmentId,
                props.signalId,
                props.showSignals,
                !props.showSpikeTrains
            );
        }
    };

    const handleShowInfo = () => {
        setInfoOpen((prev) => !prev);
    };

    const handleHideInfo = () => {
        setInfoOpen(false);
    };

    return (
        <div className="nv-header">
            {!props.disableChoice && (
                <div
                    className="nv-button-group"
                    aria-label="outlined primary button group"
                >
                    <button
                        className={`nv-button${props.showSignals ? " nv-button--active" : ""}`}
                        onClick={() => handleChangeVisibility("signals")}
                        title={`${props.showSignals ? "Hide" : "Show"} signals`}
                    >
                        <TimelineIcon />
                    </button>
                    <button
                        className={`nv-button${props.showSpikeTrains ? " nv-button--active" : ""}`}
                        onClick={() => handleChangeVisibility("spiketrains")}
                        title={`${props.showSpikeTrains ? "Hide" : "Show"} spiketrains`}
                    >
                        <ScatterPlotIcon />
                    </button>
                </div>
            )}
            <SegmentSelect
                segmentId={props.segmentId}
                consistent={props.consistent}
                onChange={handleChangeSegment}
                labels={props.labels}
            />
            <SignalSelect
                segmentId={props.segmentId}
                signalId={props.signalId}
                onChange={handleChangeSignal}
                labels={props.labels}
                show={props.showSignals}
            />

            <div className="nv-info-container" ref={infoContainerRef}>
                <button
                    className="nv-icon-button"
                    onClick={handleShowInfo}
                    aria-label="info"
                    title="File metadata"
                >
                    <InfoIcon fontSize="medium" />
                </button>
                <InfoPanel
                    id="info-panel"
                    source={props.source}
                    info={props.metadata}
                    open={infoOpen}
                    onClose={handleHideInfo}
                    containerRef={infoContainerRef}
                />
            </div>

            <a
                className="nv-icon-button"
                href={props.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="download"
                title="Download data file"
            >
                <GetAppIcon fontSize="medium" />
            </a>

            <LoadingAnimation loading={props.loading} />
            {!props.disableChoice &&
                !props.showSignals &&
                !props.showSpikeTrains && (
                    <span>
                        Click signals (
                        <span className="nv-inline-icon">
                            <TimelineIcon fontSize="small" />
                        </span>
                        ) and/or spike trains (
                        <span className="nv-inline-icon">
                            <ScatterPlotIcon fontSize="small" />
                        </span>
                        )
                    </span>
                )}
        </div>
    );
}
