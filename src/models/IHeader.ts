export interface IRoute {
  path: string;
  private: boolean;
  element: React.LazyExoticComponent<(props: any) => JSX.Element>;
}
