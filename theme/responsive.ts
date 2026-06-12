export const TABLET_MIN_WIDTH = 600;

export const CONTENT_MAX_WIDTH = 720;
export const MENU_GRID_MAX_WIDTH = 680;
export const GAME_BOARD_MAX_WIDTH = 640;
export const VOCABULARY_GRID_MAX_WIDTH = 700;
export const COLORS_GRID_MAX_WIDTH = 580;

export const isTabletWidth = (width: number) => width >= TABLET_MIN_WIDTH;

export const getContentMaxWidth = (width: number) =>
  isTabletWidth(width) ? Math.min(width, CONTENT_MAX_WIDTH) : width;

export const getMenuGridMaxWidth = (width: number) =>
  isTabletWidth(width) ? MENU_GRID_MAX_WIDTH : 520;

export const getGameBoardMaxWidth = (width: number) =>
  isTabletWidth(width) ? Math.min(width, GAME_BOARD_MAX_WIDTH) : width;

export const getTileSize = (screenWidth: number) => {
  if (isTabletWidth(screenWidth)) {
    const gridWidth = getMenuGridMaxWidth(screenWidth);
    const columns = 4;
    const tileMargin = 16;
    const size = Math.floor((gridWidth - tileMargin * columns) / columns);
    return Math.min(196, Math.max(160, size));
  }

  return screenWidth <= 429 ? screenWidth * 0.4 : 180;
};

export const getHubTileSize = (screenWidth: number) => {
  if (isTabletWidth(screenWidth)) {
    return Math.min(260, Math.floor((getMenuGridMaxWidth(screenWidth) - 48) / 2));
  }

  return Math.min(screenWidth * 0.52, 220);
};

export const getColorCardSize = (screenWidth: number) => {
  const gridWidth = Math.min(
    screenWidth,
    isTabletWidth(screenWidth) ? COLORS_GRID_MAX_WIDTH : screenWidth
  );
  const horizontalPad = isTabletWidth(screenWidth) ? 32 : 52;
  const columns = isTabletWidth(screenWidth) ? 4 : 3;
  const cardWidth = Math.floor((gridWidth - horizontalPad) / columns);
  const width = Math.min(isTabletWidth(screenWidth) ? 132 : 118, cardWidth);

  return {
    width,
    height: Math.round(width * 1.18),
  };
};

export const getMemoryCardMaxSize = (screenWidth: number) =>
  isTabletWidth(screenWidth) ? 168 : 132;

export const getListenTapTileMaxSize = (screenWidth: number) =>
  isTabletWidth(screenWidth) ? 156 : 140;

export const getSortItItemMaxSize = (screenWidth: number) =>
  isTabletWidth(screenWidth) ? 108 : 88;

export const getLetterCanvasMaxSize = (screenWidth: number) =>
  isTabletWidth(screenWidth) ? 480 : 380;

export const scaleFont = (screenWidth: number, phoneSize: number, tabletSize: number) =>
  isTabletWidth(screenWidth) ? tabletSize : phoneSize;
