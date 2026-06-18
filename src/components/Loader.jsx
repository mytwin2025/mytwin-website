import { Oval } from 'react-loader-spinner'

function Loader({
  height = 20,
  width = 20,
  color = "#fff",
  secondaryColor = "#f4f4f5",
  strokeWidth = 4,
  strokeWidthSecondary = 4,
}) {
  return (
    <Oval
      height={height}
      width={width}
      color={color}
      wrapperStyle={{backgroundColor: 'transparent'}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor={secondaryColor}
      strokeWidth={strokeWidth}
      strokeWidthSecondary={strokeWidthSecondary}
    />
  )
}
export default Loader;