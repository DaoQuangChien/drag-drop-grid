import React, { useState, useEffect } from 'react';
import { useWindowSize } from '../../utility';
import { Div, D2Container } from '../../styled-components/CustomDiv';

const generateColorPallet = () => {
  const colorLayout = [];

  for (let i = 0; i < 8; i++) {
    colorLayout.push([]);
    for (let j = 0; j < 8; j++) {
      colorLayout[i].push(`hsl(${360 * i / 8}, 80%, ${10 * j + 20}%)`);
    }
  }
  return colorLayout;
}
function DragAndDrop() {
  const initLayout = generateColorPallet();
  const initGridPos = initLayout.map(row => row.map(() => [0, 0]));
  const [gridPos, setGridPos] = useState(initGridPos);
  const [layout, setLayout] = useState(initLayout);
  const [delta, setDelta] = useState();
  const [isPressing, setIsPressing] = useState(false);
  const [selectedItemIdx, setSelectedItemIdx] = useState([-1, -1]);
  const [dragItem, setDragItem] = useState(null);
  const { width } = useWindowSize();
  const itemPerRow = 8;
  const containerWidth = width * 60 / 100;
  const itemWidth = containerWidth / itemPerRow;
  const handlePressItem = (row, col) => e => {
    if (e.button === 0) {
      const clonedItem = e.currentTarget.cloneNode(true);
      const rect = e.currentTarget.getBoundingClientRect();
  
      clonedItem.style.pointerEvents = 'none';
      clonedItem.style.position = 'fixed';
      clonedItem.style.left = `${rect.left - 5}px`;
      clonedItem.style.top = `${rect.top - 5}px`;
      document.body.appendChild(clonedItem);
      setIsPressing(true);
      setDelta([e.pageX - rect.left, e.pageY - rect.top]);
      setDragItem(clonedItem);
      setSelectedItemIdx([row, col]);
    }
  }
  const handleMouseUp = () => {
    setDragItem(null);
    setIsPressing(false);
    if (dragItem) {
      let swapItem = layout[selectedItemIdx[0]][selectedItemIdx[1]];
      const newLayout = layout.map((row, rowIds) => row.map((item, colIdx) => {
        if (gridPos[rowIds][colIdx][0] || gridPos[rowIds][colIdx][1]) {
          swapItem = item;
          return layout[selectedItemIdx[0]][selectedItemIdx[1]];
        }
        return item;
      }));

      document.body.removeChild(dragItem);
      newLayout[selectedItemIdx[0]][selectedItemIdx[1]] = swapItem;
      setGridPos(initGridPos);
      setLayout(newLayout);
      setSelectedItemIdx([-1, -1]);
    }
  }
  const handleMouseMove = ({ pageX, pageY }) => {
    if (dragItem) {
      const curXPos = pageX - delta[0];
      const curYPos = pageY - delta[1];
      const toRowIdx = Math.floor((curYPos + (itemWidth / 2)) / itemWidth);
      const toColIdx = Math.floor((curXPos + (itemWidth / 2)) / itemWidth);
      const newGridPos = gridPos.map((gRow, gRowIdx) => gRow.map((_, gColIdx) => {
        if (gRowIdx === toRowIdx && gColIdx === toColIdx) {
          return [(toColIdx - selectedItemIdx[1]) * -1 * itemWidth, (toRowIdx - selectedItemIdx[0]) * -1 * itemWidth];
        }
        return [0, 0];
      }));

      dragItem.style.left = `${curXPos}px`;
      dragItem.style.top = `${curYPos}px`;
      setGridPos(newGridPos);
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  })
  return (
    <div className="App">
      <D2Container className='d2-container' itemWidth={containerWidth}>
        {layout.map((column, rowIdx) => column.map((item, colIdx) =>
          <Div
            key={item}
            className='d2-item'
            itemWidth={itemWidth}
            bgdColor={item}
            xPos={gridPos[rowIdx][colIdx][0]}
            yPos={gridPos[rowIdx][colIdx][1]}
            isSelected={rowIdx === selectedItemIdx[0] && colIdx === selectedItemIdx[1]}
            isAnimating={isPressing}
            onMouseDown={handlePressItem(rowIdx, colIdx)}
          >
            {item}
          </Div>
        ))}
      </D2Container>
    </div>
  );
}

export default DragAndDrop;