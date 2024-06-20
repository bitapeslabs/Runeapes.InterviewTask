export interface ICarousel {
  isInfinite: boolean;
  viewCount: number;
  datas: number;
  fullWidth: boolean;
  viewWidth?: number;
  viewHeight?: number;
}

export interface ICarouselItem {
  $viewWidth: number;
  $viewHeight: number;
  $isInfinite: boolean;
  $auto?: boolean;
  $duration?: number;
}

export interface IItemData {
  $itemWidth: number;
  $isInfinite: boolean;
  $index: number;
  $viewCount: number;
  $totalCount: number;
  $backgroundColor: string;
  drag: boolean;
  between: number;
  id: number;
  direction: number;
  velocity: number;
  setIndex: (index: number) => void;
}
