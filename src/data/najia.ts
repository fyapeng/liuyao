export interface NajiaMapping {
  trigram: string;
  sequence: [string, string, string, string, string, string];
  notes: string;
}

export const NAJIA_BY_TRIGRAM: Record<string, NajiaMapping> = {
  "\u4e7e": {
    trigram: "\u4e7e",
    sequence: ["\u5b50", "\u5bc5", "\u8fb0", "\u5348", "\u7533", "\u620c"],
    notes:
      "\u9633\u5366\u987a\u884c\u9633\u652f\uff0c\u4e7e\u5bab\u4ee5\u4e0b\u5366\u5b50\u3001\u5bc5\u3001\u8fb0\uff0c\u4e0a\u5366\u5348\u3001\u7533\u3001\u620c\u4f5c\u4e3a\u57fa\u7840\u5c55\u793a\u3002"
  },
  "\u9707": {
    trigram: "\u9707",
    sequence: ["\u5b50", "\u5bc5", "\u8fb0", "\u5348", "\u7533", "\u620c"],
    notes: "\u9633\u5366\u987a\u884c\u9633\u652f\uff0c\u9707\u5bab\u6cbf\u7528\u57fa\u7840\u987a\u6392\u7ed3\u6784\u3002"
  },
  "\u574e": {
    trigram: "\u574e",
    sequence: ["\u5bc5", "\u8fb0", "\u5348", "\u7533", "\u620c", "\u5b50"],
    notes: "\u9633\u5366\u987a\u884c\u9633\u652f\uff0c\u574e\u5bab\u4ece\u5bc5\u8d77\u3002"
  },
  "\u826e": {
    trigram: "\u826e",
    sequence: ["\u8fb0", "\u5348", "\u7533", "\u620c", "\u5b50", "\u5bc5"],
    notes: "\u9633\u5366\u987a\u884c\u9633\u652f\uff0c\u826e\u5bab\u4ece\u8fb0\u8d77\u3002"
  },
  "\u5764": {
    trigram: "\u5764",
    sequence: ["\u672a", "\u5df3", "\u536f", "\u4e11", "\u4ea5", "\u9149"],
    notes: "\u9634\u5366\u9006\u884c\u9634\u652f\uff0c\u5764\u5bab\u4ece\u672a\u8d77\u3002"
  },
  "\u5151": {
    trigram: "\u5151",
    sequence: ["\u5df3", "\u536f", "\u4e11", "\u4ea5", "\u9149", "\u672a"],
    notes: "\u9634\u5366\u9006\u884c\u9634\u652f\uff0c\u5151\u5bab\u4ece\u5df3\u8d77\u3002"
  },
  "\u79bb": {
    trigram: "\u79bb",
    sequence: ["\u536f", "\u4e11", "\u4ea5", "\u9149", "\u672a", "\u5df3"],
    notes: "\u9634\u5366\u9006\u884c\u9634\u652f\uff0c\u79bb\u5bab\u4ece\u536f\u8d77\u3002"
  },
  "\u5deb": {
    trigram: "\u5deb",
    sequence: ["\u4e11", "\u4ea5", "\u9149", "\u672a", "\u5df3", "\u536f"],
    notes: "\u9634\u5366\u9006\u884c\u9634\u652f\uff0c\u5deb\u5bab\u4ece\u4e11\u8d77\u3002"
  }
};
