import React, { forwardRef, useCallback, useState } from "react";
import { Stage, Layer, Line, Text, Image } from "react-konva";
import useImage from "use-image";

import Box from "@mui/material/Box";
import { useEffect } from "react";

import { getImageDimensions } from "../../../../capture/utils/imageUtils";
import useMeasure from "react-use-measure";

const Drawer = forwardRef(({ row, setShowProgress, stageRef }) => {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });
  const isDrawing = React.useRef(false);
  const { contSize, setContSize } = useState();

  const [image, status] = useImage(row.path, "Anonymous");
  const [ref, bounds] = useMeasure();

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
        image={image}
        scaleX={bounds.width / imgDim.w}
        scaleY={bounds.width / imgDim.w}
      />
    );
  }, [image, bounds, imgDim, status]);

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
    // <Box sx={{ "& > :not(style)": { m: 1 } }}>
    <Box
      ref={ref}
      // sx={{ width: "100%", height: drawerDim.h, backgroundColor: "green" }}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        // position: "relative",
      }}
      id="signInButton"
    >
      {/* <IconButton
        aria-label="delete"
        size="small"
        onClick={() => handleSaveImage()}
      >
        <SettingsIcon sx={{ fontSize: 60 }} />
      </IconButton> */}

      <Stage
        ref={stageRef}
        // width={window.innerWidth}
        // height={window.innerHeight}
        // width={drawerDim.w}
        height={imgDim.h * (bounds.width / imgDim.w)}
        width={bounds.width}
        // height={bounds.height}
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
      {/* <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select> */}
    </Box>
  );
});
Drawer.displayName = "drawer";

export default Drawer;
