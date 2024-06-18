Custom React carousel component with Infinite loop, Draggable, Button Control.

Supports infinite scrolling and slides of varying widths.


## Working on:
- handle mouse wheel scroll correctly
- auto-scroll feature
- further optimizations
- scroll arrows scroll by displayed tile count for infinite carousel

## How to use

|  	| **Type** 	| **Default Value** 	| **Description** 	|
|---	|---	|---	|---	|
| **isInfinite** 	| boolean 	| false 	| Toggles whether the infinite scrolling is enabled 	|
| **isDraggable** 	| boolean 	| true 	| Is the carousel draggable (mouse drag + touch screens) 	|
| **hasDragMomentum** 	| boolean 	| true 	| Toggles whether there is momentum when dragging |
| **dragMomentumSpeed** 	| number 	| 25 	| Maximum speed in pixels that the drag momentum can be 	|
| **displayCount** 	| int 	| 0 	| How many slides you wish to display. <br>If no value or 0 is set then the carousel will take up maximum width.<br>Overflow will be hidden.<br>Carousel `width` CSS property will be equal to the smallest value needed in order to display the desired slide count. 	|
| **gridGap** 	| number 	| 10 	| The gap between tiles in CSS pixels 	|
| **style** 	| React.CSSProperties 	| {} 	| Inline style used to overwrite the default Carousel container CSS 	|
| **slideContainerStyle** 	| React.CSSProperties 	| {} 	| Inline style used to overwrite the default `<div>` that wraps the slides (children) 	|
| **slideStyle** 	| React.CSSProperties 	| {} 	| Inline style used to overwrite the default `<div>` that wraps each slide (each child) 	|
| **arrowLeftProps** 	| Record<string, unknown> 	| {} 	| props to send to the left arrow container 	|
| **arrowRightProps** 	| Record<string, unknown> 	| {} 	| props to send to the right arrow container 	|
| **scrollSpeed** 	| number 	| 75 	| The maximum scroll speed allowed in pixels 	|
| **arrows** 	| React.FC<RenderArrowsProps> 	|  	| Function that returns a React.Element to be used as the scroll arrows. 	|
| **indexContainerProps** 	| Record<string, unknown> 	| {} 	| props to send to the index container 	|
| **indexProps** 	| Record<string, unknown> 	| {} 	| props to send to the index icon 	|
| **indexes** 	| React.FC<RenderIndexesProps> 	|  	| Function that returns a React.Element to be used as the scroll indexes 	|
| **scrollCount (disabled for infinite)** 	| number 	| 1 	| Number of tiles to scroll per scroll arrow click. "shouldScrollByDisplayCount" overrides this value 	|
| **children** 	| React.Node \| Array<React.Node> 	|  	| The slides you wish to display in the carousel 	|