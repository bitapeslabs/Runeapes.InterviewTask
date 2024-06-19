import React, { useMemo } from 'react'
import { Carousel as CarouselEle } from '../components/Carousel'
import { Arrows } from '../components/Arrows'
import { Indexes } from '../components/Indexes'
import './Carousel.css'

const SectionContainerCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  height: '100%',
}

const CarouselContainerCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '5px solid gray',
  padding: '15px',
  width: 'calc(100% - 30px)',
}

const TileCss = ({ color, width, height }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '4rem',
  width: `${width}`,
  height: `${height}`,
  backgroundColor: `${color}`,
  borderRadius: '5px',
  color: 'white',
})

const getRandomColor = () => Math.floor(Math.random() * 205) + 10
const getRandomWidth = () => Math.max(Math.min((Math.random() * 7 + 1) * 40 + 10, 300), 100)
const tileCache = []

const Template = ({
  isInfinite,
  randomTileSizes,
  showIndexes,
  tileCount,
  displayCount,
  showArrows,
  gridGap,
  draggable,
  hasDragMomentum,
  dragMomentumSpeed,
  width,
  height,
}) => {
  const randomColors = useMemo(() => {
    if (!tileCount || tileCount <= 0) {
      return []
    }

    const cachedTiles = tileCache.slice(0, tileCount)
    const newTileCount = tileCount - cachedTiles.length
    const newTiles =
      newTileCount <= 0
        ? []
        : Array(newTileCount)
            .fill()
            .map(() => ({
              color: `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`,
              width: getRandomWidth(),
            }))

    if (newTiles.length > 0) {
      tileCache.push(...newTiles)
    }

    return [...cachedTiles, ...newTiles]
  }, [tileCount])

  return (
    <div style={SectionContainerCss}>
      <div style={CarouselContainerCss}>
        <CarouselEle
          isInfinite={isInfinite}
          gridGap={gridGap}
          displayCount={displayCount}
          arrows={showArrows ? Arrows : null}
          indexes={showIndexes ? Indexes : null}
          isDraggable={draggable}
          hasDragMomentum={hasDragMomentum}
          dragMomentumSpeed={dragMomentumSpeed}
        >
          {randomColors.map((slide, i) => (
            <div
              key={i}
              tabIndex={0}
              className={'tile'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log(`Tile ${i} clicked`)
                }
              }}
              style={TileCss({
                color: slide.color,
                width: `${randomTileSizes ? slide.width : width}px`,
                height: `${height}px`,
              })}
            >
              <button>{i}</button>
              <button>{i}</button>
            </div>
          ))}
        </CarouselEle>
      </div>
    </div>
  )
}

export default {
  component: Template,
  title: 'Carousel',
  argTypes: {
    isInfinite: {
      control: false,
      table: {
        disable: true,
      },
    },
    randomTileSizes: {
      control: false,
      table: {
        disable: true,
      },
    },
    width: {
      control: false,
      table: {
        disable: true,
      },
    },
    height: {
      control: false,
      table: {
        disable: true,
      },
    },
    draggable: {
      control: { type: 'boolean' },
    },
    hasDragMomentum: {
      control: { type: 'boolean' },
    },
    dragMomentumSpeed: {
      control: { type: 'range', min: 1, max: 50, steps: 1 },
    },
    showIndexes: {
      control: { type: 'boolean' },
    },
    tileCount: {
      control: { type: 'range', min: 1, max: 50, step: 1 },
    },
    displayCount: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
    },
    gridGap: {
      control: { type: 'range', min: 1, max: 500, step: 1 },
    },
    showArrows: {
      control: { type: 'boolean' },
    },
  },
}

const carouselStoryArgs = {
  width: '150',
  height: '250',
  isInfinite: false,
  randomTileSizes: false,
  showIndexes: true,
  showArrows: true,
  draggable: true,
  hasDragMomentum: true,
  dragMomentumSpeed: 25,
  tileCount: 25,
  displayCount: 4,
  gridGap: 15,
}

export const Default = Template.bind({})
Default.args = carouselStoryArgs


export const Infinite = Template.bind({})
Infinite.args = {
  ...carouselStoryArgs,
  isInfinite: true,
}

export const MobileSingleItem = Template.bind({})
MobileSingleItem.args = {
  ...carouselStoryArgs,
  isInfinite: true,
  tileCount: 5,
  displayCount: 2,
  width: '300',
  height: '500',
  hasDragMomentum: false,
  showArrows: false,
}
