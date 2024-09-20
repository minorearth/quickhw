import React, { forwardRef, useCallback, useState } from "react";
import { Stage, Layer, Line, Image } from "react-konva";
import useImage from "use-image";
import { useDrawer } from "./drawerVM";

const Drawer = forwardRef(
  ({ bounds, imgDim, stageRef, path, setShowProgress, lines, setLines }) => {
    const [image, status] = useImage(path, "Anonymous");
    const { actions } = useDrawer({ status, lines, setLines, bounds });

    const BackImage = useCallback(() => {
      status == "loaded" && setShowProgress(false);
      status == "loading" && setShowProgress(true);
      return (
        <Image
          alt="image"
          image={image}
          scaleX={bounds.width / imgDim.w}
          scaleY={bounds.width / imgDim.w}
        />
      );
    }, [bounds, imgDim, status]);

    return (
      <Stage
        ref={stageRef}
        height={imgDim.h * (bounds.width / imgDim.w)}
        width={bounds.width}
        onMouseDown={actions.handleMouseDown}
        onDblTap={actions.handleMouseDown}
        onMousemove={actions.handleMouseMove}
        onTouchMove={actions.handleMouseMove}
        onMouseup={actions.handleMouseUp}
        onTouchEnd={actions.handleMouseUp}
        preventDefault={false}
      >
        <Layer>
          <BackImage />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
