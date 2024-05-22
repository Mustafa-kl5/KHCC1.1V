export interface iRoute {
  path: string;
  element: React.ReactNode;
  pageName?: string;
  icon?: React.ReactNode;
  notShown?: boolean;
}
