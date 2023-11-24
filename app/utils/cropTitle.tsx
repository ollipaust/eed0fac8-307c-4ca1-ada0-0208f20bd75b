export const cropTitle = (title: string): string => {
    const maxLength = 115;
    const ellipsisLength = 3;

    if (title.length > maxLength) {
      return title.substring(0, maxLength - ellipsisLength) + '...';
    }
    return title;
  };