export interface ICarousel {
  isInfinite: boolean;
  viewCount: number;
  gap: number;
  datas: ICarouselItemData[];
  fullWidth: boolean;
  viewWidth?: number;
  viewHeight?: number;
  handler: boolean;
  auto: boolean;
  duration: number;
}

export interface ICarouselItem {
  $viewWidth: number;
  $viewHeight: number;
  $isInfinite: boolean;
  $auto?: boolean;
  $duration?: number;
}

export interface ICarouselItemData {
  image: string;
}

export interface IItemData {
  data: ICarouselItemData;
  movePosition: number;
  $itemWidth: number;
  $isInfinite: boolean;
  $index: number;
  $direction?: boolean;
  $viewCount: number;
  $totalCount: number;
  $gap: number;
  id: number;
}
