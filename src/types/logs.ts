export interface iLog {
  id: string;
  title: String;
  description: string;
  createAt: string;
}

export interface iLogsList {
  logs: iLog[];
}
