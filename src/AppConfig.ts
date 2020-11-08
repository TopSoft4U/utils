class AppConfigClass {
  config?: any;

  get = <T>(): T => {
    return (this.config as T);
  };
}

export const AppConfig = new AppConfigClass();

export type ApplicationConfig<T> = T & {
  [key: string]: unknown;
}
