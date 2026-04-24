import Svg, { Path } from 'react-native-svg';

export default function Icon({ width = 24, height = 24, color = '#FFFCF2', path, viewBox = "0 0 640 640" }){
  return (
  <Svg width={width} height={height} viewBox={viewBox}>
    <Path d={path} fill={color}/>
  </Svg>
)};