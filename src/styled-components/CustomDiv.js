import styled from 'styled-components';

export const Div = styled.div`
  width: ${props => props.itemWidth}px;
  height: ${props => props.itemWidth}px;
  padding: 10px;
  border: solid 1px #000;
  border-radius: 5px;
  box-shadow: 0 0 2px;
  box-sizing: border-box;
  background-color: ${props => props.bgdColor};
  ${props => props.isAnimating && 'transition: transform .5s ease;'}
  ${props => props.isSelected && 'visibility: hidden;'}
  text-align: center;
  user-select: none;
  ${props => `transform: translate3d(${props.xPos || 0}px, ${props.yPos || 0}px, 0px);`}
`
export const D2Container = styled.div`
  width: ${props => props.itemWidth}px;
  display: flex;
  flex-wrap: wrap;
`
