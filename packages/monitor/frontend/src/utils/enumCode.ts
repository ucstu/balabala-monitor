const Enum: Record<number, string> = {
  1: "",
};

export const getCodeName = (key: number) => Enum[key];
