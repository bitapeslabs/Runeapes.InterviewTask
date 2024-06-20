import React, { useCallback, useMemo, useRef } from 'react'
import IndexContainer from './StyledComponents/Index/IndexContainer'
import IndexIconButton from './StyledComponents/Index/IndexIconButton'

export const Indexes = ({
  activeIndexes,
  startIndex,
  indexesPerRow,
  slideAnchors,
  scrollBy,
  indexContainerProps,
  indexProps,
}) => {
  const containerRef = useRef()
  const gap = 5
  const borderWidth = 2
  const width = useMemo(() => `calc((100% - ${(indexesPerRow - 1) * gap}px) / ${indexesPerRow})`, [indexesPerRow])

  const containerClassName = useMemo(() => `${indexContainerProps?.className || ''}`, [indexContainerProps?.className])

  const iconClassName = useMemo(() => `${indexProps?.className || ''}`, [indexProps?.className])

  const onClick = useCallback(
    (callback) => (e) => {
      if (typeof callback === 'function') {
        callback(e)
      }
      scrollBy()
    },
    [scrollBy],
  )

  return (
    <IndexContainer
      {...indexContainerProps}
      ref={containerRef}
      className={containerClassName}
      gap={gap}
      style={{ ...indexContainerProps?.style }}
    >
      {slideAnchors?.map((_, i) => (
        <IndexIconButton
          tabIndex={-1}
          key={i}
          {...indexProps}
          className={iconClassName}
          activeIndex={activeIndexes.includes(i)}
          borderWidth={borderWidth}
          style={{
            width,
            ...indexProps?.style,
          }}
          onClick={onClick(indexProps?.onClick, i - startIndex)}
        />
      ))}
    </IndexContainer>
  )
}
