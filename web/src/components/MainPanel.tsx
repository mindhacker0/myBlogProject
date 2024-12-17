import { useEffect, useState } from "react";

// import PlayArrow from '@mui/icons-material/PlayArrow';
// import Repeat from '@mui/icons-material/Repeat';
// import Stop from "@mui/icons-material/Stop";
// import FitScreen from "@mui/icons-material/FitScreen";
// import Fab from "@mui/material/Fab/Fab";

import { ActiveConnector } from "./workflo/ActiveConnector";
import { SucceededConnector } from "./workflo/SucceededConnector";
import { WorkflowCanvas, WorkflowCanvasInstance } from "./workflo/WorkflowCanvas";
import { DefaultNode } from "./workflo/DefaultNode";
import { DefaultConnector } from "./workflo/DefaultConnector";
import { NodeType, ConnectorType } from "./workflo/workflo";

import './MainPanel.css';
import { FailedConnector } from "./workflo/FailedConnector";

import { RightCircleOutlined, RollbackOutlined, StopOutlined, FullscreenOutlined } from '@ant-design/icons';

export type CanvasElements = { nodes: NodeType[], edges: ConnectorType[] };
  
/**
 * The MainPanel component props.
 */
export type MainPanelProps = {
    /** The layout identifier. */
    layoutId: string | null;

    /** The behaviour tree elements. */
    elements: CanvasElements | null;

    showPlayButton: boolean;

    showReplayButton: boolean;

    showStopButton: boolean;

    onPlayButtonClick(): void;

    onReplayButtonClick(): void;

    onStopButtonClick(): void;
}

/**
 * The MainPanel component.
 */
 export const MainPanel: React.FunctionComponent<MainPanelProps> = ({ layoutId, elements, showPlayButton, showReplayButton, showStopButton, onPlayButtonClick, onReplayButtonClick, onStopButtonClick }) => {
    const [canvasInstance, setCanvasInstance] = useState<WorkflowCanvasInstance | null>(null);
    const [isFitNeeded, setIsFitNeeded] = useState<boolean>(true);
    const [lastLayoutId, setLastLayoutId] = useState<string | null>(null);

    // An effect to call 'fit' on our canvas under certain conditions.
    useEffect(() => {
        if (!elements) return;

        const doNodesExist = elements.nodes.length > 0;

        // If we ever go from having no layout to some layout we should call 'fit'.
        if (doNodesExist && isFitNeeded) {
            canvasInstance?.fit();
            setIsFitNeeded(false);
        } else if (!doNodesExist && !isFitNeeded) {
            setIsFitNeeded(true);
        }

        // If we swap layouts we should call 'fit'.
        if (lastLayoutId != layoutId) {
            canvasInstance?.fit();
            setLastLayoutId(layoutId);
        }
    }, []);

    return elements ? (
        <div className="main-panel">
            <WorkflowCanvas
                onInitalise={(instance) => setCanvasInstance(instance)}
                nodes={elements.nodes}
                connectors={elements.edges}
                nodeComponents={{
                    "default": DefaultNode
                }}
                connectorComponents={{
                    "default": DefaultConnector,
                    "active": ActiveConnector,
                    "succeeded": SucceededConnector,
                    "failed": FailedConnector
                }}
            />
            <div className="main-panel-fab-container" style={{ display: 'flex' }}>
                {showPlayButton && (
                    <div onClick={onPlayButtonClick} className="run-tree-fab main-panel-fab" color="primary" style={{ cursor: 'pointer' }}>
                        <RightCircleOutlined />
                    </div>
                )}
                 {showReplayButton && (
                    <div onClick={onReplayButtonClick} className="run-tree-fab main-panel-fab" color="primary" style={{ cursor: 'pointer' }}>
                        <RollbackOutlined />
                    </div>
                )}
                {showStopButton && (
                    <div onClick={onStopButtonClick} className="run-tree-fab main-panel-fab" color="primary" style={{ cursor: 'pointer' }}>
                        <StopOutlined />
                    </div>
                )}
                {!!elements.edges.length && !!elements.nodes.length && (
                    <div onClick={() => canvasInstance?.fit()} className="run-tree-fab main-panel-fab" color="primary" style={{ cursor: 'pointer' }}>
                        <FullscreenOutlined />
                    </div>
                )}
            </div>
        </div>
    ) : null;
  }
  