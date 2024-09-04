import React, { useCallback, useState } from "react";
// import { createRoot } from 'react-dom/client';
import { Stage, Layer, Line, Text, Image } from "react-konva";
import useImage from "use-image";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { UploadFile } from "../../../storagedb";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { getDownloadURL } from "firebase/storage";
import { getImageDimensions } from "../../capture/utils/imageUtils";

const Drawer = ({ row, session, setRowsx }) => {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [drawerDim, setDrawerDim] = useState({ w: 0, h: 0 });
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);

  const [image] = useImage(row.path, "Anonymous");

  const LionImage = useCallback(() => {
    return <Image image={image} />;
  }, [image]);

  useEffect(() => {
    getImageDimensions(row.path).then((sDim) => {
      setDrawerDim(sDim);
    });
    setLines([]);
  }, [row]);

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

  const handleSaveImage = async () => {
    const imageSrc = stageRef.current.toDataURL();
    const preBlob = await fetch(imageSrc);
    const blob = await preBlob.blob();

    const file = new File([blob], `${row.name}`, {
      type: blob.type,
    });
    const doc = await UploadFile({ file, folder: session });
    const path = await getDownloadURL(doc.ref);
    setRowsx((rows) => {
      rows.filter((srcrow) => srcrow.name == row.name)[0].path = path;
      return rows;
    });
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      {/* <IconButton
        aria-label="delete"
        size="small"
        onClick={() => handleSaveImage()}
      >
        <SettingsIcon sx={{ fontSize: 60 }} />
      </IconButton> */}
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        variant="extended"
        onClick={() => handleSaveImage()}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Сохранить
      </Fab>
      <Stage
        ref={stageRef}
        // width={window.innerWidth}
        // height={window.innerHeight}
        width={drawerDim.w}
        height={drawerDim.h}
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
};

export default Drawer;
