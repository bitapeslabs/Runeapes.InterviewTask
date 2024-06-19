import React, { useCallback, useMemo } from 'react'
import ArrowButton from './StyledComponents/Arrow/ArrowButton.tsx'
import ArrowIcon from './StyledComponents/Arrow/ArrowIcon.tsx'

export const Arrows = ({ isLeft, isHidden, scrollBy, scrollCount, arrowProps, arrowIconProps }) => {
  const arrowClassName = useMemo(() => `${arrowProps?.className || ''}`, [arrowProps?.className])

  const onClick = useCallback(
    (callback, scrollCount) => (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (typeof callback === 'function') {
        callback(e)
      }

      scrollBy(scrollCount)
    },
    [arrowProps?.onClick, scrollBy, isLeft],
  )

  const iconClassName = useMemo(() => `${arrowIconProps?.className || ''}`, [arrowIconProps?.className])

  return (
    <ArrowButton
      {...arrowProps}
      isLeft={isLeft}
      isHidden={isHidden}
      tabIndex={-1} //no focus by default for ADA
      className={arrowClassName}
      onClick={onClick(arrowProps?.onClick, isLeft ? -scrollCount : scrollCount)}
    >
      <ArrowIcon isLeft={isLeft} {...arrowIconProps} className={iconClassName} />
    </ArrowButton>
  )
}
