import "reflect-metadata";
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import {Connection, getConnectionManager, getConnection as _getConnection, ObjectType, EntityTarget, ConnectionOptions, Repository} from "typeorm";
import {isDev} from "../utils";
import {AppConfig} from "../AppConfig";

type OptType = {
  [K in ("default" | string)]: ConnectionOptions;
};

const entitiesChanged = (prevEntities: Entities, newEntities: Entities) => {
  if (!prevEntities || !newEntities)
    return false;

  if (prevEntities.length !== newEntities.length)
    return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
};

const updateConnectionEntities = async (connection: Connection, entities: Entities) => {
  if (!entitiesChanged(connection.options.entities, entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize)
    await connection.synchronize();
};

export const ensureConnection = async (name = "default") => {
  const connectionManager = getConnectionManager();

  const cfg = AppConfig.get<TypeORMConfig>();
  const options: OptType = {
    default: {
      type: "mariadb",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER || "root",
      logging: process.env.NODE_ENV === "development",
      synchronize: true,
      supportBigNumbers: true,
      bigNumberStrings: false,
      ...(cfg),
    },
  };

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (isDev()) {
      await updateConnectionEntities(connection, options[name].entities);
    }

    return connection;
  }

  return await connectionManager.create({name, ...options[name]}).connect();
};

export const getRepository = async <Entity>(target: ObjectType<Entity> | EntityTarget<Entity> | string): Promise<Repository<Entity>> => {
  const c = await ensureConnection();
  return c.getRepository(target);
};

export const getConnection = _getConnection;

type Entities = Array<Function | string | EntityTarget<unknown>> | undefined;

export type TypeORMConfig = Partial<MysqlConnectionOptions>;

export type Constructor<T = {}> = new (...args: any[]) => T;
export class EndMixin {}

export * from "typeorm";
