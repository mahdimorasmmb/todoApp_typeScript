import React, { memo, useEffect, useRef, useState } from "react";

interface Props {
  label?: string;
  value: any;
  onInput: (value:{}) => void
  name:string
}

const ConvasField = ({ label, value, onInput,name }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(Boolean);
  const [perviousCoordinates, setPreviousCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const canvasContext = canvasRef.current?.getContext("2d");

  useEffect(() => {
    if (value) {
      const image = new Image();
      image.onload = () => {
        canvasContext?.drawImage(image, 0, 0);
      };
      image.src = value;
    }
  }, [value, canvasContext]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!(isDrawing && canvasContext && canvasRef.current)) {
      return;
    }

    const canvasEl = canvasRef.current;
    const { x: offsetX, y: offsetY } = canvasEl.getBoundingClientRect();

    const scaleX = canvasEl.width / canvasEl.clientWidth;
    const scaleY = canvasEl.height / canvasEl.clientHeight;

    const upatedCordinates = {
      x: (event.clientX - offsetX) * scaleX,
      y: (event.clientY - offsetY) * scaleY,
    };

    if (perviousCoordinates.x === 0 && perviousCoordinates.y === 0) {
      setPreviousCoordinates(upatedCordinates);
      return;
    }
    canvasContext.fillStyle = "blue";
    canvasContext.lineWidth = 8;
    canvasContext.moveTo(perviousCoordinates.x, perviousCoordinates.y);
    canvasContext.lineTo(upatedCordinates.x, upatedCordinates.y);
    canvasContext.stroke();
    setPreviousCoordinates(upatedCordinates);
  };

  const enableDrawing = () => {
    setIsDrawing(true);
  };
  const endDrawing = () => {
    setIsDrawing(false);
    onInput({[name]:canvasRef.current?.toDataURL() || ""});
  };
  return (
    <>
      {label && <label>{label}</label>}
      <canvas
      
        width="1800"
        height="600"
        onMouseDown={enableDrawing}
        onMouseMove={startDrawing}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        ref={canvasRef}
        className="h-52 w-full cursor-crosshair rounded border-2 border-[#000000] "
      />
    </>
  );
};

export default memo(ConvasField);
