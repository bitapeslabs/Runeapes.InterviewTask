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
  movePosition: number;
  $itemWidth: number;
  $isInfinite: boolean;
  $index: number;
  $direction?: boolean;
  $viewCount: number;
  $totalCount: number;
  $backgroundColor: string;
  id: number;
}
