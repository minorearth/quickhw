import React, { forwardRef, useCallback, useState } from "react";
import { Stage, Layer, Line, Text, Image } from "react-konva";
import useImage from "use-image";

import Box from "@mui/material/Box";
import { useEffect } from "react";

import { getImageDimensions } from "../../../../utils/imageUtils";
import useMeasure from "react-use-measure";

const Drawer = forwardRef(({ row, setShowProgress, stageRef }) => {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });
  const isDrawing = React.useRef(false);
  const [image, status] = useImage(row.path, "Anonymous");
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    const handleResize = () => {
      setLines([]);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getImageDimensions(row.path).then((sDim) => {
      setImgDim(sDim);
    });
    setLines([]);
  }, [row]);

  const LionImage = useCallback(() => {
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

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
      id="signInButton"
    >
      <Stage
        ref={stageRef}
        height={imgDim.h * (bounds.width / imgDim.w)}
        width={bounds.width}
        onMouseDown={handleMouseDown}
        onDblTap={handleMouseDown}
        onMousemove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchEnd={handleMouseUp}
        preventDefault={false}
      >
        <Layer>
          <LionImage />
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
    </Box>
  );
});
Drawer.displayName = "drawer";

export default Drawer;
