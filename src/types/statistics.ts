export interface iStatistics {
  freezerName: string;
  freezerModel: string;
  samplesCount: {
    sampleType: string;
    count: number;
  }[];
}

export interface iStatisticsList {
  statistics: iStatistics[];
}
