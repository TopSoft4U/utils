import {NodeEnvironments} from "./types";
import {isDev} from "./utils";

class AppConfigClass {
  config?: ApplicationConfig<any>;

  get = <T>(): EnvironmentConfig<T> => {
    const env: NodeEnvironments = isDev() ? "development" : "production";

    if (!this.config || this.config[env] === undefined)
      throw new Error(`Configuration for environment '${env}' is missing!`);

    return this.config[env];
  };
}

export const AppConfig = new AppConfigClass();

export type ApplicationConfig<T> = {
  [K in NodeEnvironments]: EnvironmentConfig<T>;
};

export type EnvironmentConfig<T = {}> = T & {
  admin_port?: number;
  admin_api_port?: number;
  client_port?: number;
  [key: string]: unknown;
};
