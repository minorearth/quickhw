import React, { forwardRef, useCallback, useState } from "react";
import { useEffect, useRef } from "react";
import progress from "@/app/store/progress";

export const useDrawer = ({ status, lines, setLines, bounds }) => {
  const [tool, setTool] = useState("pen");
  const isDrawing = useRef(false);

  useEffect(() => {
    setLines([]);
  }, [status, bounds]);

  useEffect(() => {
    status == "loaded" && progress.setShowProgress(false);
    status == "loading" && progress.setShowProgress(true);
  }, [status]);

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

  return {
    lines,
    actions: { handleMouseDown, handleMouseUp, handleMouseMove },
  };
};
