export interface iFile {
  summary?: {
    fileName: string | null;
    filePath: string | null;
  };
  protocol?: {
    fileName: string | null;
    filePath: string | null;
  };
  IRB?: {
    fileName: string | null;
    filePath: string | null;
  };
  optional?: {
    fileName: [string] | null;
    filePath: [string] | null;
  }[];
}
export interface Query {
  searchType: string;
  searchWith: string;
}
