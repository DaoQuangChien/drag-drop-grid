import styled from 'styled-components';

export const Div = styled.div.attrs(props => ({
  style: {
    width: `${props.itemWidth}px`,
    height: `${props.itemWidth}px`,
    zIndex: `${props.isSwap ? 2 : 1}`,
    backgroundColor: props.bgdColor,
    transform: `translate3d(${props.xPos || 0}px, ${props.yPos || 0}px, 0px)`,
    ...props.isAnimating && { transition: 'transform .5s ease' },
    ...props.isSelected && { visibility: 'hidden' },
  }
}))`
  padding: 10px;
  border: solid 1px #000;
  border-radius: 5px;
  box-shadow: 0 0 2px;
  box-sizing: border-box;
  text-align: center;
  user-select: none;
`
export const D2Container = styled.div`
  width: ${props => props.itemWidth}px;
  display: flex;
  flex-wrap: wrap;
`
