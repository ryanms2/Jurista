
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * Usuários do sistema (Master e Cobradores)
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Client
 * Clientes que recebem empréstimos
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model ClientPhoto
 * Fotos do cliente armazenadas no MinIO
 */
export type ClientPhoto = $Result.DefaultSelection<Prisma.$ClientPhotoPayload>
/**
 * Model Loan
 * Empréstimos concedidos a clientes
 */
export type Loan = $Result.DefaultSelection<Prisma.$LoanPayload>
/**
 * Model Installment
 * Parcelas de um empréstimo
 */
export type Installment = $Result.DefaultSelection<Prisma.$InstallmentPayload>
/**
 * Model Payment
 * Pagamentos recebidos
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model CashMovement
 * Movimentações do caixa
 */
export type CashMovement = $Result.DefaultSelection<Prisma.$CashMovementPayload>
/**
 * Model SystemConfig
 * Configurações do sistema (chave-valor)
 */
export type SystemConfig = $Result.DefaultSelection<Prisma.$SystemConfigPayload>
/**
 * Model SyncQueue
 * Fila de sincronização offline (Outbox Pattern)
 */
export type SyncQueue = $Result.DefaultSelection<Prisma.$SyncQueuePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  MASTER: 'MASTER',
  COLLECTOR: 'COLLECTOR'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const LoanFrequency: {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  BIWEEKLY: 'BIWEEKLY',
  MONTHLY: 'MONTHLY'
};

export type LoanFrequency = (typeof LoanFrequency)[keyof typeof LoanFrequency]


export const LoanStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  DEFAULTED: 'DEFAULTED',
  RENEWED: 'RENEWED'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]


export const InstallmentStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  PARTIALLY_PAID: 'PARTIALLY_PAID'
};

export type InstallmentStatus = (typeof InstallmentStatus)[keyof typeof InstallmentStatus]


export const PaymentMethod: {
  PIX: 'PIX',
  CASH: 'CASH'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const CashMovementType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  WITHDRAWAL: 'WITHDRAWAL',
  DEPOSIT: 'DEPOSIT'
};

export type CashMovementType = (typeof CashMovementType)[keyof typeof CashMovementType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type LoanFrequency = $Enums.LoanFrequency

export const LoanFrequency: typeof $Enums.LoanFrequency

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

export type InstallmentStatus = $Enums.InstallmentStatus

export const InstallmentStatus: typeof $Enums.InstallmentStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type CashMovementType = $Enums.CashMovementType

export const CashMovementType: typeof $Enums.CashMovementType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clientPhoto`: Exposes CRUD operations for the **ClientPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClientPhotos
    * const clientPhotos = await prisma.clientPhoto.findMany()
    * ```
    */
  get clientPhoto(): Prisma.ClientPhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loan`: Exposes CRUD operations for the **Loan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Loans
    * const loans = await prisma.loan.findMany()
    * ```
    */
  get loan(): Prisma.LoanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.installment`: Exposes CRUD operations for the **Installment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Installments
    * const installments = await prisma.installment.findMany()
    * ```
    */
  get installment(): Prisma.InstallmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cashMovement`: Exposes CRUD operations for the **CashMovement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CashMovements
    * const cashMovements = await prisma.cashMovement.findMany()
    * ```
    */
  get cashMovement(): Prisma.CashMovementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemConfig`: Exposes CRUD operations for the **SystemConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemConfigs
    * const systemConfigs = await prisma.systemConfig.findMany()
    * ```
    */
  get systemConfig(): Prisma.SystemConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncQueue`: Exposes CRUD operations for the **SyncQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncQueues
    * const syncQueues = await prisma.syncQueue.findMany()
    * ```
    */
  get syncQueue(): Prisma.SyncQueueDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Client: 'Client',
    ClientPhoto: 'ClientPhoto',
    Loan: 'Loan',
    Installment: 'Installment',
    Payment: 'Payment',
    CashMovement: 'CashMovement',
    SystemConfig: 'SystemConfig',
    SyncQueue: 'SyncQueue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "client" | "clientPhoto" | "loan" | "installment" | "payment" | "cashMovement" | "systemConfig" | "syncQueue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      ClientPhoto: {
        payload: Prisma.$ClientPhotoPayload<ExtArgs>
        fields: Prisma.ClientPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>
          }
          findFirst: {
            args: Prisma.ClientPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>
          }
          findMany: {
            args: Prisma.ClientPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>[]
          }
          create: {
            args: Prisma.ClientPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>
          }
          createMany: {
            args: Prisma.ClientPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientPhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>[]
          }
          delete: {
            args: Prisma.ClientPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>
          }
          update: {
            args: Prisma.ClientPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>
          }
          deleteMany: {
            args: Prisma.ClientPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientPhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>[]
          }
          upsert: {
            args: Prisma.ClientPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPhotoPayload>
          }
          aggregate: {
            args: Prisma.ClientPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientPhoto>
          }
          groupBy: {
            args: Prisma.ClientPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<ClientPhotoCountAggregateOutputType> | number
          }
        }
      }
      Loan: {
        payload: Prisma.$LoanPayload<ExtArgs>
        fields: Prisma.LoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findFirst: {
            args: Prisma.LoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findMany: {
            args: Prisma.LoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          create: {
            args: Prisma.LoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          createMany: {
            args: Prisma.LoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          delete: {
            args: Prisma.LoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          update: {
            args: Prisma.LoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          deleteMany: {
            args: Prisma.LoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          upsert: {
            args: Prisma.LoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          aggregate: {
            args: Prisma.LoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoan>
          }
          groupBy: {
            args: Prisma.LoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanCountArgs<ExtArgs>
            result: $Utils.Optional<LoanCountAggregateOutputType> | number
          }
        }
      }
      Installment: {
        payload: Prisma.$InstallmentPayload<ExtArgs>
        fields: Prisma.InstallmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstallmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstallmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          findFirst: {
            args: Prisma.InstallmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstallmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          findMany: {
            args: Prisma.InstallmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>[]
          }
          create: {
            args: Prisma.InstallmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          createMany: {
            args: Prisma.InstallmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstallmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>[]
          }
          delete: {
            args: Prisma.InstallmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          update: {
            args: Prisma.InstallmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          deleteMany: {
            args: Prisma.InstallmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstallmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InstallmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>[]
          }
          upsert: {
            args: Prisma.InstallmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          aggregate: {
            args: Prisma.InstallmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstallment>
          }
          groupBy: {
            args: Prisma.InstallmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstallmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstallmentCountArgs<ExtArgs>
            result: $Utils.Optional<InstallmentCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      CashMovement: {
        payload: Prisma.$CashMovementPayload<ExtArgs>
        fields: Prisma.CashMovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CashMovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CashMovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>
          }
          findFirst: {
            args: Prisma.CashMovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CashMovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>
          }
          findMany: {
            args: Prisma.CashMovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>[]
          }
          create: {
            args: Prisma.CashMovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>
          }
          createMany: {
            args: Prisma.CashMovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CashMovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>[]
          }
          delete: {
            args: Prisma.CashMovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>
          }
          update: {
            args: Prisma.CashMovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>
          }
          deleteMany: {
            args: Prisma.CashMovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CashMovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CashMovementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>[]
          }
          upsert: {
            args: Prisma.CashMovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashMovementPayload>
          }
          aggregate: {
            args: Prisma.CashMovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCashMovement>
          }
          groupBy: {
            args: Prisma.CashMovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<CashMovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.CashMovementCountArgs<ExtArgs>
            result: $Utils.Optional<CashMovementCountAggregateOutputType> | number
          }
        }
      }
      SystemConfig: {
        payload: Prisma.$SystemConfigPayload<ExtArgs>
        fields: Prisma.SystemConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findFirst: {
            args: Prisma.SystemConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findMany: {
            args: Prisma.SystemConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          create: {
            args: Prisma.SystemConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          createMany: {
            args: Prisma.SystemConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          delete: {
            args: Prisma.SystemConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          update: {
            args: Prisma.SystemConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          deleteMany: {
            args: Prisma.SystemConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          upsert: {
            args: Prisma.SystemConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          aggregate: {
            args: Prisma.SystemConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemConfig>
          }
          groupBy: {
            args: Prisma.SystemConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigCountAggregateOutputType> | number
          }
        }
      }
      SyncQueue: {
        payload: Prisma.$SyncQueuePayload<ExtArgs>
        fields: Prisma.SyncQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          findFirst: {
            args: Prisma.SyncQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          findMany: {
            args: Prisma.SyncQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          create: {
            args: Prisma.SyncQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          createMany: {
            args: Prisma.SyncQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          delete: {
            args: Prisma.SyncQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          update: {
            args: Prisma.SyncQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          deleteMany: {
            args: Prisma.SyncQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncQueueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          upsert: {
            args: Prisma.SyncQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          aggregate: {
            args: Prisma.SyncQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncQueue>
          }
          groupBy: {
            args: Prisma.SyncQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncQueueCountArgs<ExtArgs>
            result: $Utils.Optional<SyncQueueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    client?: ClientOmit
    clientPhoto?: ClientPhotoOmit
    loan?: LoanOmit
    installment?: InstallmentOmit
    payment?: PaymentOmit
    cashMovement?: CashMovementOmit
    systemConfig?: SystemConfigOmit
    syncQueue?: SyncQueueOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    loans: number
    payments: number
    cashMovements: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | UserCountOutputTypeCountLoansArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    cashMovements?: boolean | UserCountOutputTypeCountCashMovementsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCashMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashMovementWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    photos: number
    loans: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photos?: boolean | ClientCountOutputTypeCountPhotosArgs
    loans?: boolean | ClientCountOutputTypeCountLoansArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientPhotoWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }


  /**
   * Count Type LoanCountOutputType
   */

  export type LoanCountOutputType = {
    installments: number
  }

  export type LoanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installments?: boolean | LoanCountOutputTypeCountInstallmentsArgs
  }

  // Custom InputTypes
  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanCountOutputType
     */
    select?: LoanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeCountInstallmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentWhereInput
  }


  /**
   * Count Type InstallmentCountOutputType
   */

  export type InstallmentCountOutputType = {
    payments: number
  }

  export type InstallmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | InstallmentCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * InstallmentCountOutputType without action
   */
  export type InstallmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentCountOutputType
     */
    select?: InstallmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstallmentCountOutputType without action
   */
  export type InstallmentCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    commissionPct: Decimal | null
  }

  export type UserSumAggregateOutputType = {
    commissionPct: Decimal | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    phone: string | null
    active: boolean | null
    commissionPct: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    phone: string | null
    active: boolean | null
    commissionPct: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    phone: number
    active: number
    commissionPct: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    commissionPct?: true
  }

  export type UserSumAggregateInputType = {
    commissionPct?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    phone?: true
    active?: true
    commissionPct?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    phone?: true
    active?: true
    commissionPct?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    phone?: true
    active?: true
    commissionPct?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone: string | null
    active: boolean
    commissionPct: Decimal | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    phone?: boolean
    active?: boolean
    commissionPct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loans?: boolean | User$loansArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    cashMovements?: boolean | User$cashMovementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    phone?: boolean
    active?: boolean
    commissionPct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    phone?: boolean
    active?: boolean
    commissionPct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    phone?: boolean
    active?: boolean
    commissionPct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "phone" | "active" | "commissionPct" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | User$loansArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    cashMovements?: boolean | User$cashMovementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      loans: Prisma.$LoanPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      cashMovements: Prisma.$CashMovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      /**
       * Argon2id hash
       */
      passwordHash: string
      role: $Enums.UserRole
      phone: string | null
      active: boolean
      /**
       * % comissão padrão do cobrador
       */
      commissionPct: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loans<T extends User$loansArgs<ExtArgs> = {}>(args?: Subset<T, User$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cashMovements<T extends User$cashMovementsArgs<ExtArgs> = {}>(args?: Subset<T, User$cashMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly phone: FieldRef<"User", 'String'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly commissionPct: FieldRef<"User", 'Decimal'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.loans
   */
  export type User$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.cashMovements
   */
  export type User$cashMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    where?: CashMovementWhereInput
    orderBy?: CashMovementOrderByWithRelationInput | CashMovementOrderByWithRelationInput[]
    cursor?: CashMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CashMovementScalarFieldEnum | CashMovementScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientAvgAggregateOutputType = {
    creditScore: number | null
  }

  export type ClientSumAggregateOutputType = {
    creditScore: number | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    name: string | null
    cpf: string | null
    rg: string | null
    address: string | null
    phone1: string | null
    phone2: string | null
    creditScore: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    cpf: string | null
    rg: string | null
    address: string | null
    phone1: string | null
    phone2: string | null
    creditScore: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    cpf: number
    rg: number
    address: number
    phone1: number
    phone2: number
    creditScore: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientAvgAggregateInputType = {
    creditScore?: true
  }

  export type ClientSumAggregateInputType = {
    creditScore?: true
  }

  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    cpf?: true
    rg?: true
    address?: true
    phone1?: true
    phone2?: true
    creditScore?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    cpf?: true
    rg?: true
    address?: true
    phone1?: true
    phone2?: true
    creditScore?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    cpf?: true
    rg?: true
    address?: true
    phone1?: true
    phone2?: true
    creditScore?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _avg?: ClientAvgAggregateInputType
    _sum?: ClientSumAggregateInputType
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2: string | null
    creditScore: number
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    cpf?: boolean
    rg?: boolean
    address?: boolean
    phone1?: boolean
    phone2?: boolean
    creditScore?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    photos?: boolean | Client$photosArgs<ExtArgs>
    loans?: boolean | Client$loansArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    cpf?: boolean
    rg?: boolean
    address?: boolean
    phone1?: boolean
    phone2?: boolean
    creditScore?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    cpf?: boolean
    rg?: boolean
    address?: boolean
    phone1?: boolean
    phone2?: boolean
    creditScore?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    cpf?: boolean
    rg?: boolean
    address?: boolean
    phone1?: boolean
    phone2?: boolean
    creditScore?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "cpf" | "rg" | "address" | "phone1" | "phone2" | "creditScore" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photos?: boolean | Client$photosArgs<ExtArgs>
    loans?: boolean | Client$loansArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      photos: Prisma.$ClientPhotoPayload<ExtArgs>[]
      loans: Prisma.$LoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      cpf: string
      rg: string
      address: string
      phone1: string
      phone2: string | null
      /**
       * Pontuação interna (0-100)
       */
      creditScore: number
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    photos<T extends Client$photosArgs<ExtArgs> = {}>(args?: Subset<T, Client$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    loans<T extends Client$loansArgs<ExtArgs> = {}>(args?: Subset<T, Client$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly cpf: FieldRef<"Client", 'String'>
    readonly rg: FieldRef<"Client", 'String'>
    readonly address: FieldRef<"Client", 'String'>
    readonly phone1: FieldRef<"Client", 'String'>
    readonly phone2: FieldRef<"Client", 'String'>
    readonly creditScore: FieldRef<"Client", 'Int'>
    readonly active: FieldRef<"Client", 'Boolean'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.photos
   */
  export type Client$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    where?: ClientPhotoWhereInput
    orderBy?: ClientPhotoOrderByWithRelationInput | ClientPhotoOrderByWithRelationInput[]
    cursor?: ClientPhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientPhotoScalarFieldEnum | ClientPhotoScalarFieldEnum[]
  }

  /**
   * Client.loans
   */
  export type Client$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model ClientPhoto
   */

  export type AggregateClientPhoto = {
    _count: ClientPhotoCountAggregateOutputType | null
    _avg: ClientPhotoAvgAggregateOutputType | null
    _sum: ClientPhotoSumAggregateOutputType | null
    _min: ClientPhotoMinAggregateOutputType | null
    _max: ClientPhotoMaxAggregateOutputType | null
  }

  export type ClientPhotoAvgAggregateOutputType = {
    sizeBytes: number | null
  }

  export type ClientPhotoSumAggregateOutputType = {
    sizeBytes: number | null
  }

  export type ClientPhotoMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    bucket: string | null
    objectKey: string | null
    originalName: string | null
    type: string | null
    description: string | null
    sizeBytes: number | null
    mimeType: string | null
    createdAt: Date | null
  }

  export type ClientPhotoMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    bucket: string | null
    objectKey: string | null
    originalName: string | null
    type: string | null
    description: string | null
    sizeBytes: number | null
    mimeType: string | null
    createdAt: Date | null
  }

  export type ClientPhotoCountAggregateOutputType = {
    id: number
    clientId: number
    bucket: number
    objectKey: number
    originalName: number
    type: number
    description: number
    sizeBytes: number
    mimeType: number
    createdAt: number
    _all: number
  }


  export type ClientPhotoAvgAggregateInputType = {
    sizeBytes?: true
  }

  export type ClientPhotoSumAggregateInputType = {
    sizeBytes?: true
  }

  export type ClientPhotoMinAggregateInputType = {
    id?: true
    clientId?: true
    bucket?: true
    objectKey?: true
    originalName?: true
    type?: true
    description?: true
    sizeBytes?: true
    mimeType?: true
    createdAt?: true
  }

  export type ClientPhotoMaxAggregateInputType = {
    id?: true
    clientId?: true
    bucket?: true
    objectKey?: true
    originalName?: true
    type?: true
    description?: true
    sizeBytes?: true
    mimeType?: true
    createdAt?: true
  }

  export type ClientPhotoCountAggregateInputType = {
    id?: true
    clientId?: true
    bucket?: true
    objectKey?: true
    originalName?: true
    type?: true
    description?: true
    sizeBytes?: true
    mimeType?: true
    createdAt?: true
    _all?: true
  }

  export type ClientPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientPhoto to aggregate.
     */
    where?: ClientPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientPhotos to fetch.
     */
    orderBy?: ClientPhotoOrderByWithRelationInput | ClientPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClientPhotos
    **/
    _count?: true | ClientPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientPhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientPhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientPhotoMaxAggregateInputType
  }

  export type GetClientPhotoAggregateType<T extends ClientPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateClientPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientPhoto[P]>
      : GetScalarType<T[P], AggregateClientPhoto[P]>
  }




  export type ClientPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientPhotoWhereInput
    orderBy?: ClientPhotoOrderByWithAggregationInput | ClientPhotoOrderByWithAggregationInput[]
    by: ClientPhotoScalarFieldEnum[] | ClientPhotoScalarFieldEnum
    having?: ClientPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientPhotoCountAggregateInputType | true
    _avg?: ClientPhotoAvgAggregateInputType
    _sum?: ClientPhotoSumAggregateInputType
    _min?: ClientPhotoMinAggregateInputType
    _max?: ClientPhotoMaxAggregateInputType
  }

  export type ClientPhotoGroupByOutputType = {
    id: string
    clientId: string
    bucket: string
    objectKey: string
    originalName: string
    type: string
    description: string | null
    sizeBytes: number | null
    mimeType: string | null
    createdAt: Date
    _count: ClientPhotoCountAggregateOutputType | null
    _avg: ClientPhotoAvgAggregateOutputType | null
    _sum: ClientPhotoSumAggregateOutputType | null
    _min: ClientPhotoMinAggregateOutputType | null
    _max: ClientPhotoMaxAggregateOutputType | null
  }

  type GetClientPhotoGroupByPayload<T extends ClientPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], ClientPhotoGroupByOutputType[P]>
        }
      >
    >


  export type ClientPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    bucket?: boolean
    objectKey?: boolean
    originalName?: boolean
    type?: boolean
    description?: boolean
    sizeBytes?: boolean
    mimeType?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientPhoto"]>

  export type ClientPhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    bucket?: boolean
    objectKey?: boolean
    originalName?: boolean
    type?: boolean
    description?: boolean
    sizeBytes?: boolean
    mimeType?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientPhoto"]>

  export type ClientPhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    bucket?: boolean
    objectKey?: boolean
    originalName?: boolean
    type?: boolean
    description?: boolean
    sizeBytes?: boolean
    mimeType?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientPhoto"]>

  export type ClientPhotoSelectScalar = {
    id?: boolean
    clientId?: boolean
    bucket?: boolean
    objectKey?: boolean
    originalName?: boolean
    type?: boolean
    description?: boolean
    sizeBytes?: boolean
    mimeType?: boolean
    createdAt?: boolean
  }

  export type ClientPhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "bucket" | "objectKey" | "originalName" | "type" | "description" | "sizeBytes" | "mimeType" | "createdAt", ExtArgs["result"]["clientPhoto"]>
  export type ClientPhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ClientPhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ClientPhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $ClientPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClientPhoto"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      bucket: string
      /**
       * MinIO object key: {clientId}/{uuid}.{ext}
       */
      objectKey: string
      /**
       * Nome original do arquivo
       */
      originalName: string
      /**
       * "rg" | "selfie" | "facade" | "other"
       */
      type: string
      description: string | null
      sizeBytes: number | null
      mimeType: string | null
      createdAt: Date
    }, ExtArgs["result"]["clientPhoto"]>
    composites: {}
  }

  type ClientPhotoGetPayload<S extends boolean | null | undefined | ClientPhotoDefaultArgs> = $Result.GetResult<Prisma.$ClientPhotoPayload, S>

  type ClientPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientPhotoCountAggregateInputType | true
    }

  export interface ClientPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClientPhoto'], meta: { name: 'ClientPhoto' } }
    /**
     * Find zero or one ClientPhoto that matches the filter.
     * @param {ClientPhotoFindUniqueArgs} args - Arguments to find a ClientPhoto
     * @example
     * // Get one ClientPhoto
     * const clientPhoto = await prisma.clientPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientPhotoFindUniqueArgs>(args: SelectSubset<T, ClientPhotoFindUniqueArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClientPhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientPhotoFindUniqueOrThrowArgs} args - Arguments to find a ClientPhoto
     * @example
     * // Get one ClientPhoto
     * const clientPhoto = await prisma.clientPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientPhotoFindFirstArgs} args - Arguments to find a ClientPhoto
     * @example
     * // Get one ClientPhoto
     * const clientPhoto = await prisma.clientPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientPhotoFindFirstArgs>(args?: SelectSubset<T, ClientPhotoFindFirstArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientPhotoFindFirstOrThrowArgs} args - Arguments to find a ClientPhoto
     * @example
     * // Get one ClientPhoto
     * const clientPhoto = await prisma.clientPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClientPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClientPhotos
     * const clientPhotos = await prisma.clientPhoto.findMany()
     * 
     * // Get first 10 ClientPhotos
     * const clientPhotos = await prisma.clientPhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientPhotoWithIdOnly = await prisma.clientPhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientPhotoFindManyArgs>(args?: SelectSubset<T, ClientPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClientPhoto.
     * @param {ClientPhotoCreateArgs} args - Arguments to create a ClientPhoto.
     * @example
     * // Create one ClientPhoto
     * const ClientPhoto = await prisma.clientPhoto.create({
     *   data: {
     *     // ... data to create a ClientPhoto
     *   }
     * })
     * 
     */
    create<T extends ClientPhotoCreateArgs>(args: SelectSubset<T, ClientPhotoCreateArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClientPhotos.
     * @param {ClientPhotoCreateManyArgs} args - Arguments to create many ClientPhotos.
     * @example
     * // Create many ClientPhotos
     * const clientPhoto = await prisma.clientPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientPhotoCreateManyArgs>(args?: SelectSubset<T, ClientPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClientPhotos and returns the data saved in the database.
     * @param {ClientPhotoCreateManyAndReturnArgs} args - Arguments to create many ClientPhotos.
     * @example
     * // Create many ClientPhotos
     * const clientPhoto = await prisma.clientPhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClientPhotos and only return the `id`
     * const clientPhotoWithIdOnly = await prisma.clientPhoto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientPhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClientPhoto.
     * @param {ClientPhotoDeleteArgs} args - Arguments to delete one ClientPhoto.
     * @example
     * // Delete one ClientPhoto
     * const ClientPhoto = await prisma.clientPhoto.delete({
     *   where: {
     *     // ... filter to delete one ClientPhoto
     *   }
     * })
     * 
     */
    delete<T extends ClientPhotoDeleteArgs>(args: SelectSubset<T, ClientPhotoDeleteArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClientPhoto.
     * @param {ClientPhotoUpdateArgs} args - Arguments to update one ClientPhoto.
     * @example
     * // Update one ClientPhoto
     * const clientPhoto = await prisma.clientPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientPhotoUpdateArgs>(args: SelectSubset<T, ClientPhotoUpdateArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClientPhotos.
     * @param {ClientPhotoDeleteManyArgs} args - Arguments to filter ClientPhotos to delete.
     * @example
     * // Delete a few ClientPhotos
     * const { count } = await prisma.clientPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientPhotoDeleteManyArgs>(args?: SelectSubset<T, ClientPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClientPhotos
     * const clientPhoto = await prisma.clientPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientPhotoUpdateManyArgs>(args: SelectSubset<T, ClientPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientPhotos and returns the data updated in the database.
     * @param {ClientPhotoUpdateManyAndReturnArgs} args - Arguments to update many ClientPhotos.
     * @example
     * // Update many ClientPhotos
     * const clientPhoto = await prisma.clientPhoto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClientPhotos and only return the `id`
     * const clientPhotoWithIdOnly = await prisma.clientPhoto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientPhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClientPhoto.
     * @param {ClientPhotoUpsertArgs} args - Arguments to update or create a ClientPhoto.
     * @example
     * // Update or create a ClientPhoto
     * const clientPhoto = await prisma.clientPhoto.upsert({
     *   create: {
     *     // ... data to create a ClientPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClientPhoto we want to update
     *   }
     * })
     */
    upsert<T extends ClientPhotoUpsertArgs>(args: SelectSubset<T, ClientPhotoUpsertArgs<ExtArgs>>): Prisma__ClientPhotoClient<$Result.GetResult<Prisma.$ClientPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClientPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientPhotoCountArgs} args - Arguments to filter ClientPhotos to count.
     * @example
     * // Count the number of ClientPhotos
     * const count = await prisma.clientPhoto.count({
     *   where: {
     *     // ... the filter for the ClientPhotos we want to count
     *   }
     * })
    **/
    count<T extends ClientPhotoCountArgs>(
      args?: Subset<T, ClientPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClientPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientPhotoAggregateArgs>(args: Subset<T, ClientPhotoAggregateArgs>): Prisma.PrismaPromise<GetClientPhotoAggregateType<T>>

    /**
     * Group by ClientPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientPhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientPhotoGroupByArgs['orderBy'] }
        : { orderBy?: ClientPhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClientPhoto model
   */
  readonly fields: ClientPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClientPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClientPhoto model
   */
  interface ClientPhotoFieldRefs {
    readonly id: FieldRef<"ClientPhoto", 'String'>
    readonly clientId: FieldRef<"ClientPhoto", 'String'>
    readonly bucket: FieldRef<"ClientPhoto", 'String'>
    readonly objectKey: FieldRef<"ClientPhoto", 'String'>
    readonly originalName: FieldRef<"ClientPhoto", 'String'>
    readonly type: FieldRef<"ClientPhoto", 'String'>
    readonly description: FieldRef<"ClientPhoto", 'String'>
    readonly sizeBytes: FieldRef<"ClientPhoto", 'Int'>
    readonly mimeType: FieldRef<"ClientPhoto", 'String'>
    readonly createdAt: FieldRef<"ClientPhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClientPhoto findUnique
   */
  export type ClientPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ClientPhoto to fetch.
     */
    where: ClientPhotoWhereUniqueInput
  }

  /**
   * ClientPhoto findUniqueOrThrow
   */
  export type ClientPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ClientPhoto to fetch.
     */
    where: ClientPhotoWhereUniqueInput
  }

  /**
   * ClientPhoto findFirst
   */
  export type ClientPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ClientPhoto to fetch.
     */
    where?: ClientPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientPhotos to fetch.
     */
    orderBy?: ClientPhotoOrderByWithRelationInput | ClientPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientPhotos.
     */
    cursor?: ClientPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientPhotos.
     */
    distinct?: ClientPhotoScalarFieldEnum | ClientPhotoScalarFieldEnum[]
  }

  /**
   * ClientPhoto findFirstOrThrow
   */
  export type ClientPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ClientPhoto to fetch.
     */
    where?: ClientPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientPhotos to fetch.
     */
    orderBy?: ClientPhotoOrderByWithRelationInput | ClientPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientPhotos.
     */
    cursor?: ClientPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientPhotos.
     */
    distinct?: ClientPhotoScalarFieldEnum | ClientPhotoScalarFieldEnum[]
  }

  /**
   * ClientPhoto findMany
   */
  export type ClientPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ClientPhotos to fetch.
     */
    where?: ClientPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientPhotos to fetch.
     */
    orderBy?: ClientPhotoOrderByWithRelationInput | ClientPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClientPhotos.
     */
    cursor?: ClientPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientPhotos.
     */
    skip?: number
    distinct?: ClientPhotoScalarFieldEnum | ClientPhotoScalarFieldEnum[]
  }

  /**
   * ClientPhoto create
   */
  export type ClientPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a ClientPhoto.
     */
    data: XOR<ClientPhotoCreateInput, ClientPhotoUncheckedCreateInput>
  }

  /**
   * ClientPhoto createMany
   */
  export type ClientPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClientPhotos.
     */
    data: ClientPhotoCreateManyInput | ClientPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClientPhoto createManyAndReturn
   */
  export type ClientPhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * The data used to create many ClientPhotos.
     */
    data: ClientPhotoCreateManyInput | ClientPhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClientPhoto update
   */
  export type ClientPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a ClientPhoto.
     */
    data: XOR<ClientPhotoUpdateInput, ClientPhotoUncheckedUpdateInput>
    /**
     * Choose, which ClientPhoto to update.
     */
    where: ClientPhotoWhereUniqueInput
  }

  /**
   * ClientPhoto updateMany
   */
  export type ClientPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClientPhotos.
     */
    data: XOR<ClientPhotoUpdateManyMutationInput, ClientPhotoUncheckedUpdateManyInput>
    /**
     * Filter which ClientPhotos to update
     */
    where?: ClientPhotoWhereInput
    /**
     * Limit how many ClientPhotos to update.
     */
    limit?: number
  }

  /**
   * ClientPhoto updateManyAndReturn
   */
  export type ClientPhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * The data used to update ClientPhotos.
     */
    data: XOR<ClientPhotoUpdateManyMutationInput, ClientPhotoUncheckedUpdateManyInput>
    /**
     * Filter which ClientPhotos to update
     */
    where?: ClientPhotoWhereInput
    /**
     * Limit how many ClientPhotos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClientPhoto upsert
   */
  export type ClientPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the ClientPhoto to update in case it exists.
     */
    where: ClientPhotoWhereUniqueInput
    /**
     * In case the ClientPhoto found by the `where` argument doesn't exist, create a new ClientPhoto with this data.
     */
    create: XOR<ClientPhotoCreateInput, ClientPhotoUncheckedCreateInput>
    /**
     * In case the ClientPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientPhotoUpdateInput, ClientPhotoUncheckedUpdateInput>
  }

  /**
   * ClientPhoto delete
   */
  export type ClientPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
    /**
     * Filter which ClientPhoto to delete.
     */
    where: ClientPhotoWhereUniqueInput
  }

  /**
   * ClientPhoto deleteMany
   */
  export type ClientPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientPhotos to delete
     */
    where?: ClientPhotoWhereInput
    /**
     * Limit how many ClientPhotos to delete.
     */
    limit?: number
  }

  /**
   * ClientPhoto without action
   */
  export type ClientPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientPhoto
     */
    select?: ClientPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientPhoto
     */
    omit?: ClientPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientPhotoInclude<ExtArgs> | null
  }


  /**
   * Model Loan
   */

  export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  export type LoanAvgAggregateOutputType = {
    amount: Decimal | null
    interestRate: Decimal | null
    totalWithInterest: Decimal | null
    totalInstallments: number | null
    installmentAmount: Decimal | null
    commissionPct: Decimal | null
    commissionAmount: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeDays: number | null
  }

  export type LoanSumAggregateOutputType = {
    amount: Decimal | null
    interestRate: Decimal | null
    totalWithInterest: Decimal | null
    totalInstallments: number | null
    installmentAmount: Decimal | null
    commissionPct: Decimal | null
    commissionAmount: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeDays: number | null
  }

  export type LoanMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    collectorId: string | null
    amount: Decimal | null
    interestRate: Decimal | null
    totalWithInterest: Decimal | null
    frequency: $Enums.LoanFrequency | null
    totalInstallments: number | null
    installmentAmount: Decimal | null
    status: $Enums.LoanStatus | null
    commissionPct: Decimal | null
    commissionAmount: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeDays: number | null
    startDate: Date | null
    endDate: Date | null
    previousLoanId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    collectorId: string | null
    amount: Decimal | null
    interestRate: Decimal | null
    totalWithInterest: Decimal | null
    frequency: $Enums.LoanFrequency | null
    totalInstallments: number | null
    installmentAmount: Decimal | null
    status: $Enums.LoanStatus | null
    commissionPct: Decimal | null
    commissionAmount: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeDays: number | null
    startDate: Date | null
    endDate: Date | null
    previousLoanId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanCountAggregateOutputType = {
    id: number
    clientId: number
    collectorId: number
    amount: number
    interestRate: number
    totalWithInterest: number
    frequency: number
    totalInstallments: number
    installmentAmount: number
    status: number
    commissionPct: number
    commissionAmount: number
    lateFeeAmount: number
    lateFeeDays: number
    startDate: number
    endDate: number
    previousLoanId: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoanAvgAggregateInputType = {
    amount?: true
    interestRate?: true
    totalWithInterest?: true
    totalInstallments?: true
    installmentAmount?: true
    commissionPct?: true
    commissionAmount?: true
    lateFeeAmount?: true
    lateFeeDays?: true
  }

  export type LoanSumAggregateInputType = {
    amount?: true
    interestRate?: true
    totalWithInterest?: true
    totalInstallments?: true
    installmentAmount?: true
    commissionPct?: true
    commissionAmount?: true
    lateFeeAmount?: true
    lateFeeDays?: true
  }

  export type LoanMinAggregateInputType = {
    id?: true
    clientId?: true
    collectorId?: true
    amount?: true
    interestRate?: true
    totalWithInterest?: true
    frequency?: true
    totalInstallments?: true
    installmentAmount?: true
    status?: true
    commissionPct?: true
    commissionAmount?: true
    lateFeeAmount?: true
    lateFeeDays?: true
    startDate?: true
    endDate?: true
    previousLoanId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanMaxAggregateInputType = {
    id?: true
    clientId?: true
    collectorId?: true
    amount?: true
    interestRate?: true
    totalWithInterest?: true
    frequency?: true
    totalInstallments?: true
    installmentAmount?: true
    status?: true
    commissionPct?: true
    commissionAmount?: true
    lateFeeAmount?: true
    lateFeeDays?: true
    startDate?: true
    endDate?: true
    previousLoanId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanCountAggregateInputType = {
    id?: true
    clientId?: true
    collectorId?: true
    amount?: true
    interestRate?: true
    totalWithInterest?: true
    frequency?: true
    totalInstallments?: true
    installmentAmount?: true
    status?: true
    commissionPct?: true
    commissionAmount?: true
    lateFeeAmount?: true
    lateFeeDays?: true
    startDate?: true
    endDate?: true
    previousLoanId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType
  }

  export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
        [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoan[P]>
      : GetScalarType<T[P], AggregateLoan[P]>
  }




  export type LoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithAggregationInput | LoanOrderByWithAggregationInput[]
    by: LoanScalarFieldEnum[] | LoanScalarFieldEnum
    having?: LoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanCountAggregateInputType | true
    _avg?: LoanAvgAggregateInputType
    _sum?: LoanSumAggregateInputType
    _min?: LoanMinAggregateInputType
    _max?: LoanMaxAggregateInputType
  }

  export type LoanGroupByOutputType = {
    id: string
    clientId: string
    collectorId: string
    amount: Decimal
    interestRate: Decimal
    totalWithInterest: Decimal
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal
    status: $Enums.LoanStatus
    commissionPct: Decimal
    commissionAmount: Decimal
    lateFeeAmount: Decimal
    lateFeeDays: number
    startDate: Date
    endDate: Date | null
    previousLoanId: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanGroupByOutputType[P]>
            : GetScalarType<T[P], LoanGroupByOutputType[P]>
        }
      >
    >


  export type LoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    collectorId?: boolean
    amount?: boolean
    interestRate?: boolean
    totalWithInterest?: boolean
    frequency?: boolean
    totalInstallments?: boolean
    installmentAmount?: boolean
    status?: boolean
    commissionPct?: boolean
    commissionAmount?: boolean
    lateFeeAmount?: boolean
    lateFeeDays?: boolean
    startDate?: boolean
    endDate?: boolean
    previousLoanId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    installments?: boolean | Loan$installmentsArgs<ExtArgs>
    previousLoan?: boolean | Loan$previousLoanArgs<ExtArgs>
    renewedLoan?: boolean | Loan$renewedLoanArgs<ExtArgs>
    _count?: boolean | LoanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    collectorId?: boolean
    amount?: boolean
    interestRate?: boolean
    totalWithInterest?: boolean
    frequency?: boolean
    totalInstallments?: boolean
    installmentAmount?: boolean
    status?: boolean
    commissionPct?: boolean
    commissionAmount?: boolean
    lateFeeAmount?: boolean
    lateFeeDays?: boolean
    startDate?: boolean
    endDate?: boolean
    previousLoanId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    previousLoan?: boolean | Loan$previousLoanArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    collectorId?: boolean
    amount?: boolean
    interestRate?: boolean
    totalWithInterest?: boolean
    frequency?: boolean
    totalInstallments?: boolean
    installmentAmount?: boolean
    status?: boolean
    commissionPct?: boolean
    commissionAmount?: boolean
    lateFeeAmount?: boolean
    lateFeeDays?: boolean
    startDate?: boolean
    endDate?: boolean
    previousLoanId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    previousLoan?: boolean | Loan$previousLoanArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectScalar = {
    id?: boolean
    clientId?: boolean
    collectorId?: boolean
    amount?: boolean
    interestRate?: boolean
    totalWithInterest?: boolean
    frequency?: boolean
    totalInstallments?: boolean
    installmentAmount?: boolean
    status?: boolean
    commissionPct?: boolean
    commissionAmount?: boolean
    lateFeeAmount?: boolean
    lateFeeDays?: boolean
    startDate?: boolean
    endDate?: boolean
    previousLoanId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "collectorId" | "amount" | "interestRate" | "totalWithInterest" | "frequency" | "totalInstallments" | "installmentAmount" | "status" | "commissionPct" | "commissionAmount" | "lateFeeAmount" | "lateFeeDays" | "startDate" | "endDate" | "previousLoanId" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["loan"]>
  export type LoanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    installments?: boolean | Loan$installmentsArgs<ExtArgs>
    previousLoan?: boolean | Loan$previousLoanArgs<ExtArgs>
    renewedLoan?: boolean | Loan$renewedLoanArgs<ExtArgs>
    _count?: boolean | LoanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    previousLoan?: boolean | Loan$previousLoanArgs<ExtArgs>
  }
  export type LoanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    previousLoan?: boolean | Loan$previousLoanArgs<ExtArgs>
  }

  export type $LoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Loan"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      collector: Prisma.$UserPayload<ExtArgs>
      installments: Prisma.$InstallmentPayload<ExtArgs>[]
      previousLoan: Prisma.$LoanPayload<ExtArgs> | null
      renewedLoan: Prisma.$LoanPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      /**
       * Cobrador responsável
       */
      collectorId: string
      /**
       * Valor emprestado
       */
      amount: Prisma.Decimal
      /**
       * Taxa de juros (%)
       */
      interestRate: Prisma.Decimal
      /**
       * Valor + juros
       */
      totalWithInterest: Prisma.Decimal
      frequency: $Enums.LoanFrequency
      /**
       * Nº total de parcelas
       */
      totalInstallments: number
      /**
       * Valor de cada parcela
       */
      installmentAmount: Prisma.Decimal
      status: $Enums.LoanStatus
      /**
       * % comissão cobrador
       */
      commissionPct: Prisma.Decimal
      /**
       * Valor total da comissão
       */
      commissionAmount: Prisma.Decimal
      /**
       * R$ multa por intervalo
       */
      lateFeeAmount: Prisma.Decimal
      /**
       * A cada X dias de atraso
       */
      lateFeeDays: number
      startDate: Date
      endDate: Date | null
      /**
       * Referência para renovação
       */
      previousLoanId: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loan"]>
    composites: {}
  }

  type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = $Result.GetResult<Prisma.$LoanPayload, S>

  type LoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanCountAggregateInputType | true
    }

  export interface LoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Loan'], meta: { name: 'Loan' } }
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     * 
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanFindManyArgs>(args?: SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     * 
     */
    create<T extends LoanCreateArgs>(args: SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanCreateManyArgs>(args?: SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     * 
     */
    delete<T extends LoanDeleteArgs>(args: SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanUpdateArgs>(args: SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanUpdateManyArgs>(args: SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans and returns the data updated in the database.
     * @param {LoanUpdateManyAndReturnArgs} args - Arguments to update many Loans.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(
      args?: Subset<T, LoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanAggregateArgs>(args: Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>

    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanGroupByArgs['orderBy'] }
        : { orderBy?: LoanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Loan model
   */
  readonly fields: LoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Loan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    collector<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    installments<T extends Loan$installmentsArgs<ExtArgs> = {}>(args?: Subset<T, Loan$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    previousLoan<T extends Loan$previousLoanArgs<ExtArgs> = {}>(args?: Subset<T, Loan$previousLoanArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    renewedLoan<T extends Loan$renewedLoanArgs<ExtArgs> = {}>(args?: Subset<T, Loan$renewedLoanArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Loan model
   */
  interface LoanFieldRefs {
    readonly id: FieldRef<"Loan", 'String'>
    readonly clientId: FieldRef<"Loan", 'String'>
    readonly collectorId: FieldRef<"Loan", 'String'>
    readonly amount: FieldRef<"Loan", 'Decimal'>
    readonly interestRate: FieldRef<"Loan", 'Decimal'>
    readonly totalWithInterest: FieldRef<"Loan", 'Decimal'>
    readonly frequency: FieldRef<"Loan", 'LoanFrequency'>
    readonly totalInstallments: FieldRef<"Loan", 'Int'>
    readonly installmentAmount: FieldRef<"Loan", 'Decimal'>
    readonly status: FieldRef<"Loan", 'LoanStatus'>
    readonly commissionPct: FieldRef<"Loan", 'Decimal'>
    readonly commissionAmount: FieldRef<"Loan", 'Decimal'>
    readonly lateFeeAmount: FieldRef<"Loan", 'Decimal'>
    readonly lateFeeDays: FieldRef<"Loan", 'Int'>
    readonly startDate: FieldRef<"Loan", 'DateTime'>
    readonly endDate: FieldRef<"Loan", 'DateTime'>
    readonly previousLoanId: FieldRef<"Loan", 'String'>
    readonly notes: FieldRef<"Loan", 'String'>
    readonly createdAt: FieldRef<"Loan", 'DateTime'>
    readonly updatedAt: FieldRef<"Loan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Loan findUnique
   */
  export type LoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findUniqueOrThrow
   */
  export type LoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findFirst
   */
  export type LoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findFirstOrThrow
   */
  export type LoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findMany
   */
  export type LoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loans to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan create
   */
  export type LoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to create a Loan.
     */
    data: XOR<LoanCreateInput, LoanUncheckedCreateInput>
  }

  /**
   * Loan createMany
   */
  export type LoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Loan createManyAndReturn
   */
  export type LoanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan update
   */
  export type LoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to update a Loan.
     */
    data: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
    /**
     * Choose, which Loan to update.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan updateMany
   */
  export type LoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
  }

  /**
   * Loan updateManyAndReturn
   */
  export type LoanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan upsert
   */
  export type LoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: LoanWhereUniqueInput
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: XOR<LoanCreateInput, LoanUncheckedCreateInput>
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
  }

  /**
   * Loan delete
   */
  export type LoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter which Loan to delete.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan deleteMany
   */
  export type LoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to delete.
     */
    limit?: number
  }

  /**
   * Loan.installments
   */
  export type Loan$installmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    where?: InstallmentWhereInput
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    cursor?: InstallmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Loan.previousLoan
   */
  export type Loan$previousLoanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
  }

  /**
   * Loan.renewedLoan
   */
  export type Loan$renewedLoanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
  }

  /**
   * Loan without action
   */
  export type LoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
  }


  /**
   * Model Installment
   */

  export type AggregateInstallment = {
    _count: InstallmentCountAggregateOutputType | null
    _avg: InstallmentAvgAggregateOutputType | null
    _sum: InstallmentSumAggregateOutputType | null
    _min: InstallmentMinAggregateOutputType | null
    _max: InstallmentMaxAggregateOutputType | null
  }

  export type InstallmentAvgAggregateOutputType = {
    installmentNo: number | null
    amount: Decimal | null
    lateFee: Decimal | null
    totalDue: Decimal | null
    paidAmount: Decimal | null
    daysOverdue: number | null
  }

  export type InstallmentSumAggregateOutputType = {
    installmentNo: number | null
    amount: Decimal | null
    lateFee: Decimal | null
    totalDue: Decimal | null
    paidAmount: Decimal | null
    daysOverdue: number | null
  }

  export type InstallmentMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    installmentNo: number | null
    amount: Decimal | null
    lateFee: Decimal | null
    totalDue: Decimal | null
    dueDate: Date | null
    status: $Enums.InstallmentStatus | null
    paidAmount: Decimal | null
    paidAt: Date | null
    daysOverdue: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstallmentMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    installmentNo: number | null
    amount: Decimal | null
    lateFee: Decimal | null
    totalDue: Decimal | null
    dueDate: Date | null
    status: $Enums.InstallmentStatus | null
    paidAmount: Decimal | null
    paidAt: Date | null
    daysOverdue: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstallmentCountAggregateOutputType = {
    id: number
    loanId: number
    installmentNo: number
    amount: number
    lateFee: number
    totalDue: number
    dueDate: number
    status: number
    paidAmount: number
    paidAt: number
    daysOverdue: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InstallmentAvgAggregateInputType = {
    installmentNo?: true
    amount?: true
    lateFee?: true
    totalDue?: true
    paidAmount?: true
    daysOverdue?: true
  }

  export type InstallmentSumAggregateInputType = {
    installmentNo?: true
    amount?: true
    lateFee?: true
    totalDue?: true
    paidAmount?: true
    daysOverdue?: true
  }

  export type InstallmentMinAggregateInputType = {
    id?: true
    loanId?: true
    installmentNo?: true
    amount?: true
    lateFee?: true
    totalDue?: true
    dueDate?: true
    status?: true
    paidAmount?: true
    paidAt?: true
    daysOverdue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstallmentMaxAggregateInputType = {
    id?: true
    loanId?: true
    installmentNo?: true
    amount?: true
    lateFee?: true
    totalDue?: true
    dueDate?: true
    status?: true
    paidAmount?: true
    paidAt?: true
    daysOverdue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstallmentCountAggregateInputType = {
    id?: true
    loanId?: true
    installmentNo?: true
    amount?: true
    lateFee?: true
    totalDue?: true
    dueDate?: true
    status?: true
    paidAmount?: true
    paidAt?: true
    daysOverdue?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InstallmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Installment to aggregate.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Installments
    **/
    _count?: true | InstallmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstallmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstallmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstallmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstallmentMaxAggregateInputType
  }

  export type GetInstallmentAggregateType<T extends InstallmentAggregateArgs> = {
        [P in keyof T & keyof AggregateInstallment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstallment[P]>
      : GetScalarType<T[P], AggregateInstallment[P]>
  }




  export type InstallmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentWhereInput
    orderBy?: InstallmentOrderByWithAggregationInput | InstallmentOrderByWithAggregationInput[]
    by: InstallmentScalarFieldEnum[] | InstallmentScalarFieldEnum
    having?: InstallmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstallmentCountAggregateInputType | true
    _avg?: InstallmentAvgAggregateInputType
    _sum?: InstallmentSumAggregateInputType
    _min?: InstallmentMinAggregateInputType
    _max?: InstallmentMaxAggregateInputType
  }

  export type InstallmentGroupByOutputType = {
    id: string
    loanId: string
    installmentNo: number
    amount: Decimal
    lateFee: Decimal
    totalDue: Decimal
    dueDate: Date
    status: $Enums.InstallmentStatus
    paidAmount: Decimal
    paidAt: Date | null
    daysOverdue: number
    createdAt: Date
    updatedAt: Date
    _count: InstallmentCountAggregateOutputType | null
    _avg: InstallmentAvgAggregateOutputType | null
    _sum: InstallmentSumAggregateOutputType | null
    _min: InstallmentMinAggregateOutputType | null
    _max: InstallmentMaxAggregateOutputType | null
  }

  type GetInstallmentGroupByPayload<T extends InstallmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstallmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstallmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstallmentGroupByOutputType[P]>
            : GetScalarType<T[P], InstallmentGroupByOutputType[P]>
        }
      >
    >


  export type InstallmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNo?: boolean
    amount?: boolean
    lateFee?: boolean
    totalDue?: boolean
    dueDate?: boolean
    status?: boolean
    paidAmount?: boolean
    paidAt?: boolean
    daysOverdue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    payments?: boolean | Installment$paymentsArgs<ExtArgs>
    _count?: boolean | InstallmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installment"]>

  export type InstallmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNo?: boolean
    amount?: boolean
    lateFee?: boolean
    totalDue?: boolean
    dueDate?: boolean
    status?: boolean
    paidAmount?: boolean
    paidAt?: boolean
    daysOverdue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installment"]>

  export type InstallmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNo?: boolean
    amount?: boolean
    lateFee?: boolean
    totalDue?: boolean
    dueDate?: boolean
    status?: boolean
    paidAmount?: boolean
    paidAt?: boolean
    daysOverdue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installment"]>

  export type InstallmentSelectScalar = {
    id?: boolean
    loanId?: boolean
    installmentNo?: boolean
    amount?: boolean
    lateFee?: boolean
    totalDue?: boolean
    dueDate?: boolean
    status?: boolean
    paidAmount?: boolean
    paidAt?: boolean
    daysOverdue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InstallmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanId" | "installmentNo" | "amount" | "lateFee" | "totalDue" | "dueDate" | "status" | "paidAmount" | "paidAt" | "daysOverdue" | "createdAt" | "updatedAt", ExtArgs["result"]["installment"]>
  export type InstallmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    payments?: boolean | Installment$paymentsArgs<ExtArgs>
    _count?: boolean | InstallmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstallmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }
  export type InstallmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }

  export type $InstallmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Installment"
    objects: {
      loan: Prisma.$LoanPayload<ExtArgs>
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string
      /**
       * Número da parcela (1, 2, 3...)
       */
      installmentNo: number
      /**
       * Valor original
       */
      amount: Prisma.Decimal
      /**
       * Multa acumulada
       */
      lateFee: Prisma.Decimal
      /**
       * amount + lateFee
       */
      totalDue: Prisma.Decimal
      /**
       * Data de vencimento (pula domingos)
       */
      dueDate: Date
      status: $Enums.InstallmentStatus
      paidAmount: Prisma.Decimal
      paidAt: Date | null
      daysOverdue: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["installment"]>
    composites: {}
  }

  type InstallmentGetPayload<S extends boolean | null | undefined | InstallmentDefaultArgs> = $Result.GetResult<Prisma.$InstallmentPayload, S>

  type InstallmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InstallmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InstallmentCountAggregateInputType | true
    }

  export interface InstallmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Installment'], meta: { name: 'Installment' } }
    /**
     * Find zero or one Installment that matches the filter.
     * @param {InstallmentFindUniqueArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstallmentFindUniqueArgs>(args: SelectSubset<T, InstallmentFindUniqueArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Installment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstallmentFindUniqueOrThrowArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstallmentFindUniqueOrThrowArgs>(args: SelectSubset<T, InstallmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Installment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindFirstArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstallmentFindFirstArgs>(args?: SelectSubset<T, InstallmentFindFirstArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Installment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindFirstOrThrowArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstallmentFindFirstOrThrowArgs>(args?: SelectSubset<T, InstallmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Installments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Installments
     * const installments = await prisma.installment.findMany()
     * 
     * // Get first 10 Installments
     * const installments = await prisma.installment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const installmentWithIdOnly = await prisma.installment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstallmentFindManyArgs>(args?: SelectSubset<T, InstallmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Installment.
     * @param {InstallmentCreateArgs} args - Arguments to create a Installment.
     * @example
     * // Create one Installment
     * const Installment = await prisma.installment.create({
     *   data: {
     *     // ... data to create a Installment
     *   }
     * })
     * 
     */
    create<T extends InstallmentCreateArgs>(args: SelectSubset<T, InstallmentCreateArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Installments.
     * @param {InstallmentCreateManyArgs} args - Arguments to create many Installments.
     * @example
     * // Create many Installments
     * const installment = await prisma.installment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstallmentCreateManyArgs>(args?: SelectSubset<T, InstallmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Installments and returns the data saved in the database.
     * @param {InstallmentCreateManyAndReturnArgs} args - Arguments to create many Installments.
     * @example
     * // Create many Installments
     * const installment = await prisma.installment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Installments and only return the `id`
     * const installmentWithIdOnly = await prisma.installment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstallmentCreateManyAndReturnArgs>(args?: SelectSubset<T, InstallmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Installment.
     * @param {InstallmentDeleteArgs} args - Arguments to delete one Installment.
     * @example
     * // Delete one Installment
     * const Installment = await prisma.installment.delete({
     *   where: {
     *     // ... filter to delete one Installment
     *   }
     * })
     * 
     */
    delete<T extends InstallmentDeleteArgs>(args: SelectSubset<T, InstallmentDeleteArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Installment.
     * @param {InstallmentUpdateArgs} args - Arguments to update one Installment.
     * @example
     * // Update one Installment
     * const installment = await prisma.installment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstallmentUpdateArgs>(args: SelectSubset<T, InstallmentUpdateArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Installments.
     * @param {InstallmentDeleteManyArgs} args - Arguments to filter Installments to delete.
     * @example
     * // Delete a few Installments
     * const { count } = await prisma.installment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstallmentDeleteManyArgs>(args?: SelectSubset<T, InstallmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Installments
     * const installment = await prisma.installment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstallmentUpdateManyArgs>(args: SelectSubset<T, InstallmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Installments and returns the data updated in the database.
     * @param {InstallmentUpdateManyAndReturnArgs} args - Arguments to update many Installments.
     * @example
     * // Update many Installments
     * const installment = await prisma.installment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Installments and only return the `id`
     * const installmentWithIdOnly = await prisma.installment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InstallmentUpdateManyAndReturnArgs>(args: SelectSubset<T, InstallmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Installment.
     * @param {InstallmentUpsertArgs} args - Arguments to update or create a Installment.
     * @example
     * // Update or create a Installment
     * const installment = await prisma.installment.upsert({
     *   create: {
     *     // ... data to create a Installment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Installment we want to update
     *   }
     * })
     */
    upsert<T extends InstallmentUpsertArgs>(args: SelectSubset<T, InstallmentUpsertArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentCountArgs} args - Arguments to filter Installments to count.
     * @example
     * // Count the number of Installments
     * const count = await prisma.installment.count({
     *   where: {
     *     // ... the filter for the Installments we want to count
     *   }
     * })
    **/
    count<T extends InstallmentCountArgs>(
      args?: Subset<T, InstallmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstallmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstallmentAggregateArgs>(args: Subset<T, InstallmentAggregateArgs>): Prisma.PrismaPromise<GetInstallmentAggregateType<T>>

    /**
     * Group by Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstallmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstallmentGroupByArgs['orderBy'] }
        : { orderBy?: InstallmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstallmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstallmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Installment model
   */
  readonly fields: InstallmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Installment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstallmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan<T extends LoanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanDefaultArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payments<T extends Installment$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Installment$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Installment model
   */
  interface InstallmentFieldRefs {
    readonly id: FieldRef<"Installment", 'String'>
    readonly loanId: FieldRef<"Installment", 'String'>
    readonly installmentNo: FieldRef<"Installment", 'Int'>
    readonly amount: FieldRef<"Installment", 'Decimal'>
    readonly lateFee: FieldRef<"Installment", 'Decimal'>
    readonly totalDue: FieldRef<"Installment", 'Decimal'>
    readonly dueDate: FieldRef<"Installment", 'DateTime'>
    readonly status: FieldRef<"Installment", 'InstallmentStatus'>
    readonly paidAmount: FieldRef<"Installment", 'Decimal'>
    readonly paidAt: FieldRef<"Installment", 'DateTime'>
    readonly daysOverdue: FieldRef<"Installment", 'Int'>
    readonly createdAt: FieldRef<"Installment", 'DateTime'>
    readonly updatedAt: FieldRef<"Installment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Installment findUnique
   */
  export type InstallmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment findUniqueOrThrow
   */
  export type InstallmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment findFirst
   */
  export type InstallmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Installments.
     */
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment findFirstOrThrow
   */
  export type InstallmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Installments.
     */
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment findMany
   */
  export type InstallmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installments to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment create
   */
  export type InstallmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Installment.
     */
    data: XOR<InstallmentCreateInput, InstallmentUncheckedCreateInput>
  }

  /**
   * Installment createMany
   */
  export type InstallmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Installments.
     */
    data: InstallmentCreateManyInput | InstallmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Installment createManyAndReturn
   */
  export type InstallmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * The data used to create many Installments.
     */
    data: InstallmentCreateManyInput | InstallmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Installment update
   */
  export type InstallmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Installment.
     */
    data: XOR<InstallmentUpdateInput, InstallmentUncheckedUpdateInput>
    /**
     * Choose, which Installment to update.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment updateMany
   */
  export type InstallmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Installments.
     */
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyInput>
    /**
     * Filter which Installments to update
     */
    where?: InstallmentWhereInput
    /**
     * Limit how many Installments to update.
     */
    limit?: number
  }

  /**
   * Installment updateManyAndReturn
   */
  export type InstallmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * The data used to update Installments.
     */
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyInput>
    /**
     * Filter which Installments to update
     */
    where?: InstallmentWhereInput
    /**
     * Limit how many Installments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Installment upsert
   */
  export type InstallmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Installment to update in case it exists.
     */
    where: InstallmentWhereUniqueInput
    /**
     * In case the Installment found by the `where` argument doesn't exist, create a new Installment with this data.
     */
    create: XOR<InstallmentCreateInput, InstallmentUncheckedCreateInput>
    /**
     * In case the Installment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstallmentUpdateInput, InstallmentUncheckedUpdateInput>
  }

  /**
   * Installment delete
   */
  export type InstallmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter which Installment to delete.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment deleteMany
   */
  export type InstallmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Installments to delete
     */
    where?: InstallmentWhereInput
    /**
     * Limit how many Installments to delete.
     */
    limit?: number
  }

  /**
   * Installment.payments
   */
  export type Installment$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Installment without action
   */
  export type InstallmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Installment
     */
    omit?: InstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    installmentId: string | null
    collectorId: string | null
    amount: Decimal | null
    method: $Enums.PaymentMethod | null
    receivedAt: Date | null
    notes: string | null
    syncId: string | null
    createdAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    installmentId: string | null
    collectorId: string | null
    amount: Decimal | null
    method: $Enums.PaymentMethod | null
    receivedAt: Date | null
    notes: string | null
    syncId: string | null
    createdAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    installmentId: number
    collectorId: number
    amount: number
    method: number
    receivedAt: number
    notes: number
    syncId: number
    createdAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    installmentId?: true
    collectorId?: true
    amount?: true
    method?: true
    receivedAt?: true
    notes?: true
    syncId?: true
    createdAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    installmentId?: true
    collectorId?: true
    amount?: true
    method?: true
    receivedAt?: true
    notes?: true
    syncId?: true
    createdAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    installmentId?: true
    collectorId?: true
    amount?: true
    method?: true
    receivedAt?: true
    notes?: true
    syncId?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    installmentId: string
    collectorId: string
    amount: Decimal
    method: $Enums.PaymentMethod
    receivedAt: Date
    notes: string | null
    syncId: string | null
    createdAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    installmentId?: boolean
    collectorId?: boolean
    amount?: boolean
    method?: boolean
    receivedAt?: boolean
    notes?: boolean
    syncId?: boolean
    createdAt?: boolean
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    cashMovement?: boolean | Payment$cashMovementArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    installmentId?: boolean
    collectorId?: boolean
    amount?: boolean
    method?: boolean
    receivedAt?: boolean
    notes?: boolean
    syncId?: boolean
    createdAt?: boolean
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    installmentId?: boolean
    collectorId?: boolean
    amount?: boolean
    method?: boolean
    receivedAt?: boolean
    notes?: boolean
    syncId?: boolean
    createdAt?: boolean
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    installmentId?: boolean
    collectorId?: boolean
    amount?: boolean
    method?: boolean
    receivedAt?: boolean
    notes?: boolean
    syncId?: boolean
    createdAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "installmentId" | "collectorId" | "amount" | "method" | "receivedAt" | "notes" | "syncId" | "createdAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
    cashMovement?: boolean | Payment$cashMovementArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installment?: boolean | InstallmentDefaultArgs<ExtArgs>
    collector?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      installment: Prisma.$InstallmentPayload<ExtArgs>
      collector: Prisma.$UserPayload<ExtArgs>
      cashMovement: Prisma.$CashMovementPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      installmentId: string
      /**
       * Quem recebeu o pagamento
       */
      collectorId: string
      amount: Prisma.Decimal
      method: $Enums.PaymentMethod
      receivedAt: Date
      notes: string | null
      /**
       * ID para sync offline
       */
      syncId: string | null
      createdAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    installment<T extends InstallmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstallmentDefaultArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    collector<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cashMovement<T extends Payment$cashMovementArgs<ExtArgs> = {}>(args?: Subset<T, Payment$cashMovementArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly installmentId: FieldRef<"Payment", 'String'>
    readonly collectorId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly method: FieldRef<"Payment", 'PaymentMethod'>
    readonly receivedAt: FieldRef<"Payment", 'DateTime'>
    readonly notes: FieldRef<"Payment", 'String'>
    readonly syncId: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.cashMovement
   */
  export type Payment$cashMovementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    where?: CashMovementWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model CashMovement
   */

  export type AggregateCashMovement = {
    _count: CashMovementCountAggregateOutputType | null
    _avg: CashMovementAvgAggregateOutputType | null
    _sum: CashMovementSumAggregateOutputType | null
    _min: CashMovementMinAggregateOutputType | null
    _max: CashMovementMaxAggregateOutputType | null
  }

  export type CashMovementAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type CashMovementSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type CashMovementMinAggregateOutputType = {
    id: string | null
    userId: string | null
    paymentId: string | null
    type: $Enums.CashMovementType | null
    amount: Decimal | null
    description: string | null
    date: Date | null
    createdAt: Date | null
  }

  export type CashMovementMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    paymentId: string | null
    type: $Enums.CashMovementType | null
    amount: Decimal | null
    description: string | null
    date: Date | null
    createdAt: Date | null
  }

  export type CashMovementCountAggregateOutputType = {
    id: number
    userId: number
    paymentId: number
    type: number
    amount: number
    description: number
    date: number
    createdAt: number
    _all: number
  }


  export type CashMovementAvgAggregateInputType = {
    amount?: true
  }

  export type CashMovementSumAggregateInputType = {
    amount?: true
  }

  export type CashMovementMinAggregateInputType = {
    id?: true
    userId?: true
    paymentId?: true
    type?: true
    amount?: true
    description?: true
    date?: true
    createdAt?: true
  }

  export type CashMovementMaxAggregateInputType = {
    id?: true
    userId?: true
    paymentId?: true
    type?: true
    amount?: true
    description?: true
    date?: true
    createdAt?: true
  }

  export type CashMovementCountAggregateInputType = {
    id?: true
    userId?: true
    paymentId?: true
    type?: true
    amount?: true
    description?: true
    date?: true
    createdAt?: true
    _all?: true
  }

  export type CashMovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashMovement to aggregate.
     */
    where?: CashMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashMovements to fetch.
     */
    orderBy?: CashMovementOrderByWithRelationInput | CashMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CashMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CashMovements
    **/
    _count?: true | CashMovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CashMovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CashMovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CashMovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CashMovementMaxAggregateInputType
  }

  export type GetCashMovementAggregateType<T extends CashMovementAggregateArgs> = {
        [P in keyof T & keyof AggregateCashMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCashMovement[P]>
      : GetScalarType<T[P], AggregateCashMovement[P]>
  }




  export type CashMovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashMovementWhereInput
    orderBy?: CashMovementOrderByWithAggregationInput | CashMovementOrderByWithAggregationInput[]
    by: CashMovementScalarFieldEnum[] | CashMovementScalarFieldEnum
    having?: CashMovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CashMovementCountAggregateInputType | true
    _avg?: CashMovementAvgAggregateInputType
    _sum?: CashMovementSumAggregateInputType
    _min?: CashMovementMinAggregateInputType
    _max?: CashMovementMaxAggregateInputType
  }

  export type CashMovementGroupByOutputType = {
    id: string
    userId: string
    paymentId: string | null
    type: $Enums.CashMovementType
    amount: Decimal
    description: string | null
    date: Date
    createdAt: Date
    _count: CashMovementCountAggregateOutputType | null
    _avg: CashMovementAvgAggregateOutputType | null
    _sum: CashMovementSumAggregateOutputType | null
    _min: CashMovementMinAggregateOutputType | null
    _max: CashMovementMaxAggregateOutputType | null
  }

  type GetCashMovementGroupByPayload<T extends CashMovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CashMovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CashMovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CashMovementGroupByOutputType[P]>
            : GetScalarType<T[P], CashMovementGroupByOutputType[P]>
        }
      >
    >


  export type CashMovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    paymentId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | CashMovement$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["cashMovement"]>

  export type CashMovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    paymentId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | CashMovement$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["cashMovement"]>

  export type CashMovementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    paymentId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | CashMovement$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["cashMovement"]>

  export type CashMovementSelectScalar = {
    id?: boolean
    userId?: boolean
    paymentId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    createdAt?: boolean
  }

  export type CashMovementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "paymentId" | "type" | "amount" | "description" | "date" | "createdAt", ExtArgs["result"]["cashMovement"]>
  export type CashMovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | CashMovement$paymentArgs<ExtArgs>
  }
  export type CashMovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | CashMovement$paymentArgs<ExtArgs>
  }
  export type CashMovementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | CashMovement$paymentArgs<ExtArgs>
  }

  export type $CashMovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CashMovement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      payment: Prisma.$PaymentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * Quem realizou
       */
      userId: string
      /**
       * Vínculo com pagamento
       */
      paymentId: string | null
      type: $Enums.CashMovementType
      amount: Prisma.Decimal
      description: string | null
      date: Date
      createdAt: Date
    }, ExtArgs["result"]["cashMovement"]>
    composites: {}
  }

  type CashMovementGetPayload<S extends boolean | null | undefined | CashMovementDefaultArgs> = $Result.GetResult<Prisma.$CashMovementPayload, S>

  type CashMovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CashMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CashMovementCountAggregateInputType | true
    }

  export interface CashMovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CashMovement'], meta: { name: 'CashMovement' } }
    /**
     * Find zero or one CashMovement that matches the filter.
     * @param {CashMovementFindUniqueArgs} args - Arguments to find a CashMovement
     * @example
     * // Get one CashMovement
     * const cashMovement = await prisma.cashMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CashMovementFindUniqueArgs>(args: SelectSubset<T, CashMovementFindUniqueArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CashMovement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CashMovementFindUniqueOrThrowArgs} args - Arguments to find a CashMovement
     * @example
     * // Get one CashMovement
     * const cashMovement = await prisma.cashMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CashMovementFindUniqueOrThrowArgs>(args: SelectSubset<T, CashMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CashMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashMovementFindFirstArgs} args - Arguments to find a CashMovement
     * @example
     * // Get one CashMovement
     * const cashMovement = await prisma.cashMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CashMovementFindFirstArgs>(args?: SelectSubset<T, CashMovementFindFirstArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CashMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashMovementFindFirstOrThrowArgs} args - Arguments to find a CashMovement
     * @example
     * // Get one CashMovement
     * const cashMovement = await prisma.cashMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CashMovementFindFirstOrThrowArgs>(args?: SelectSubset<T, CashMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CashMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CashMovements
     * const cashMovements = await prisma.cashMovement.findMany()
     * 
     * // Get first 10 CashMovements
     * const cashMovements = await prisma.cashMovement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cashMovementWithIdOnly = await prisma.cashMovement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CashMovementFindManyArgs>(args?: SelectSubset<T, CashMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CashMovement.
     * @param {CashMovementCreateArgs} args - Arguments to create a CashMovement.
     * @example
     * // Create one CashMovement
     * const CashMovement = await prisma.cashMovement.create({
     *   data: {
     *     // ... data to create a CashMovement
     *   }
     * })
     * 
     */
    create<T extends CashMovementCreateArgs>(args: SelectSubset<T, CashMovementCreateArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CashMovements.
     * @param {CashMovementCreateManyArgs} args - Arguments to create many CashMovements.
     * @example
     * // Create many CashMovements
     * const cashMovement = await prisma.cashMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CashMovementCreateManyArgs>(args?: SelectSubset<T, CashMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CashMovements and returns the data saved in the database.
     * @param {CashMovementCreateManyAndReturnArgs} args - Arguments to create many CashMovements.
     * @example
     * // Create many CashMovements
     * const cashMovement = await prisma.cashMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CashMovements and only return the `id`
     * const cashMovementWithIdOnly = await prisma.cashMovement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CashMovementCreateManyAndReturnArgs>(args?: SelectSubset<T, CashMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CashMovement.
     * @param {CashMovementDeleteArgs} args - Arguments to delete one CashMovement.
     * @example
     * // Delete one CashMovement
     * const CashMovement = await prisma.cashMovement.delete({
     *   where: {
     *     // ... filter to delete one CashMovement
     *   }
     * })
     * 
     */
    delete<T extends CashMovementDeleteArgs>(args: SelectSubset<T, CashMovementDeleteArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CashMovement.
     * @param {CashMovementUpdateArgs} args - Arguments to update one CashMovement.
     * @example
     * // Update one CashMovement
     * const cashMovement = await prisma.cashMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CashMovementUpdateArgs>(args: SelectSubset<T, CashMovementUpdateArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CashMovements.
     * @param {CashMovementDeleteManyArgs} args - Arguments to filter CashMovements to delete.
     * @example
     * // Delete a few CashMovements
     * const { count } = await prisma.cashMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CashMovementDeleteManyArgs>(args?: SelectSubset<T, CashMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CashMovements
     * const cashMovement = await prisma.cashMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CashMovementUpdateManyArgs>(args: SelectSubset<T, CashMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashMovements and returns the data updated in the database.
     * @param {CashMovementUpdateManyAndReturnArgs} args - Arguments to update many CashMovements.
     * @example
     * // Update many CashMovements
     * const cashMovement = await prisma.cashMovement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CashMovements and only return the `id`
     * const cashMovementWithIdOnly = await prisma.cashMovement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CashMovementUpdateManyAndReturnArgs>(args: SelectSubset<T, CashMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CashMovement.
     * @param {CashMovementUpsertArgs} args - Arguments to update or create a CashMovement.
     * @example
     * // Update or create a CashMovement
     * const cashMovement = await prisma.cashMovement.upsert({
     *   create: {
     *     // ... data to create a CashMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CashMovement we want to update
     *   }
     * })
     */
    upsert<T extends CashMovementUpsertArgs>(args: SelectSubset<T, CashMovementUpsertArgs<ExtArgs>>): Prisma__CashMovementClient<$Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CashMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashMovementCountArgs} args - Arguments to filter CashMovements to count.
     * @example
     * // Count the number of CashMovements
     * const count = await prisma.cashMovement.count({
     *   where: {
     *     // ... the filter for the CashMovements we want to count
     *   }
     * })
    **/
    count<T extends CashMovementCountArgs>(
      args?: Subset<T, CashMovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CashMovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CashMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CashMovementAggregateArgs>(args: Subset<T, CashMovementAggregateArgs>): Prisma.PrismaPromise<GetCashMovementAggregateType<T>>

    /**
     * Group by CashMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashMovementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CashMovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CashMovementGroupByArgs['orderBy'] }
        : { orderBy?: CashMovementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CashMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CashMovement model
   */
  readonly fields: CashMovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CashMovement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CashMovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payment<T extends CashMovement$paymentArgs<ExtArgs> = {}>(args?: Subset<T, CashMovement$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CashMovement model
   */
  interface CashMovementFieldRefs {
    readonly id: FieldRef<"CashMovement", 'String'>
    readonly userId: FieldRef<"CashMovement", 'String'>
    readonly paymentId: FieldRef<"CashMovement", 'String'>
    readonly type: FieldRef<"CashMovement", 'CashMovementType'>
    readonly amount: FieldRef<"CashMovement", 'Decimal'>
    readonly description: FieldRef<"CashMovement", 'String'>
    readonly date: FieldRef<"CashMovement", 'DateTime'>
    readonly createdAt: FieldRef<"CashMovement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CashMovement findUnique
   */
  export type CashMovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashMovement to fetch.
     */
    where: CashMovementWhereUniqueInput
  }

  /**
   * CashMovement findUniqueOrThrow
   */
  export type CashMovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashMovement to fetch.
     */
    where: CashMovementWhereUniqueInput
  }

  /**
   * CashMovement findFirst
   */
  export type CashMovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashMovement to fetch.
     */
    where?: CashMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashMovements to fetch.
     */
    orderBy?: CashMovementOrderByWithRelationInput | CashMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashMovements.
     */
    cursor?: CashMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashMovements.
     */
    distinct?: CashMovementScalarFieldEnum | CashMovementScalarFieldEnum[]
  }

  /**
   * CashMovement findFirstOrThrow
   */
  export type CashMovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashMovement to fetch.
     */
    where?: CashMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashMovements to fetch.
     */
    orderBy?: CashMovementOrderByWithRelationInput | CashMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashMovements.
     */
    cursor?: CashMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashMovements.
     */
    distinct?: CashMovementScalarFieldEnum | CashMovementScalarFieldEnum[]
  }

  /**
   * CashMovement findMany
   */
  export type CashMovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashMovements to fetch.
     */
    where?: CashMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashMovements to fetch.
     */
    orderBy?: CashMovementOrderByWithRelationInput | CashMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CashMovements.
     */
    cursor?: CashMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashMovements.
     */
    skip?: number
    distinct?: CashMovementScalarFieldEnum | CashMovementScalarFieldEnum[]
  }

  /**
   * CashMovement create
   */
  export type CashMovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * The data needed to create a CashMovement.
     */
    data: XOR<CashMovementCreateInput, CashMovementUncheckedCreateInput>
  }

  /**
   * CashMovement createMany
   */
  export type CashMovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CashMovements.
     */
    data: CashMovementCreateManyInput | CashMovementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CashMovement createManyAndReturn
   */
  export type CashMovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * The data used to create many CashMovements.
     */
    data: CashMovementCreateManyInput | CashMovementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CashMovement update
   */
  export type CashMovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * The data needed to update a CashMovement.
     */
    data: XOR<CashMovementUpdateInput, CashMovementUncheckedUpdateInput>
    /**
     * Choose, which CashMovement to update.
     */
    where: CashMovementWhereUniqueInput
  }

  /**
   * CashMovement updateMany
   */
  export type CashMovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CashMovements.
     */
    data: XOR<CashMovementUpdateManyMutationInput, CashMovementUncheckedUpdateManyInput>
    /**
     * Filter which CashMovements to update
     */
    where?: CashMovementWhereInput
    /**
     * Limit how many CashMovements to update.
     */
    limit?: number
  }

  /**
   * CashMovement updateManyAndReturn
   */
  export type CashMovementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * The data used to update CashMovements.
     */
    data: XOR<CashMovementUpdateManyMutationInput, CashMovementUncheckedUpdateManyInput>
    /**
     * Filter which CashMovements to update
     */
    where?: CashMovementWhereInput
    /**
     * Limit how many CashMovements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CashMovement upsert
   */
  export type CashMovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * The filter to search for the CashMovement to update in case it exists.
     */
    where: CashMovementWhereUniqueInput
    /**
     * In case the CashMovement found by the `where` argument doesn't exist, create a new CashMovement with this data.
     */
    create: XOR<CashMovementCreateInput, CashMovementUncheckedCreateInput>
    /**
     * In case the CashMovement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CashMovementUpdateInput, CashMovementUncheckedUpdateInput>
  }

  /**
   * CashMovement delete
   */
  export type CashMovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
    /**
     * Filter which CashMovement to delete.
     */
    where: CashMovementWhereUniqueInput
  }

  /**
   * CashMovement deleteMany
   */
  export type CashMovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashMovements to delete
     */
    where?: CashMovementWhereInput
    /**
     * Limit how many CashMovements to delete.
     */
    limit?: number
  }

  /**
   * CashMovement.payment
   */
  export type CashMovement$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * CashMovement without action
   */
  export type CashMovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: CashMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: CashMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashMovementInclude<ExtArgs> | null
  }


  /**
   * Model SystemConfig
   */

  export type AggregateSystemConfig = {
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  export type SystemConfigMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    description: string | null
    updatedAt: Date | null
  }

  export type SystemConfigMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    description: string | null
    updatedAt: Date | null
  }

  export type SystemConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    description: number
    updatedAt: number
    _all: number
  }


  export type SystemConfigMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    updatedAt?: true
  }

  export type SystemConfigMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    updatedAt?: true
  }

  export type SystemConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfig to aggregate.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemConfigs
    **/
    _count?: true | SystemConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemConfigMaxAggregateInputType
  }

  export type GetSystemConfigAggregateType<T extends SystemConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemConfig[P]>
      : GetScalarType<T[P], AggregateSystemConfig[P]>
  }




  export type SystemConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemConfigWhereInput
    orderBy?: SystemConfigOrderByWithAggregationInput | SystemConfigOrderByWithAggregationInput[]
    by: SystemConfigScalarFieldEnum[] | SystemConfigScalarFieldEnum
    having?: SystemConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemConfigCountAggregateInputType | true
    _min?: SystemConfigMinAggregateInputType
    _max?: SystemConfigMaxAggregateInputType
  }

  export type SystemConfigGroupByOutputType = {
    id: string
    key: string
    value: string
    description: string | null
    updatedAt: Date
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  type GetSystemConfigGroupByPayload<T extends SystemConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
        }
      >
    >


  export type SystemConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    updatedAt?: boolean
  }

  export type SystemConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "description" | "updatedAt", ExtArgs["result"]["systemConfig"]>

  export type $SystemConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      description: string | null
      updatedAt: Date
    }, ExtArgs["result"]["systemConfig"]>
    composites: {}
  }

  type SystemConfigGetPayload<S extends boolean | null | undefined | SystemConfigDefaultArgs> = $Result.GetResult<Prisma.$SystemConfigPayload, S>

  type SystemConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemConfigCountAggregateInputType | true
    }

  export interface SystemConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemConfig'], meta: { name: 'SystemConfig' } }
    /**
     * Find zero or one SystemConfig that matches the filter.
     * @param {SystemConfigFindUniqueArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemConfigFindUniqueArgs>(args: SelectSubset<T, SystemConfigFindUniqueArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemConfigFindUniqueOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemConfigFindFirstArgs>(args?: SelectSubset<T, SystemConfigFindFirstArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany()
     * 
     * // Get first 10 SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemConfigFindManyArgs>(args?: SelectSubset<T, SystemConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemConfig.
     * @param {SystemConfigCreateArgs} args - Arguments to create a SystemConfig.
     * @example
     * // Create one SystemConfig
     * const SystemConfig = await prisma.systemConfig.create({
     *   data: {
     *     // ... data to create a SystemConfig
     *   }
     * })
     * 
     */
    create<T extends SystemConfigCreateArgs>(args: SelectSubset<T, SystemConfigCreateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemConfigs.
     * @param {SystemConfigCreateManyArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemConfigCreateManyArgs>(args?: SelectSubset<T, SystemConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemConfigs and returns the data saved in the database.
     * @param {SystemConfigCreateManyAndReturnArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemConfig.
     * @param {SystemConfigDeleteArgs} args - Arguments to delete one SystemConfig.
     * @example
     * // Delete one SystemConfig
     * const SystemConfig = await prisma.systemConfig.delete({
     *   where: {
     *     // ... filter to delete one SystemConfig
     *   }
     * })
     * 
     */
    delete<T extends SystemConfigDeleteArgs>(args: SelectSubset<T, SystemConfigDeleteArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemConfig.
     * @param {SystemConfigUpdateArgs} args - Arguments to update one SystemConfig.
     * @example
     * // Update one SystemConfig
     * const systemConfig = await prisma.systemConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemConfigUpdateArgs>(args: SelectSubset<T, SystemConfigUpdateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemConfigs.
     * @param {SystemConfigDeleteManyArgs} args - Arguments to filter SystemConfigs to delete.
     * @example
     * // Delete a few SystemConfigs
     * const { count } = await prisma.systemConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemConfigDeleteManyArgs>(args?: SelectSubset<T, SystemConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemConfigUpdateManyArgs>(args: SelectSubset<T, SystemConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs and returns the data updated in the database.
     * @param {SystemConfigUpdateManyAndReturnArgs} args - Arguments to update many SystemConfigs.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemConfig.
     * @param {SystemConfigUpsertArgs} args - Arguments to update or create a SystemConfig.
     * @example
     * // Update or create a SystemConfig
     * const systemConfig = await prisma.systemConfig.upsert({
     *   create: {
     *     // ... data to create a SystemConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemConfig we want to update
     *   }
     * })
     */
    upsert<T extends SystemConfigUpsertArgs>(args: SelectSubset<T, SystemConfigUpsertArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigCountArgs} args - Arguments to filter SystemConfigs to count.
     * @example
     * // Count the number of SystemConfigs
     * const count = await prisma.systemConfig.count({
     *   where: {
     *     // ... the filter for the SystemConfigs we want to count
     *   }
     * })
    **/
    count<T extends SystemConfigCountArgs>(
      args?: Subset<T, SystemConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemConfigAggregateArgs>(args: Subset<T, SystemConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAggregateType<T>>

    /**
     * Group by SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemConfigGroupByArgs['orderBy'] }
        : { orderBy?: SystemConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemConfig model
   */
  readonly fields: SystemConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemConfig model
   */
  interface SystemConfigFieldRefs {
    readonly id: FieldRef<"SystemConfig", 'String'>
    readonly key: FieldRef<"SystemConfig", 'String'>
    readonly value: FieldRef<"SystemConfig", 'String'>
    readonly description: FieldRef<"SystemConfig", 'String'>
    readonly updatedAt: FieldRef<"SystemConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemConfig findUnique
   */
  export type SystemConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findUniqueOrThrow
   */
  export type SystemConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findFirst
   */
  export type SystemConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findFirstOrThrow
   */
  export type SystemConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findMany
   */
  export type SystemConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfigs to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig create
   */
  export type SystemConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemConfig.
     */
    data: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
  }

  /**
   * SystemConfig createMany
   */
  export type SystemConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig createManyAndReturn
   */
  export type SystemConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig update
   */
  export type SystemConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemConfig.
     */
    data: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
    /**
     * Choose, which SystemConfig to update.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig updateMany
   */
  export type SystemConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig updateManyAndReturn
   */
  export type SystemConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig upsert
   */
  export type SystemConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemConfig to update in case it exists.
     */
    where: SystemConfigWhereUniqueInput
    /**
     * In case the SystemConfig found by the `where` argument doesn't exist, create a new SystemConfig with this data.
     */
    create: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
    /**
     * In case the SystemConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
  }

  /**
   * SystemConfig delete
   */
  export type SystemConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter which SystemConfig to delete.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig deleteMany
   */
  export type SystemConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfigs to delete
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to delete.
     */
    limit?: number
  }

  /**
   * SystemConfig without action
   */
  export type SystemConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
  }


  /**
   * Model SyncQueue
   */

  export type AggregateSyncQueue = {
    _count: SyncQueueCountAggregateOutputType | null
    _avg: SyncQueueAvgAggregateOutputType | null
    _sum: SyncQueueSumAggregateOutputType | null
    _min: SyncQueueMinAggregateOutputType | null
    _max: SyncQueueMaxAggregateOutputType | null
  }

  export type SyncQueueAvgAggregateOutputType = {
    attempts: number | null
  }

  export type SyncQueueSumAggregateOutputType = {
    attempts: number | null
  }

  export type SyncQueueMinAggregateOutputType = {
    id: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    syncId: string | null
    synced: boolean | null
    attempts: number | null
    lastError: string | null
    createdAt: Date | null
    syncedAt: Date | null
  }

  export type SyncQueueMaxAggregateOutputType = {
    id: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    syncId: string | null
    synced: boolean | null
    attempts: number | null
    lastError: string | null
    createdAt: Date | null
    syncedAt: Date | null
  }

  export type SyncQueueCountAggregateOutputType = {
    id: number
    entityType: number
    entityId: number
    action: number
    payload: number
    syncId: number
    synced: number
    attempts: number
    lastError: number
    createdAt: number
    syncedAt: number
    _all: number
  }


  export type SyncQueueAvgAggregateInputType = {
    attempts?: true
  }

  export type SyncQueueSumAggregateInputType = {
    attempts?: true
  }

  export type SyncQueueMinAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    action?: true
    syncId?: true
    synced?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    syncedAt?: true
  }

  export type SyncQueueMaxAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    action?: true
    syncId?: true
    synced?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    syncedAt?: true
  }

  export type SyncQueueCountAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    action?: true
    payload?: true
    syncId?: true
    synced?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    syncedAt?: true
    _all?: true
  }

  export type SyncQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncQueue to aggregate.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncQueues
    **/
    _count?: true | SyncQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncQueueMaxAggregateInputType
  }

  export type GetSyncQueueAggregateType<T extends SyncQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncQueue[P]>
      : GetScalarType<T[P], AggregateSyncQueue[P]>
  }




  export type SyncQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncQueueWhereInput
    orderBy?: SyncQueueOrderByWithAggregationInput | SyncQueueOrderByWithAggregationInput[]
    by: SyncQueueScalarFieldEnum[] | SyncQueueScalarFieldEnum
    having?: SyncQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncQueueCountAggregateInputType | true
    _avg?: SyncQueueAvgAggregateInputType
    _sum?: SyncQueueSumAggregateInputType
    _min?: SyncQueueMinAggregateInputType
    _max?: SyncQueueMaxAggregateInputType
  }

  export type SyncQueueGroupByOutputType = {
    id: string
    entityType: string
    entityId: string
    action: string
    payload: JsonValue
    syncId: string
    synced: boolean
    attempts: number
    lastError: string | null
    createdAt: Date
    syncedAt: Date | null
    _count: SyncQueueCountAggregateOutputType | null
    _avg: SyncQueueAvgAggregateOutputType | null
    _sum: SyncQueueSumAggregateOutputType | null
    _min: SyncQueueMinAggregateOutputType | null
    _max: SyncQueueMaxAggregateOutputType | null
  }

  type GetSyncQueueGroupByPayload<T extends SyncQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncQueueGroupByOutputType[P]>
            : GetScalarType<T[P], SyncQueueGroupByOutputType[P]>
        }
      >
    >


  export type SyncQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    payload?: boolean
    syncId?: boolean
    synced?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    payload?: boolean
    syncId?: boolean
    synced?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    payload?: boolean
    syncId?: boolean
    synced?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectScalar = {
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    payload?: boolean
    syncId?: boolean
    synced?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    syncedAt?: boolean
  }

  export type SyncQueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entityType" | "entityId" | "action" | "payload" | "syncId" | "synced" | "attempts" | "lastError" | "createdAt" | "syncedAt", ExtArgs["result"]["syncQueue"]>

  export type $SyncQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * "payment" | "client" | "loan" | etc.
       */
      entityType: string
      /**
       * ID da entidade
       */
      entityId: string
      /**
       * "create" | "update" | "delete"
       */
      action: string
      /**
       * Dados da operação
       */
      payload: Prisma.JsonValue
      /**
       * UUID gerado no mobile
       */
      syncId: string
      synced: boolean
      attempts: number
      lastError: string | null
      createdAt: Date
      syncedAt: Date | null
    }, ExtArgs["result"]["syncQueue"]>
    composites: {}
  }

  type SyncQueueGetPayload<S extends boolean | null | undefined | SyncQueueDefaultArgs> = $Result.GetResult<Prisma.$SyncQueuePayload, S>

  type SyncQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncQueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncQueueCountAggregateInputType | true
    }

  export interface SyncQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncQueue'], meta: { name: 'SyncQueue' } }
    /**
     * Find zero or one SyncQueue that matches the filter.
     * @param {SyncQueueFindUniqueArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncQueueFindUniqueArgs>(args: SelectSubset<T, SyncQueueFindUniqueArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncQueue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncQueueFindUniqueOrThrowArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindFirstArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncQueueFindFirstArgs>(args?: SelectSubset<T, SyncQueueFindFirstArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindFirstOrThrowArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncQueues
     * const syncQueues = await prisma.syncQueue.findMany()
     * 
     * // Get first 10 SyncQueues
     * const syncQueues = await prisma.syncQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncQueueFindManyArgs>(args?: SelectSubset<T, SyncQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncQueue.
     * @param {SyncQueueCreateArgs} args - Arguments to create a SyncQueue.
     * @example
     * // Create one SyncQueue
     * const SyncQueue = await prisma.syncQueue.create({
     *   data: {
     *     // ... data to create a SyncQueue
     *   }
     * })
     * 
     */
    create<T extends SyncQueueCreateArgs>(args: SelectSubset<T, SyncQueueCreateArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncQueues.
     * @param {SyncQueueCreateManyArgs} args - Arguments to create many SyncQueues.
     * @example
     * // Create many SyncQueues
     * const syncQueue = await prisma.syncQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncQueueCreateManyArgs>(args?: SelectSubset<T, SyncQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncQueues and returns the data saved in the database.
     * @param {SyncQueueCreateManyAndReturnArgs} args - Arguments to create many SyncQueues.
     * @example
     * // Create many SyncQueues
     * const syncQueue = await prisma.syncQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncQueues and only return the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncQueue.
     * @param {SyncQueueDeleteArgs} args - Arguments to delete one SyncQueue.
     * @example
     * // Delete one SyncQueue
     * const SyncQueue = await prisma.syncQueue.delete({
     *   where: {
     *     // ... filter to delete one SyncQueue
     *   }
     * })
     * 
     */
    delete<T extends SyncQueueDeleteArgs>(args: SelectSubset<T, SyncQueueDeleteArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncQueue.
     * @param {SyncQueueUpdateArgs} args - Arguments to update one SyncQueue.
     * @example
     * // Update one SyncQueue
     * const syncQueue = await prisma.syncQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncQueueUpdateArgs>(args: SelectSubset<T, SyncQueueUpdateArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncQueues.
     * @param {SyncQueueDeleteManyArgs} args - Arguments to filter SyncQueues to delete.
     * @example
     * // Delete a few SyncQueues
     * const { count } = await prisma.syncQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncQueueDeleteManyArgs>(args?: SelectSubset<T, SyncQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncQueues
     * const syncQueue = await prisma.syncQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncQueueUpdateManyArgs>(args: SelectSubset<T, SyncQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncQueues and returns the data updated in the database.
     * @param {SyncQueueUpdateManyAndReturnArgs} args - Arguments to update many SyncQueues.
     * @example
     * // Update many SyncQueues
     * const syncQueue = await prisma.syncQueue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncQueues and only return the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncQueueUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncQueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncQueue.
     * @param {SyncQueueUpsertArgs} args - Arguments to update or create a SyncQueue.
     * @example
     * // Update or create a SyncQueue
     * const syncQueue = await prisma.syncQueue.upsert({
     *   create: {
     *     // ... data to create a SyncQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncQueue we want to update
     *   }
     * })
     */
    upsert<T extends SyncQueueUpsertArgs>(args: SelectSubset<T, SyncQueueUpsertArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueCountArgs} args - Arguments to filter SyncQueues to count.
     * @example
     * // Count the number of SyncQueues
     * const count = await prisma.syncQueue.count({
     *   where: {
     *     // ... the filter for the SyncQueues we want to count
     *   }
     * })
    **/
    count<T extends SyncQueueCountArgs>(
      args?: Subset<T, SyncQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncQueueAggregateArgs>(args: Subset<T, SyncQueueAggregateArgs>): Prisma.PrismaPromise<GetSyncQueueAggregateType<T>>

    /**
     * Group by SyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncQueueGroupByArgs['orderBy'] }
        : { orderBy?: SyncQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncQueue model
   */
  readonly fields: SyncQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncQueue model
   */
  interface SyncQueueFieldRefs {
    readonly id: FieldRef<"SyncQueue", 'String'>
    readonly entityType: FieldRef<"SyncQueue", 'String'>
    readonly entityId: FieldRef<"SyncQueue", 'String'>
    readonly action: FieldRef<"SyncQueue", 'String'>
    readonly payload: FieldRef<"SyncQueue", 'Json'>
    readonly syncId: FieldRef<"SyncQueue", 'String'>
    readonly synced: FieldRef<"SyncQueue", 'Boolean'>
    readonly attempts: FieldRef<"SyncQueue", 'Int'>
    readonly lastError: FieldRef<"SyncQueue", 'String'>
    readonly createdAt: FieldRef<"SyncQueue", 'DateTime'>
    readonly syncedAt: FieldRef<"SyncQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncQueue findUnique
   */
  export type SyncQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue findUniqueOrThrow
   */
  export type SyncQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue findFirst
   */
  export type SyncQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncQueues.
     */
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue findFirstOrThrow
   */
  export type SyncQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncQueues.
     */
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue findMany
   */
  export type SyncQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueues to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue create
   */
  export type SyncQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncQueue.
     */
    data: XOR<SyncQueueCreateInput, SyncQueueUncheckedCreateInput>
  }

  /**
   * SyncQueue createMany
   */
  export type SyncQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncQueues.
     */
    data: SyncQueueCreateManyInput | SyncQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncQueue createManyAndReturn
   */
  export type SyncQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data used to create many SyncQueues.
     */
    data: SyncQueueCreateManyInput | SyncQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncQueue update
   */
  export type SyncQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncQueue.
     */
    data: XOR<SyncQueueUpdateInput, SyncQueueUncheckedUpdateInput>
    /**
     * Choose, which SyncQueue to update.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue updateMany
   */
  export type SyncQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncQueues.
     */
    data: XOR<SyncQueueUpdateManyMutationInput, SyncQueueUncheckedUpdateManyInput>
    /**
     * Filter which SyncQueues to update
     */
    where?: SyncQueueWhereInput
    /**
     * Limit how many SyncQueues to update.
     */
    limit?: number
  }

  /**
   * SyncQueue updateManyAndReturn
   */
  export type SyncQueueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data used to update SyncQueues.
     */
    data: XOR<SyncQueueUpdateManyMutationInput, SyncQueueUncheckedUpdateManyInput>
    /**
     * Filter which SyncQueues to update
     */
    where?: SyncQueueWhereInput
    /**
     * Limit how many SyncQueues to update.
     */
    limit?: number
  }

  /**
   * SyncQueue upsert
   */
  export type SyncQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncQueue to update in case it exists.
     */
    where: SyncQueueWhereUniqueInput
    /**
     * In case the SyncQueue found by the `where` argument doesn't exist, create a new SyncQueue with this data.
     */
    create: XOR<SyncQueueCreateInput, SyncQueueUncheckedCreateInput>
    /**
     * In case the SyncQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncQueueUpdateInput, SyncQueueUncheckedUpdateInput>
  }

  /**
   * SyncQueue delete
   */
  export type SyncQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter which SyncQueue to delete.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue deleteMany
   */
  export type SyncQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncQueues to delete
     */
    where?: SyncQueueWhereInput
    /**
     * Limit how many SyncQueues to delete.
     */
    limit?: number
  }

  /**
   * SyncQueue without action
   */
  export type SyncQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    phone: 'phone',
    active: 'active',
    commissionPct: 'commissionPct',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    cpf: 'cpf',
    rg: 'rg',
    address: 'address',
    phone1: 'phone1',
    phone2: 'phone2',
    creditScore: 'creditScore',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ClientPhotoScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    bucket: 'bucket',
    objectKey: 'objectKey',
    originalName: 'originalName',
    type: 'type',
    description: 'description',
    sizeBytes: 'sizeBytes',
    mimeType: 'mimeType',
    createdAt: 'createdAt'
  };

  export type ClientPhotoScalarFieldEnum = (typeof ClientPhotoScalarFieldEnum)[keyof typeof ClientPhotoScalarFieldEnum]


  export const LoanScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    collectorId: 'collectorId',
    amount: 'amount',
    interestRate: 'interestRate',
    totalWithInterest: 'totalWithInterest',
    frequency: 'frequency',
    totalInstallments: 'totalInstallments',
    installmentAmount: 'installmentAmount',
    status: 'status',
    commissionPct: 'commissionPct',
    commissionAmount: 'commissionAmount',
    lateFeeAmount: 'lateFeeAmount',
    lateFeeDays: 'lateFeeDays',
    startDate: 'startDate',
    endDate: 'endDate',
    previousLoanId: 'previousLoanId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoanScalarFieldEnum = (typeof LoanScalarFieldEnum)[keyof typeof LoanScalarFieldEnum]


  export const InstallmentScalarFieldEnum: {
    id: 'id',
    loanId: 'loanId',
    installmentNo: 'installmentNo',
    amount: 'amount',
    lateFee: 'lateFee',
    totalDue: 'totalDue',
    dueDate: 'dueDate',
    status: 'status',
    paidAmount: 'paidAmount',
    paidAt: 'paidAt',
    daysOverdue: 'daysOverdue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InstallmentScalarFieldEnum = (typeof InstallmentScalarFieldEnum)[keyof typeof InstallmentScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    installmentId: 'installmentId',
    collectorId: 'collectorId',
    amount: 'amount',
    method: 'method',
    receivedAt: 'receivedAt',
    notes: 'notes',
    syncId: 'syncId',
    createdAt: 'createdAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const CashMovementScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    paymentId: 'paymentId',
    type: 'type',
    amount: 'amount',
    description: 'description',
    date: 'date',
    createdAt: 'createdAt'
  };

  export type CashMovementScalarFieldEnum = (typeof CashMovementScalarFieldEnum)[keyof typeof CashMovementScalarFieldEnum]


  export const SystemConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    updatedAt: 'updatedAt'
  };

  export type SystemConfigScalarFieldEnum = (typeof SystemConfigScalarFieldEnum)[keyof typeof SystemConfigScalarFieldEnum]


  export const SyncQueueScalarFieldEnum: {
    id: 'id',
    entityType: 'entityType',
    entityId: 'entityId',
    action: 'action',
    payload: 'payload',
    syncId: 'syncId',
    synced: 'synced',
    attempts: 'attempts',
    lastError: 'lastError',
    createdAt: 'createdAt',
    syncedAt: 'syncedAt'
  };

  export type SyncQueueScalarFieldEnum = (typeof SyncQueueScalarFieldEnum)[keyof typeof SyncQueueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'LoanFrequency'
   */
  export type EnumLoanFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanFrequency'>
    


  /**
   * Reference to a field of type 'LoanFrequency[]'
   */
  export type ListEnumLoanFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanFrequency[]'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'InstallmentStatus'
   */
  export type EnumInstallmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstallmentStatus'>
    


  /**
   * Reference to a field of type 'InstallmentStatus[]'
   */
  export type ListEnumInstallmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstallmentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'CashMovementType'
   */
  export type EnumCashMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CashMovementType'>
    


  /**
   * Reference to a field of type 'CashMovementType[]'
   */
  export type ListEnumCashMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CashMovementType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    phone?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    commissionPct?: DecimalNullableFilter<"User"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    loans?: LoanListRelationFilter
    payments?: PaymentListRelationFilter
    cashMovements?: CashMovementListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    commissionPct?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loans?: LoanOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    cashMovements?: CashMovementOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    phone?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    commissionPct?: DecimalNullableFilter<"User"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    loans?: LoanListRelationFilter
    payments?: PaymentListRelationFilter
    cashMovements?: CashMovementListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    commissionPct?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    active?: BoolWithAggregatesFilter<"User"> | boolean
    commissionPct?: DecimalNullableWithAggregatesFilter<"User"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    cpf?: StringFilter<"Client"> | string
    rg?: StringFilter<"Client"> | string
    address?: StringFilter<"Client"> | string
    phone1?: StringFilter<"Client"> | string
    phone2?: StringNullableFilter<"Client"> | string | null
    creditScore?: IntFilter<"Client"> | number
    active?: BoolFilter<"Client"> | boolean
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    photos?: ClientPhotoListRelationFilter
    loans?: LoanListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    cpf?: SortOrder
    rg?: SortOrder
    address?: SortOrder
    phone1?: SortOrder
    phone2?: SortOrderInput | SortOrder
    creditScore?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    photos?: ClientPhotoOrderByRelationAggregateInput
    loans?: LoanOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cpf?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    rg?: StringFilter<"Client"> | string
    address?: StringFilter<"Client"> | string
    phone1?: StringFilter<"Client"> | string
    phone2?: StringNullableFilter<"Client"> | string | null
    creditScore?: IntFilter<"Client"> | number
    active?: BoolFilter<"Client"> | boolean
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    photos?: ClientPhotoListRelationFilter
    loans?: LoanListRelationFilter
  }, "id" | "cpf">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    cpf?: SortOrder
    rg?: SortOrder
    address?: SortOrder
    phone1?: SortOrder
    phone2?: SortOrderInput | SortOrder
    creditScore?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _avg?: ClientAvgOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
    _sum?: ClientSumOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    cpf?: StringWithAggregatesFilter<"Client"> | string
    rg?: StringWithAggregatesFilter<"Client"> | string
    address?: StringWithAggregatesFilter<"Client"> | string
    phone1?: StringWithAggregatesFilter<"Client"> | string
    phone2?: StringNullableWithAggregatesFilter<"Client"> | string | null
    creditScore?: IntWithAggregatesFilter<"Client"> | number
    active?: BoolWithAggregatesFilter<"Client"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type ClientPhotoWhereInput = {
    AND?: ClientPhotoWhereInput | ClientPhotoWhereInput[]
    OR?: ClientPhotoWhereInput[]
    NOT?: ClientPhotoWhereInput | ClientPhotoWhereInput[]
    id?: StringFilter<"ClientPhoto"> | string
    clientId?: StringFilter<"ClientPhoto"> | string
    bucket?: StringFilter<"ClientPhoto"> | string
    objectKey?: StringFilter<"ClientPhoto"> | string
    originalName?: StringFilter<"ClientPhoto"> | string
    type?: StringFilter<"ClientPhoto"> | string
    description?: StringNullableFilter<"ClientPhoto"> | string | null
    sizeBytes?: IntNullableFilter<"ClientPhoto"> | number | null
    mimeType?: StringNullableFilter<"ClientPhoto"> | string | null
    createdAt?: DateTimeFilter<"ClientPhoto"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type ClientPhotoOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    bucket?: SortOrder
    objectKey?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    sizeBytes?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    client?: ClientOrderByWithRelationInput
  }

  export type ClientPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientPhotoWhereInput | ClientPhotoWhereInput[]
    OR?: ClientPhotoWhereInput[]
    NOT?: ClientPhotoWhereInput | ClientPhotoWhereInput[]
    clientId?: StringFilter<"ClientPhoto"> | string
    bucket?: StringFilter<"ClientPhoto"> | string
    objectKey?: StringFilter<"ClientPhoto"> | string
    originalName?: StringFilter<"ClientPhoto"> | string
    type?: StringFilter<"ClientPhoto"> | string
    description?: StringNullableFilter<"ClientPhoto"> | string | null
    sizeBytes?: IntNullableFilter<"ClientPhoto"> | number | null
    mimeType?: StringNullableFilter<"ClientPhoto"> | string | null
    createdAt?: DateTimeFilter<"ClientPhoto"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id">

  export type ClientPhotoOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    bucket?: SortOrder
    objectKey?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    sizeBytes?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ClientPhotoCountOrderByAggregateInput
    _avg?: ClientPhotoAvgOrderByAggregateInput
    _max?: ClientPhotoMaxOrderByAggregateInput
    _min?: ClientPhotoMinOrderByAggregateInput
    _sum?: ClientPhotoSumOrderByAggregateInput
  }

  export type ClientPhotoScalarWhereWithAggregatesInput = {
    AND?: ClientPhotoScalarWhereWithAggregatesInput | ClientPhotoScalarWhereWithAggregatesInput[]
    OR?: ClientPhotoScalarWhereWithAggregatesInput[]
    NOT?: ClientPhotoScalarWhereWithAggregatesInput | ClientPhotoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClientPhoto"> | string
    clientId?: StringWithAggregatesFilter<"ClientPhoto"> | string
    bucket?: StringWithAggregatesFilter<"ClientPhoto"> | string
    objectKey?: StringWithAggregatesFilter<"ClientPhoto"> | string
    originalName?: StringWithAggregatesFilter<"ClientPhoto"> | string
    type?: StringWithAggregatesFilter<"ClientPhoto"> | string
    description?: StringNullableWithAggregatesFilter<"ClientPhoto"> | string | null
    sizeBytes?: IntNullableWithAggregatesFilter<"ClientPhoto"> | number | null
    mimeType?: StringNullableWithAggregatesFilter<"ClientPhoto"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ClientPhoto"> | Date | string
  }

  export type LoanWhereInput = {
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    id?: StringFilter<"Loan"> | string
    clientId?: StringFilter<"Loan"> | string
    collectorId?: StringFilter<"Loan"> | string
    amount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFilter<"Loan"> | $Enums.LoanFrequency
    totalInstallments?: IntFilter<"Loan"> | number
    installmentAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    commissionPct?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFilter<"Loan"> | number
    startDate?: DateTimeFilter<"Loan"> | Date | string
    endDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    previousLoanId?: StringNullableFilter<"Loan"> | string | null
    notes?: StringNullableFilter<"Loan"> | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    collector?: XOR<UserScalarRelationFilter, UserWhereInput>
    installments?: InstallmentListRelationFilter
    previousLoan?: XOR<LoanNullableScalarRelationFilter, LoanWhereInput> | null
    renewedLoan?: XOR<LoanNullableScalarRelationFilter, LoanWhereInput> | null
  }

  export type LoanOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    totalWithInterest?: SortOrder
    frequency?: SortOrder
    totalInstallments?: SortOrder
    installmentAmount?: SortOrder
    status?: SortOrder
    commissionPct?: SortOrder
    commissionAmount?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeDays?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    previousLoanId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    collector?: UserOrderByWithRelationInput
    installments?: InstallmentOrderByRelationAggregateInput
    previousLoan?: LoanOrderByWithRelationInput
    renewedLoan?: LoanOrderByWithRelationInput
  }

  export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    previousLoanId?: string
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    clientId?: StringFilter<"Loan"> | string
    collectorId?: StringFilter<"Loan"> | string
    amount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFilter<"Loan"> | $Enums.LoanFrequency
    totalInstallments?: IntFilter<"Loan"> | number
    installmentAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    commissionPct?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFilter<"Loan"> | number
    startDate?: DateTimeFilter<"Loan"> | Date | string
    endDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    notes?: StringNullableFilter<"Loan"> | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    collector?: XOR<UserScalarRelationFilter, UserWhereInput>
    installments?: InstallmentListRelationFilter
    previousLoan?: XOR<LoanNullableScalarRelationFilter, LoanWhereInput> | null
    renewedLoan?: XOR<LoanNullableScalarRelationFilter, LoanWhereInput> | null
  }, "id" | "previousLoanId">

  export type LoanOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    totalWithInterest?: SortOrder
    frequency?: SortOrder
    totalInstallments?: SortOrder
    installmentAmount?: SortOrder
    status?: SortOrder
    commissionPct?: SortOrder
    commissionAmount?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeDays?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    previousLoanId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoanCountOrderByAggregateInput
    _avg?: LoanAvgOrderByAggregateInput
    _max?: LoanMaxOrderByAggregateInput
    _min?: LoanMinOrderByAggregateInput
    _sum?: LoanSumOrderByAggregateInput
  }

  export type LoanScalarWhereWithAggregatesInput = {
    AND?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    OR?: LoanScalarWhereWithAggregatesInput[]
    NOT?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Loan"> | string
    clientId?: StringWithAggregatesFilter<"Loan"> | string
    collectorId?: StringWithAggregatesFilter<"Loan"> | string
    amount?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyWithAggregatesFilter<"Loan"> | $Enums.LoanFrequency
    totalInstallments?: IntWithAggregatesFilter<"Loan"> | number
    installmentAmount?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusWithAggregatesFilter<"Loan"> | $Enums.LoanStatus
    commissionPct?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntWithAggregatesFilter<"Loan"> | number
    startDate?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    previousLoanId?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
  }

  export type InstallmentWhereInput = {
    AND?: InstallmentWhereInput | InstallmentWhereInput[]
    OR?: InstallmentWhereInput[]
    NOT?: InstallmentWhereInput | InstallmentWhereInput[]
    id?: StringFilter<"Installment"> | string
    loanId?: StringFilter<"Installment"> | string
    installmentNo?: IntFilter<"Installment"> | number
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    status?: EnumInstallmentStatusFilter<"Installment"> | $Enums.InstallmentStatus
    paidAmount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeNullableFilter<"Installment"> | Date | string | null
    daysOverdue?: IntFilter<"Installment"> | number
    createdAt?: DateTimeFilter<"Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Installment"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    payments?: PaymentListRelationFilter
  }

  export type InstallmentOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNo?: SortOrder
    amount?: SortOrder
    lateFee?: SortOrder
    totalDue?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    daysOverdue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loan?: LoanOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type InstallmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InstallmentWhereInput | InstallmentWhereInput[]
    OR?: InstallmentWhereInput[]
    NOT?: InstallmentWhereInput | InstallmentWhereInput[]
    loanId?: StringFilter<"Installment"> | string
    installmentNo?: IntFilter<"Installment"> | number
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    status?: EnumInstallmentStatusFilter<"Installment"> | $Enums.InstallmentStatus
    paidAmount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeNullableFilter<"Installment"> | Date | string | null
    daysOverdue?: IntFilter<"Installment"> | number
    createdAt?: DateTimeFilter<"Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Installment"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    payments?: PaymentListRelationFilter
  }, "id">

  export type InstallmentOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNo?: SortOrder
    amount?: SortOrder
    lateFee?: SortOrder
    totalDue?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    daysOverdue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InstallmentCountOrderByAggregateInput
    _avg?: InstallmentAvgOrderByAggregateInput
    _max?: InstallmentMaxOrderByAggregateInput
    _min?: InstallmentMinOrderByAggregateInput
    _sum?: InstallmentSumOrderByAggregateInput
  }

  export type InstallmentScalarWhereWithAggregatesInput = {
    AND?: InstallmentScalarWhereWithAggregatesInput | InstallmentScalarWhereWithAggregatesInput[]
    OR?: InstallmentScalarWhereWithAggregatesInput[]
    NOT?: InstallmentScalarWhereWithAggregatesInput | InstallmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Installment"> | string
    loanId?: StringWithAggregatesFilter<"Installment"> | string
    installmentNo?: IntWithAggregatesFilter<"Installment"> | number
    amount?: DecimalWithAggregatesFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalWithAggregatesFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalWithAggregatesFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeWithAggregatesFilter<"Installment"> | Date | string
    status?: EnumInstallmentStatusWithAggregatesFilter<"Installment"> | $Enums.InstallmentStatus
    paidAmount?: DecimalWithAggregatesFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeNullableWithAggregatesFilter<"Installment"> | Date | string | null
    daysOverdue?: IntWithAggregatesFilter<"Installment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Installment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Installment"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    installmentId?: StringFilter<"Payment"> | string
    collectorId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    receivedAt?: DateTimeFilter<"Payment"> | Date | string
    notes?: StringNullableFilter<"Payment"> | string | null
    syncId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    installment?: XOR<InstallmentScalarRelationFilter, InstallmentWhereInput>
    collector?: XOR<UserScalarRelationFilter, UserWhereInput>
    cashMovement?: XOR<CashMovementNullableScalarRelationFilter, CashMovementWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    installmentId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    receivedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    syncId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    installment?: InstallmentOrderByWithRelationInput
    collector?: UserOrderByWithRelationInput
    cashMovement?: CashMovementOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    syncId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    installmentId?: StringFilter<"Payment"> | string
    collectorId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    receivedAt?: DateTimeFilter<"Payment"> | Date | string
    notes?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    installment?: XOR<InstallmentScalarRelationFilter, InstallmentWhereInput>
    collector?: XOR<UserScalarRelationFilter, UserWhereInput>
    cashMovement?: XOR<CashMovementNullableScalarRelationFilter, CashMovementWhereInput> | null
  }, "id" | "syncId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    installmentId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    receivedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    syncId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    installmentId?: StringWithAggregatesFilter<"Payment"> | string
    collectorId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod
    receivedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    syncId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type CashMovementWhereInput = {
    AND?: CashMovementWhereInput | CashMovementWhereInput[]
    OR?: CashMovementWhereInput[]
    NOT?: CashMovementWhereInput | CashMovementWhereInput[]
    id?: StringFilter<"CashMovement"> | string
    userId?: StringFilter<"CashMovement"> | string
    paymentId?: StringNullableFilter<"CashMovement"> | string | null
    type?: EnumCashMovementTypeFilter<"CashMovement"> | $Enums.CashMovementType
    amount?: DecimalFilter<"CashMovement"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"CashMovement"> | string | null
    date?: DateTimeFilter<"CashMovement"> | Date | string
    createdAt?: DateTimeFilter<"CashMovement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
  }

  export type CashMovementOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
  }

  export type CashMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentId?: string
    AND?: CashMovementWhereInput | CashMovementWhereInput[]
    OR?: CashMovementWhereInput[]
    NOT?: CashMovementWhereInput | CashMovementWhereInput[]
    userId?: StringFilter<"CashMovement"> | string
    type?: EnumCashMovementTypeFilter<"CashMovement"> | $Enums.CashMovementType
    amount?: DecimalFilter<"CashMovement"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"CashMovement"> | string | null
    date?: DateTimeFilter<"CashMovement"> | Date | string
    createdAt?: DateTimeFilter<"CashMovement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
  }, "id" | "paymentId">

  export type CashMovementOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    _count?: CashMovementCountOrderByAggregateInput
    _avg?: CashMovementAvgOrderByAggregateInput
    _max?: CashMovementMaxOrderByAggregateInput
    _min?: CashMovementMinOrderByAggregateInput
    _sum?: CashMovementSumOrderByAggregateInput
  }

  export type CashMovementScalarWhereWithAggregatesInput = {
    AND?: CashMovementScalarWhereWithAggregatesInput | CashMovementScalarWhereWithAggregatesInput[]
    OR?: CashMovementScalarWhereWithAggregatesInput[]
    NOT?: CashMovementScalarWhereWithAggregatesInput | CashMovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CashMovement"> | string
    userId?: StringWithAggregatesFilter<"CashMovement"> | string
    paymentId?: StringNullableWithAggregatesFilter<"CashMovement"> | string | null
    type?: EnumCashMovementTypeWithAggregatesFilter<"CashMovement"> | $Enums.CashMovementType
    amount?: DecimalWithAggregatesFilter<"CashMovement"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableWithAggregatesFilter<"CashMovement"> | string | null
    date?: DateTimeWithAggregatesFilter<"CashMovement"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"CashMovement"> | Date | string
  }

  export type SystemConfigWhereInput = {
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    id?: StringFilter<"SystemConfig"> | string
    key?: StringFilter<"SystemConfig"> | string
    value?: StringFilter<"SystemConfig"> | string
    description?: StringNullableFilter<"SystemConfig"> | string | null
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }

  export type SystemConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    value?: StringFilter<"SystemConfig"> | string
    description?: StringNullableFilter<"SystemConfig"> | string | null
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }, "id" | "key">

  export type SystemConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: SystemConfigCountOrderByAggregateInput
    _max?: SystemConfigMaxOrderByAggregateInput
    _min?: SystemConfigMinOrderByAggregateInput
  }

  export type SystemConfigScalarWhereWithAggregatesInput = {
    AND?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    OR?: SystemConfigScalarWhereWithAggregatesInput[]
    NOT?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemConfig"> | string
    key?: StringWithAggregatesFilter<"SystemConfig"> | string
    value?: StringWithAggregatesFilter<"SystemConfig"> | string
    description?: StringNullableWithAggregatesFilter<"SystemConfig"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
  }

  export type SyncQueueWhereInput = {
    AND?: SyncQueueWhereInput | SyncQueueWhereInput[]
    OR?: SyncQueueWhereInput[]
    NOT?: SyncQueueWhereInput | SyncQueueWhereInput[]
    id?: StringFilter<"SyncQueue"> | string
    entityType?: StringFilter<"SyncQueue"> | string
    entityId?: StringFilter<"SyncQueue"> | string
    action?: StringFilter<"SyncQueue"> | string
    payload?: JsonFilter<"SyncQueue">
    syncId?: StringFilter<"SyncQueue"> | string
    synced?: BoolFilter<"SyncQueue"> | boolean
    attempts?: IntFilter<"SyncQueue"> | number
    lastError?: StringNullableFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeFilter<"SyncQueue"> | Date | string
    syncedAt?: DateTimeNullableFilter<"SyncQueue"> | Date | string | null
  }

  export type SyncQueueOrderByWithRelationInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    payload?: SortOrder
    syncId?: SortOrder
    synced?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
  }

  export type SyncQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    syncId?: string
    AND?: SyncQueueWhereInput | SyncQueueWhereInput[]
    OR?: SyncQueueWhereInput[]
    NOT?: SyncQueueWhereInput | SyncQueueWhereInput[]
    entityType?: StringFilter<"SyncQueue"> | string
    entityId?: StringFilter<"SyncQueue"> | string
    action?: StringFilter<"SyncQueue"> | string
    payload?: JsonFilter<"SyncQueue">
    synced?: BoolFilter<"SyncQueue"> | boolean
    attempts?: IntFilter<"SyncQueue"> | number
    lastError?: StringNullableFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeFilter<"SyncQueue"> | Date | string
    syncedAt?: DateTimeNullableFilter<"SyncQueue"> | Date | string | null
  }, "id" | "syncId">

  export type SyncQueueOrderByWithAggregationInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    payload?: SortOrder
    syncId?: SortOrder
    synced?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    _count?: SyncQueueCountOrderByAggregateInput
    _avg?: SyncQueueAvgOrderByAggregateInput
    _max?: SyncQueueMaxOrderByAggregateInput
    _min?: SyncQueueMinOrderByAggregateInput
    _sum?: SyncQueueSumOrderByAggregateInput
  }

  export type SyncQueueScalarWhereWithAggregatesInput = {
    AND?: SyncQueueScalarWhereWithAggregatesInput | SyncQueueScalarWhereWithAggregatesInput[]
    OR?: SyncQueueScalarWhereWithAggregatesInput[]
    NOT?: SyncQueueScalarWhereWithAggregatesInput | SyncQueueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncQueue"> | string
    entityType?: StringWithAggregatesFilter<"SyncQueue"> | string
    entityId?: StringWithAggregatesFilter<"SyncQueue"> | string
    action?: StringWithAggregatesFilter<"SyncQueue"> | string
    payload?: JsonWithAggregatesFilter<"SyncQueue">
    syncId?: StringWithAggregatesFilter<"SyncQueue"> | string
    synced?: BoolWithAggregatesFilter<"SyncQueue"> | boolean
    attempts?: IntWithAggregatesFilter<"SyncQueue"> | number
    lastError?: StringNullableWithAggregatesFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SyncQueue"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"SyncQueue"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutCollectorInput
    payments?: PaymentCreateNestedManyWithoutCollectorInput
    cashMovements?: CashMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutCollectorInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCollectorInput
    cashMovements?: CashMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutCollectorNestedInput
    payments?: PaymentUpdateManyWithoutCollectorNestedInput
    cashMovements?: CashMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutCollectorNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCollectorNestedInput
    cashMovements?: CashMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2?: string | null
    creditScore?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ClientPhotoCreateNestedManyWithoutClientInput
    loans?: LoanCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2?: string | null
    creditScore?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ClientPhotoUncheckedCreateNestedManyWithoutClientInput
    loans?: LoanUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ClientPhotoUpdateManyWithoutClientNestedInput
    loans?: LoanUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ClientPhotoUncheckedUpdateManyWithoutClientNestedInput
    loans?: LoanUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2?: string | null
    creditScore?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientPhotoCreateInput = {
    id?: string
    bucket?: string
    objectKey: string
    originalName: string
    type: string
    description?: string | null
    sizeBytes?: number | null
    mimeType?: string | null
    createdAt?: Date | string
    client: ClientCreateNestedOneWithoutPhotosInput
  }

  export type ClientPhotoUncheckedCreateInput = {
    id?: string
    clientId: string
    bucket?: string
    objectKey: string
    originalName: string
    type: string
    description?: string | null
    sizeBytes?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type ClientPhotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type ClientPhotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientPhotoCreateManyInput = {
    id?: string
    clientId: string
    bucket?: string
    objectKey: string
    originalName: string
    type: string
    description?: string | null
    sizeBytes?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type ClientPhotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientPhotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutLoansInput
    collector: UserCreateNestedOneWithoutLoansInput
    installments?: InstallmentCreateNestedManyWithoutLoanInput
    previousLoan?: LoanCreateNestedOneWithoutRenewedLoanInput
    renewedLoan?: LoanCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanUncheckedCreateInput = {
    id?: string
    clientId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutLoanInput
    renewedLoan?: LoanUncheckedCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutLoansNestedInput
    collector?: UserUpdateOneRequiredWithoutLoansNestedInput
    installments?: InstallmentUpdateManyWithoutLoanNestedInput
    previousLoan?: LoanUpdateOneWithoutRenewedLoanNestedInput
    renewedLoan?: LoanUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutLoanNestedInput
    renewedLoan?: LoanUncheckedUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanCreateManyInput = {
    id?: string
    clientId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateInput = {
    id?: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    loan: LoanCreateNestedOneWithoutInstallmentsInput
    payments?: PaymentCreateNestedManyWithoutInstallmentInput
  }

  export type InstallmentUncheckedCreateInput = {
    id?: string
    loanId: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutInstallmentInput
  }

  export type InstallmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutInstallmentsNestedInput
    payments?: PaymentUpdateManyWithoutInstallmentNestedInput
  }

  export type InstallmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutInstallmentNestedInput
  }

  export type InstallmentCreateManyInput = {
    id?: string
    loanId: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
    installment: InstallmentCreateNestedOneWithoutPaymentsInput
    collector: UserCreateNestedOneWithoutPaymentsInput
    cashMovement?: CashMovementCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    installmentId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
    cashMovement?: CashMovementUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installment?: InstallmentUpdateOneRequiredWithoutPaymentsNestedInput
    collector?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    cashMovement?: CashMovementUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cashMovement?: CashMovementUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    installmentId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashMovementCreateInput = {
    id?: string
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCashMovementsInput
    payment?: PaymentCreateNestedOneWithoutCashMovementInput
  }

  export type CashMovementUncheckedCreateInput = {
    id?: string
    userId: string
    paymentId?: string | null
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type CashMovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCashMovementsNestedInput
    payment?: PaymentUpdateOneWithoutCashMovementNestedInput
  }

  export type CashMovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashMovementCreateManyInput = {
    id?: string
    userId: string
    paymentId?: string | null
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type CashMovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashMovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateInput = {
    id?: string
    key: string
    value: string
    description?: string | null
    updatedAt?: Date | string
  }

  export type SystemConfigUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    description?: string | null
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateManyInput = {
    id?: string
    key: string
    value: string
    description?: string | null
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncQueueCreateInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    syncId: string
    synced?: boolean
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    syncedAt?: Date | string | null
  }

  export type SyncQueueUncheckedCreateInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    syncId: string
    synced?: boolean
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    syncedAt?: Date | string | null
  }

  export type SyncQueueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    syncId?: StringFieldUpdateOperationsInput | string
    synced?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncQueueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    syncId?: StringFieldUpdateOperationsInput | string
    synced?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncQueueCreateManyInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    syncId: string
    synced?: boolean
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    syncedAt?: Date | string | null
  }

  export type SyncQueueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    syncId?: StringFieldUpdateOperationsInput | string
    synced?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncQueueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    syncId?: StringFieldUpdateOperationsInput | string
    synced?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LoanListRelationFilter = {
    every?: LoanWhereInput
    some?: LoanWhereInput
    none?: LoanWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type CashMovementListRelationFilter = {
    every?: CashMovementWhereInput
    some?: CashMovementWhereInput
    none?: CashMovementWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LoanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CashMovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    commissionPct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    commissionPct?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    commissionPct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    commissionPct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    commissionPct?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ClientPhotoListRelationFilter = {
    every?: ClientPhotoWhereInput
    some?: ClientPhotoWhereInput
    none?: ClientPhotoWhereInput
  }

  export type ClientPhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cpf?: SortOrder
    rg?: SortOrder
    address?: SortOrder
    phone1?: SortOrder
    phone2?: SortOrder
    creditScore?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientAvgOrderByAggregateInput = {
    creditScore?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cpf?: SortOrder
    rg?: SortOrder
    address?: SortOrder
    phone1?: SortOrder
    phone2?: SortOrder
    creditScore?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cpf?: SortOrder
    rg?: SortOrder
    address?: SortOrder
    phone1?: SortOrder
    phone2?: SortOrder
    creditScore?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientSumOrderByAggregateInput = {
    creditScore?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type ClientPhotoCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    bucket?: SortOrder
    objectKey?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    description?: SortOrder
    sizeBytes?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientPhotoAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type ClientPhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    bucket?: SortOrder
    objectKey?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    description?: SortOrder
    sizeBytes?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientPhotoMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    bucket?: SortOrder
    objectKey?: SortOrder
    originalName?: SortOrder
    type?: SortOrder
    description?: SortOrder
    sizeBytes?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientPhotoSumOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumLoanFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanFrequency | EnumLoanFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanFrequencyFilter<$PrismaModel> | $Enums.LoanFrequency
  }

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type InstallmentListRelationFilter = {
    every?: InstallmentWhereInput
    some?: InstallmentWhereInput
    none?: InstallmentWhereInput
  }

  export type LoanNullableScalarRelationFilter = {
    is?: LoanWhereInput | null
    isNot?: LoanWhereInput | null
  }

  export type InstallmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    totalWithInterest?: SortOrder
    frequency?: SortOrder
    totalInstallments?: SortOrder
    installmentAmount?: SortOrder
    status?: SortOrder
    commissionPct?: SortOrder
    commissionAmount?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeDays?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    previousLoanId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanAvgOrderByAggregateInput = {
    amount?: SortOrder
    interestRate?: SortOrder
    totalWithInterest?: SortOrder
    totalInstallments?: SortOrder
    installmentAmount?: SortOrder
    commissionPct?: SortOrder
    commissionAmount?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeDays?: SortOrder
  }

  export type LoanMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    totalWithInterest?: SortOrder
    frequency?: SortOrder
    totalInstallments?: SortOrder
    installmentAmount?: SortOrder
    status?: SortOrder
    commissionPct?: SortOrder
    commissionAmount?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeDays?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    previousLoanId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    totalWithInterest?: SortOrder
    frequency?: SortOrder
    totalInstallments?: SortOrder
    installmentAmount?: SortOrder
    status?: SortOrder
    commissionPct?: SortOrder
    commissionAmount?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeDays?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    previousLoanId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanSumOrderByAggregateInput = {
    amount?: SortOrder
    interestRate?: SortOrder
    totalWithInterest?: SortOrder
    totalInstallments?: SortOrder
    installmentAmount?: SortOrder
    commissionPct?: SortOrder
    commissionAmount?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeDays?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumLoanFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanFrequency | EnumLoanFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.LoanFrequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanFrequencyFilter<$PrismaModel>
    _max?: NestedEnumLoanFrequencyFilter<$PrismaModel>
  }

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumInstallmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusFilter<$PrismaModel> | $Enums.InstallmentStatus
  }

  export type LoanScalarRelationFilter = {
    is?: LoanWhereInput
    isNot?: LoanWhereInput
  }

  export type InstallmentCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNo?: SortOrder
    amount?: SortOrder
    lateFee?: SortOrder
    totalDue?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    daysOverdue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentAvgOrderByAggregateInput = {
    installmentNo?: SortOrder
    amount?: SortOrder
    lateFee?: SortOrder
    totalDue?: SortOrder
    paidAmount?: SortOrder
    daysOverdue?: SortOrder
  }

  export type InstallmentMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNo?: SortOrder
    amount?: SortOrder
    lateFee?: SortOrder
    totalDue?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    daysOverdue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNo?: SortOrder
    amount?: SortOrder
    lateFee?: SortOrder
    totalDue?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    daysOverdue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentSumOrderByAggregateInput = {
    installmentNo?: SortOrder
    amount?: SortOrder
    lateFee?: SortOrder
    totalDue?: SortOrder
    paidAmount?: SortOrder
    daysOverdue?: SortOrder
  }

  export type EnumInstallmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstallmentStatusFilter<$PrismaModel>
    _max?: NestedEnumInstallmentStatusFilter<$PrismaModel>
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type InstallmentScalarRelationFilter = {
    is?: InstallmentWhereInput
    isNot?: InstallmentWhereInput
  }

  export type CashMovementNullableScalarRelationFilter = {
    is?: CashMovementWhereInput | null
    isNot?: CashMovementWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    installmentId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    receivedAt?: SortOrder
    notes?: SortOrder
    syncId?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    installmentId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    receivedAt?: SortOrder
    notes?: SortOrder
    syncId?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    installmentId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    receivedAt?: SortOrder
    notes?: SortOrder
    syncId?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumCashMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CashMovementType | EnumCashMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashMovementTypeFilter<$PrismaModel> | $Enums.CashMovementType
  }

  export type PaymentNullableScalarRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type CashMovementCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type CashMovementAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CashMovementMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type CashMovementMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type CashMovementSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumCashMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CashMovementType | EnumCashMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.CashMovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCashMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumCashMovementTypeFilter<$PrismaModel>
  }

  export type SystemConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SyncQueueCountOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    payload?: SortOrder
    syncId?: SortOrder
    synced?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type SyncQueueAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type SyncQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    syncId?: SortOrder
    synced?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type SyncQueueMinOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    syncId?: SortOrder
    synced?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type SyncQueueSumOrderByAggregateInput = {
    attempts?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type LoanCreateNestedManyWithoutCollectorInput = {
    create?: XOR<LoanCreateWithoutCollectorInput, LoanUncheckedCreateWithoutCollectorInput> | LoanCreateWithoutCollectorInput[] | LoanUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCollectorInput | LoanCreateOrConnectWithoutCollectorInput[]
    createMany?: LoanCreateManyCollectorInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutCollectorInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CashMovementCreateNestedManyWithoutUserInput = {
    create?: XOR<CashMovementCreateWithoutUserInput, CashMovementUncheckedCreateWithoutUserInput> | CashMovementCreateWithoutUserInput[] | CashMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CashMovementCreateOrConnectWithoutUserInput | CashMovementCreateOrConnectWithoutUserInput[]
    createMany?: CashMovementCreateManyUserInputEnvelope
    connect?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutCollectorInput = {
    create?: XOR<LoanCreateWithoutCollectorInput, LoanUncheckedCreateWithoutCollectorInput> | LoanCreateWithoutCollectorInput[] | LoanUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCollectorInput | LoanCreateOrConnectWithoutCollectorInput[]
    createMany?: LoanCreateManyCollectorInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutCollectorInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CashMovementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CashMovementCreateWithoutUserInput, CashMovementUncheckedCreateWithoutUserInput> | CashMovementCreateWithoutUserInput[] | CashMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CashMovementCreateOrConnectWithoutUserInput | CashMovementCreateOrConnectWithoutUserInput[]
    createMany?: CashMovementCreateManyUserInputEnvelope
    connect?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LoanUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<LoanCreateWithoutCollectorInput, LoanUncheckedCreateWithoutCollectorInput> | LoanCreateWithoutCollectorInput[] | LoanUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCollectorInput | LoanCreateOrConnectWithoutCollectorInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutCollectorInput | LoanUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: LoanCreateManyCollectorInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutCollectorInput | LoanUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutCollectorInput | LoanUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCollectorInput | PaymentUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCollectorInput | PaymentUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCollectorInput | PaymentUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CashMovementUpdateManyWithoutUserNestedInput = {
    create?: XOR<CashMovementCreateWithoutUserInput, CashMovementUncheckedCreateWithoutUserInput> | CashMovementCreateWithoutUserInput[] | CashMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CashMovementCreateOrConnectWithoutUserInput | CashMovementCreateOrConnectWithoutUserInput[]
    upsert?: CashMovementUpsertWithWhereUniqueWithoutUserInput | CashMovementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CashMovementCreateManyUserInputEnvelope
    set?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    disconnect?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    delete?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    connect?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    update?: CashMovementUpdateWithWhereUniqueWithoutUserInput | CashMovementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CashMovementUpdateManyWithWhereWithoutUserInput | CashMovementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CashMovementScalarWhereInput | CashMovementScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<LoanCreateWithoutCollectorInput, LoanUncheckedCreateWithoutCollectorInput> | LoanCreateWithoutCollectorInput[] | LoanUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCollectorInput | LoanCreateOrConnectWithoutCollectorInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutCollectorInput | LoanUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: LoanCreateManyCollectorInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutCollectorInput | LoanUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutCollectorInput | LoanUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCollectorInput | PaymentUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCollectorInput | PaymentUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCollectorInput | PaymentUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CashMovementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CashMovementCreateWithoutUserInput, CashMovementUncheckedCreateWithoutUserInput> | CashMovementCreateWithoutUserInput[] | CashMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CashMovementCreateOrConnectWithoutUserInput | CashMovementCreateOrConnectWithoutUserInput[]
    upsert?: CashMovementUpsertWithWhereUniqueWithoutUserInput | CashMovementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CashMovementCreateManyUserInputEnvelope
    set?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    disconnect?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    delete?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    connect?: CashMovementWhereUniqueInput | CashMovementWhereUniqueInput[]
    update?: CashMovementUpdateWithWhereUniqueWithoutUserInput | CashMovementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CashMovementUpdateManyWithWhereWithoutUserInput | CashMovementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CashMovementScalarWhereInput | CashMovementScalarWhereInput[]
  }

  export type ClientPhotoCreateNestedManyWithoutClientInput = {
    create?: XOR<ClientPhotoCreateWithoutClientInput, ClientPhotoUncheckedCreateWithoutClientInput> | ClientPhotoCreateWithoutClientInput[] | ClientPhotoUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientPhotoCreateOrConnectWithoutClientInput | ClientPhotoCreateOrConnectWithoutClientInput[]
    createMany?: ClientPhotoCreateManyClientInputEnvelope
    connect?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
  }

  export type LoanCreateNestedManyWithoutClientInput = {
    create?: XOR<LoanCreateWithoutClientInput, LoanUncheckedCreateWithoutClientInput> | LoanCreateWithoutClientInput[] | LoanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutClientInput | LoanCreateOrConnectWithoutClientInput[]
    createMany?: LoanCreateManyClientInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type ClientPhotoUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ClientPhotoCreateWithoutClientInput, ClientPhotoUncheckedCreateWithoutClientInput> | ClientPhotoCreateWithoutClientInput[] | ClientPhotoUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientPhotoCreateOrConnectWithoutClientInput | ClientPhotoCreateOrConnectWithoutClientInput[]
    createMany?: ClientPhotoCreateManyClientInputEnvelope
    connect?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<LoanCreateWithoutClientInput, LoanUncheckedCreateWithoutClientInput> | LoanCreateWithoutClientInput[] | LoanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutClientInput | LoanCreateOrConnectWithoutClientInput[]
    createMany?: LoanCreateManyClientInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClientPhotoUpdateManyWithoutClientNestedInput = {
    create?: XOR<ClientPhotoCreateWithoutClientInput, ClientPhotoUncheckedCreateWithoutClientInput> | ClientPhotoCreateWithoutClientInput[] | ClientPhotoUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientPhotoCreateOrConnectWithoutClientInput | ClientPhotoCreateOrConnectWithoutClientInput[]
    upsert?: ClientPhotoUpsertWithWhereUniqueWithoutClientInput | ClientPhotoUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ClientPhotoCreateManyClientInputEnvelope
    set?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    disconnect?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    delete?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    connect?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    update?: ClientPhotoUpdateWithWhereUniqueWithoutClientInput | ClientPhotoUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ClientPhotoUpdateManyWithWhereWithoutClientInput | ClientPhotoUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ClientPhotoScalarWhereInput | ClientPhotoScalarWhereInput[]
  }

  export type LoanUpdateManyWithoutClientNestedInput = {
    create?: XOR<LoanCreateWithoutClientInput, LoanUncheckedCreateWithoutClientInput> | LoanCreateWithoutClientInput[] | LoanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutClientInput | LoanCreateOrConnectWithoutClientInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutClientInput | LoanUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: LoanCreateManyClientInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutClientInput | LoanUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutClientInput | LoanUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type ClientPhotoUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ClientPhotoCreateWithoutClientInput, ClientPhotoUncheckedCreateWithoutClientInput> | ClientPhotoCreateWithoutClientInput[] | ClientPhotoUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ClientPhotoCreateOrConnectWithoutClientInput | ClientPhotoCreateOrConnectWithoutClientInput[]
    upsert?: ClientPhotoUpsertWithWhereUniqueWithoutClientInput | ClientPhotoUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ClientPhotoCreateManyClientInputEnvelope
    set?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    disconnect?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    delete?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    connect?: ClientPhotoWhereUniqueInput | ClientPhotoWhereUniqueInput[]
    update?: ClientPhotoUpdateWithWhereUniqueWithoutClientInput | ClientPhotoUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ClientPhotoUpdateManyWithWhereWithoutClientInput | ClientPhotoUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ClientPhotoScalarWhereInput | ClientPhotoScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<LoanCreateWithoutClientInput, LoanUncheckedCreateWithoutClientInput> | LoanCreateWithoutClientInput[] | LoanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutClientInput | LoanCreateOrConnectWithoutClientInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutClientInput | LoanUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: LoanCreateManyClientInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutClientInput | LoanUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutClientInput | LoanUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutPhotosInput = {
    create?: XOR<ClientCreateWithoutPhotosInput, ClientUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPhotosInput
    connect?: ClientWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClientUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<ClientCreateWithoutPhotosInput, ClientUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPhotosInput
    upsert?: ClientUpsertWithoutPhotosInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutPhotosInput, ClientUpdateWithoutPhotosInput>, ClientUncheckedUpdateWithoutPhotosInput>
  }

  export type ClientCreateNestedOneWithoutLoansInput = {
    create?: XOR<ClientCreateWithoutLoansInput, ClientUncheckedCreateWithoutLoansInput>
    connectOrCreate?: ClientCreateOrConnectWithoutLoansInput
    connect?: ClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLoansInput = {
    create?: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansInput
    connect?: UserWhereUniqueInput
  }

  export type InstallmentCreateNestedManyWithoutLoanInput = {
    create?: XOR<InstallmentCreateWithoutLoanInput, InstallmentUncheckedCreateWithoutLoanInput> | InstallmentCreateWithoutLoanInput[] | InstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutLoanInput | InstallmentCreateOrConnectWithoutLoanInput[]
    createMany?: InstallmentCreateManyLoanInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type LoanCreateNestedOneWithoutRenewedLoanInput = {
    create?: XOR<LoanCreateWithoutRenewedLoanInput, LoanUncheckedCreateWithoutRenewedLoanInput>
    connectOrCreate?: LoanCreateOrConnectWithoutRenewedLoanInput
    connect?: LoanWhereUniqueInput
  }

  export type LoanCreateNestedOneWithoutPreviousLoanInput = {
    create?: XOR<LoanCreateWithoutPreviousLoanInput, LoanUncheckedCreateWithoutPreviousLoanInput>
    connectOrCreate?: LoanCreateOrConnectWithoutPreviousLoanInput
    connect?: LoanWhereUniqueInput
  }

  export type InstallmentUncheckedCreateNestedManyWithoutLoanInput = {
    create?: XOR<InstallmentCreateWithoutLoanInput, InstallmentUncheckedCreateWithoutLoanInput> | InstallmentCreateWithoutLoanInput[] | InstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutLoanInput | InstallmentCreateOrConnectWithoutLoanInput[]
    createMany?: InstallmentCreateManyLoanInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedOneWithoutPreviousLoanInput = {
    create?: XOR<LoanCreateWithoutPreviousLoanInput, LoanUncheckedCreateWithoutPreviousLoanInput>
    connectOrCreate?: LoanCreateOrConnectWithoutPreviousLoanInput
    connect?: LoanWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumLoanFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.LoanFrequency
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ClientUpdateOneRequiredWithoutLoansNestedInput = {
    create?: XOR<ClientCreateWithoutLoansInput, ClientUncheckedCreateWithoutLoansInput>
    connectOrCreate?: ClientCreateOrConnectWithoutLoansInput
    upsert?: ClientUpsertWithoutLoansInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutLoansInput, ClientUpdateWithoutLoansInput>, ClientUncheckedUpdateWithoutLoansInput>
  }

  export type UserUpdateOneRequiredWithoutLoansNestedInput = {
    create?: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansInput
    upsert?: UserUpsertWithoutLoansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLoansInput, UserUpdateWithoutLoansInput>, UserUncheckedUpdateWithoutLoansInput>
  }

  export type InstallmentUpdateManyWithoutLoanNestedInput = {
    create?: XOR<InstallmentCreateWithoutLoanInput, InstallmentUncheckedCreateWithoutLoanInput> | InstallmentCreateWithoutLoanInput[] | InstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutLoanInput | InstallmentCreateOrConnectWithoutLoanInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutLoanInput | InstallmentUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: InstallmentCreateManyLoanInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutLoanInput | InstallmentUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutLoanInput | InstallmentUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type LoanUpdateOneWithoutRenewedLoanNestedInput = {
    create?: XOR<LoanCreateWithoutRenewedLoanInput, LoanUncheckedCreateWithoutRenewedLoanInput>
    connectOrCreate?: LoanCreateOrConnectWithoutRenewedLoanInput
    upsert?: LoanUpsertWithoutRenewedLoanInput
    disconnect?: LoanWhereInput | boolean
    delete?: LoanWhereInput | boolean
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutRenewedLoanInput, LoanUpdateWithoutRenewedLoanInput>, LoanUncheckedUpdateWithoutRenewedLoanInput>
  }

  export type LoanUpdateOneWithoutPreviousLoanNestedInput = {
    create?: XOR<LoanCreateWithoutPreviousLoanInput, LoanUncheckedCreateWithoutPreviousLoanInput>
    connectOrCreate?: LoanCreateOrConnectWithoutPreviousLoanInput
    upsert?: LoanUpsertWithoutPreviousLoanInput
    disconnect?: LoanWhereInput | boolean
    delete?: LoanWhereInput | boolean
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutPreviousLoanInput, LoanUpdateWithoutPreviousLoanInput>, LoanUncheckedUpdateWithoutPreviousLoanInput>
  }

  export type InstallmentUncheckedUpdateManyWithoutLoanNestedInput = {
    create?: XOR<InstallmentCreateWithoutLoanInput, InstallmentUncheckedCreateWithoutLoanInput> | InstallmentCreateWithoutLoanInput[] | InstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutLoanInput | InstallmentCreateOrConnectWithoutLoanInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutLoanInput | InstallmentUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: InstallmentCreateManyLoanInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutLoanInput | InstallmentUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutLoanInput | InstallmentUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type LoanUncheckedUpdateOneWithoutPreviousLoanNestedInput = {
    create?: XOR<LoanCreateWithoutPreviousLoanInput, LoanUncheckedCreateWithoutPreviousLoanInput>
    connectOrCreate?: LoanCreateOrConnectWithoutPreviousLoanInput
    upsert?: LoanUpsertWithoutPreviousLoanInput
    disconnect?: LoanWhereInput | boolean
    delete?: LoanWhereInput | boolean
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutPreviousLoanInput, LoanUpdateWithoutPreviousLoanInput>, LoanUncheckedUpdateWithoutPreviousLoanInput>
  }

  export type LoanCreateNestedOneWithoutInstallmentsInput = {
    create?: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutInstallmentsInput
    connect?: LoanWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutInstallmentInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutInstallmentInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EnumInstallmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.InstallmentStatus
  }

  export type LoanUpdateOneRequiredWithoutInstallmentsNestedInput = {
    create?: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutInstallmentsInput
    upsert?: LoanUpsertWithoutInstallmentsInput
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutInstallmentsInput, LoanUpdateWithoutInstallmentsInput>, LoanUncheckedUpdateWithoutInstallmentsInput>
  }

  export type PaymentUpdateManyWithoutInstallmentNestedInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutInstallmentInput | PaymentUpsertWithWhereUniqueWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutInstallmentInput | PaymentUpdateWithWhereUniqueWithoutInstallmentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutInstallmentInput | PaymentUpdateManyWithWhereWithoutInstallmentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutInstallmentNestedInput = {
    create?: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput> | PaymentCreateWithoutInstallmentInput[] | PaymentUncheckedCreateWithoutInstallmentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutInstallmentInput | PaymentCreateOrConnectWithoutInstallmentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutInstallmentInput | PaymentUpsertWithWhereUniqueWithoutInstallmentInput[]
    createMany?: PaymentCreateManyInstallmentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutInstallmentInput | PaymentUpdateWithWhereUniqueWithoutInstallmentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutInstallmentInput | PaymentUpdateManyWithWhereWithoutInstallmentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type InstallmentCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: InstallmentCreateOrConnectWithoutPaymentsInput
    connect?: InstallmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type CashMovementCreateNestedOneWithoutPaymentInput = {
    create?: XOR<CashMovementCreateWithoutPaymentInput, CashMovementUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: CashMovementCreateOrConnectWithoutPaymentInput
    connect?: CashMovementWhereUniqueInput
  }

  export type CashMovementUncheckedCreateNestedOneWithoutPaymentInput = {
    create?: XOR<CashMovementCreateWithoutPaymentInput, CashMovementUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: CashMovementCreateOrConnectWithoutPaymentInput
    connect?: CashMovementWhereUniqueInput
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type InstallmentUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: InstallmentCreateOrConnectWithoutPaymentsInput
    upsert?: InstallmentUpsertWithoutPaymentsInput
    connect?: InstallmentWhereUniqueInput
    update?: XOR<XOR<InstallmentUpdateToOneWithWhereWithoutPaymentsInput, InstallmentUpdateWithoutPaymentsInput>, InstallmentUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type CashMovementUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<CashMovementCreateWithoutPaymentInput, CashMovementUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: CashMovementCreateOrConnectWithoutPaymentInput
    upsert?: CashMovementUpsertWithoutPaymentInput
    disconnect?: CashMovementWhereInput | boolean
    delete?: CashMovementWhereInput | boolean
    connect?: CashMovementWhereUniqueInput
    update?: XOR<XOR<CashMovementUpdateToOneWithWhereWithoutPaymentInput, CashMovementUpdateWithoutPaymentInput>, CashMovementUncheckedUpdateWithoutPaymentInput>
  }

  export type CashMovementUncheckedUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<CashMovementCreateWithoutPaymentInput, CashMovementUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: CashMovementCreateOrConnectWithoutPaymentInput
    upsert?: CashMovementUpsertWithoutPaymentInput
    disconnect?: CashMovementWhereInput | boolean
    delete?: CashMovementWhereInput | boolean
    connect?: CashMovementWhereUniqueInput
    update?: XOR<XOR<CashMovementUpdateToOneWithWhereWithoutPaymentInput, CashMovementUpdateWithoutPaymentInput>, CashMovementUncheckedUpdateWithoutPaymentInput>
  }

  export type UserCreateNestedOneWithoutCashMovementsInput = {
    create?: XOR<UserCreateWithoutCashMovementsInput, UserUncheckedCreateWithoutCashMovementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCashMovementsInput
    connect?: UserWhereUniqueInput
  }

  export type PaymentCreateNestedOneWithoutCashMovementInput = {
    create?: XOR<PaymentCreateWithoutCashMovementInput, PaymentUncheckedCreateWithoutCashMovementInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutCashMovementInput
    connect?: PaymentWhereUniqueInput
  }

  export type EnumCashMovementTypeFieldUpdateOperationsInput = {
    set?: $Enums.CashMovementType
  }

  export type UserUpdateOneRequiredWithoutCashMovementsNestedInput = {
    create?: XOR<UserCreateWithoutCashMovementsInput, UserUncheckedCreateWithoutCashMovementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCashMovementsInput
    upsert?: UserUpsertWithoutCashMovementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCashMovementsInput, UserUpdateWithoutCashMovementsInput>, UserUncheckedUpdateWithoutCashMovementsInput>
  }

  export type PaymentUpdateOneWithoutCashMovementNestedInput = {
    create?: XOR<PaymentCreateWithoutCashMovementInput, PaymentUncheckedCreateWithoutCashMovementInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutCashMovementInput
    upsert?: PaymentUpsertWithoutCashMovementInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutCashMovementInput, PaymentUpdateWithoutCashMovementInput>, PaymentUncheckedUpdateWithoutCashMovementInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumLoanFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanFrequency | EnumLoanFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanFrequencyFilter<$PrismaModel> | $Enums.LoanFrequency
  }

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumLoanFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanFrequency | EnumLoanFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanFrequency[] | ListEnumLoanFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.LoanFrequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanFrequencyFilter<$PrismaModel>
    _max?: NestedEnumLoanFrequencyFilter<$PrismaModel>
  }

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumInstallmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusFilter<$PrismaModel> | $Enums.InstallmentStatus
  }

  export type NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstallmentStatusFilter<$PrismaModel>
    _max?: NestedEnumInstallmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumCashMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CashMovementType | EnumCashMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashMovementTypeFilter<$PrismaModel> | $Enums.CashMovementType
  }

  export type NestedEnumCashMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CashMovementType | EnumCashMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashMovementType[] | ListEnumCashMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.CashMovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCashMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumCashMovementTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LoanCreateWithoutCollectorInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutLoansInput
    installments?: InstallmentCreateNestedManyWithoutLoanInput
    previousLoan?: LoanCreateNestedOneWithoutRenewedLoanInput
    renewedLoan?: LoanCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanUncheckedCreateWithoutCollectorInput = {
    id?: string
    clientId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutLoanInput
    renewedLoan?: LoanUncheckedCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanCreateOrConnectWithoutCollectorInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutCollectorInput, LoanUncheckedCreateWithoutCollectorInput>
  }

  export type LoanCreateManyCollectorInputEnvelope = {
    data: LoanCreateManyCollectorInput | LoanCreateManyCollectorInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutCollectorInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
    installment: InstallmentCreateNestedOneWithoutPaymentsInput
    cashMovement?: CashMovementCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutCollectorInput = {
    id?: string
    installmentId: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
    cashMovement?: CashMovementUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutCollectorInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput>
  }

  export type PaymentCreateManyCollectorInputEnvelope = {
    data: PaymentCreateManyCollectorInput | PaymentCreateManyCollectorInput[]
    skipDuplicates?: boolean
  }

  export type CashMovementCreateWithoutUserInput = {
    id?: string
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
    payment?: PaymentCreateNestedOneWithoutCashMovementInput
  }

  export type CashMovementUncheckedCreateWithoutUserInput = {
    id?: string
    paymentId?: string | null
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type CashMovementCreateOrConnectWithoutUserInput = {
    where: CashMovementWhereUniqueInput
    create: XOR<CashMovementCreateWithoutUserInput, CashMovementUncheckedCreateWithoutUserInput>
  }

  export type CashMovementCreateManyUserInputEnvelope = {
    data: CashMovementCreateManyUserInput | CashMovementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LoanUpsertWithWhereUniqueWithoutCollectorInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutCollectorInput, LoanUncheckedUpdateWithoutCollectorInput>
    create: XOR<LoanCreateWithoutCollectorInput, LoanUncheckedCreateWithoutCollectorInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutCollectorInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutCollectorInput, LoanUncheckedUpdateWithoutCollectorInput>
  }

  export type LoanUpdateManyWithWhereWithoutCollectorInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutCollectorInput>
  }

  export type LoanScalarWhereInput = {
    AND?: LoanScalarWhereInput | LoanScalarWhereInput[]
    OR?: LoanScalarWhereInput[]
    NOT?: LoanScalarWhereInput | LoanScalarWhereInput[]
    id?: StringFilter<"Loan"> | string
    clientId?: StringFilter<"Loan"> | string
    collectorId?: StringFilter<"Loan"> | string
    amount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFilter<"Loan"> | $Enums.LoanFrequency
    totalInstallments?: IntFilter<"Loan"> | number
    installmentAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    commissionPct?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFilter<"Loan"> | number
    startDate?: DateTimeFilter<"Loan"> | Date | string
    endDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    previousLoanId?: StringNullableFilter<"Loan"> | string | null
    notes?: StringNullableFilter<"Loan"> | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutCollectorInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutCollectorInput, PaymentUncheckedUpdateWithoutCollectorInput>
    create: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutCollectorInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutCollectorInput, PaymentUncheckedUpdateWithoutCollectorInput>
  }

  export type PaymentUpdateManyWithWhereWithoutCollectorInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutCollectorInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    installmentId?: StringFilter<"Payment"> | string
    collectorId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    receivedAt?: DateTimeFilter<"Payment"> | Date | string
    notes?: StringNullableFilter<"Payment"> | string | null
    syncId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type CashMovementUpsertWithWhereUniqueWithoutUserInput = {
    where: CashMovementWhereUniqueInput
    update: XOR<CashMovementUpdateWithoutUserInput, CashMovementUncheckedUpdateWithoutUserInput>
    create: XOR<CashMovementCreateWithoutUserInput, CashMovementUncheckedCreateWithoutUserInput>
  }

  export type CashMovementUpdateWithWhereUniqueWithoutUserInput = {
    where: CashMovementWhereUniqueInput
    data: XOR<CashMovementUpdateWithoutUserInput, CashMovementUncheckedUpdateWithoutUserInput>
  }

  export type CashMovementUpdateManyWithWhereWithoutUserInput = {
    where: CashMovementScalarWhereInput
    data: XOR<CashMovementUpdateManyMutationInput, CashMovementUncheckedUpdateManyWithoutUserInput>
  }

  export type CashMovementScalarWhereInput = {
    AND?: CashMovementScalarWhereInput | CashMovementScalarWhereInput[]
    OR?: CashMovementScalarWhereInput[]
    NOT?: CashMovementScalarWhereInput | CashMovementScalarWhereInput[]
    id?: StringFilter<"CashMovement"> | string
    userId?: StringFilter<"CashMovement"> | string
    paymentId?: StringNullableFilter<"CashMovement"> | string | null
    type?: EnumCashMovementTypeFilter<"CashMovement"> | $Enums.CashMovementType
    amount?: DecimalFilter<"CashMovement"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"CashMovement"> | string | null
    date?: DateTimeFilter<"CashMovement"> | Date | string
    createdAt?: DateTimeFilter<"CashMovement"> | Date | string
  }

  export type ClientPhotoCreateWithoutClientInput = {
    id?: string
    bucket?: string
    objectKey: string
    originalName: string
    type: string
    description?: string | null
    sizeBytes?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type ClientPhotoUncheckedCreateWithoutClientInput = {
    id?: string
    bucket?: string
    objectKey: string
    originalName: string
    type: string
    description?: string | null
    sizeBytes?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type ClientPhotoCreateOrConnectWithoutClientInput = {
    where: ClientPhotoWhereUniqueInput
    create: XOR<ClientPhotoCreateWithoutClientInput, ClientPhotoUncheckedCreateWithoutClientInput>
  }

  export type ClientPhotoCreateManyClientInputEnvelope = {
    data: ClientPhotoCreateManyClientInput | ClientPhotoCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutClientInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    collector: UserCreateNestedOneWithoutLoansInput
    installments?: InstallmentCreateNestedManyWithoutLoanInput
    previousLoan?: LoanCreateNestedOneWithoutRenewedLoanInput
    renewedLoan?: LoanCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanUncheckedCreateWithoutClientInput = {
    id?: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutLoanInput
    renewedLoan?: LoanUncheckedCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanCreateOrConnectWithoutClientInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutClientInput, LoanUncheckedCreateWithoutClientInput>
  }

  export type LoanCreateManyClientInputEnvelope = {
    data: LoanCreateManyClientInput | LoanCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ClientPhotoUpsertWithWhereUniqueWithoutClientInput = {
    where: ClientPhotoWhereUniqueInput
    update: XOR<ClientPhotoUpdateWithoutClientInput, ClientPhotoUncheckedUpdateWithoutClientInput>
    create: XOR<ClientPhotoCreateWithoutClientInput, ClientPhotoUncheckedCreateWithoutClientInput>
  }

  export type ClientPhotoUpdateWithWhereUniqueWithoutClientInput = {
    where: ClientPhotoWhereUniqueInput
    data: XOR<ClientPhotoUpdateWithoutClientInput, ClientPhotoUncheckedUpdateWithoutClientInput>
  }

  export type ClientPhotoUpdateManyWithWhereWithoutClientInput = {
    where: ClientPhotoScalarWhereInput
    data: XOR<ClientPhotoUpdateManyMutationInput, ClientPhotoUncheckedUpdateManyWithoutClientInput>
  }

  export type ClientPhotoScalarWhereInput = {
    AND?: ClientPhotoScalarWhereInput | ClientPhotoScalarWhereInput[]
    OR?: ClientPhotoScalarWhereInput[]
    NOT?: ClientPhotoScalarWhereInput | ClientPhotoScalarWhereInput[]
    id?: StringFilter<"ClientPhoto"> | string
    clientId?: StringFilter<"ClientPhoto"> | string
    bucket?: StringFilter<"ClientPhoto"> | string
    objectKey?: StringFilter<"ClientPhoto"> | string
    originalName?: StringFilter<"ClientPhoto"> | string
    type?: StringFilter<"ClientPhoto"> | string
    description?: StringNullableFilter<"ClientPhoto"> | string | null
    sizeBytes?: IntNullableFilter<"ClientPhoto"> | number | null
    mimeType?: StringNullableFilter<"ClientPhoto"> | string | null
    createdAt?: DateTimeFilter<"ClientPhoto"> | Date | string
  }

  export type LoanUpsertWithWhereUniqueWithoutClientInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutClientInput, LoanUncheckedUpdateWithoutClientInput>
    create: XOR<LoanCreateWithoutClientInput, LoanUncheckedCreateWithoutClientInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutClientInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutClientInput, LoanUncheckedUpdateWithoutClientInput>
  }

  export type LoanUpdateManyWithWhereWithoutClientInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutClientInput>
  }

  export type ClientCreateWithoutPhotosInput = {
    id?: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2?: string | null
    creditScore?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutPhotosInput = {
    id?: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2?: string | null
    creditScore?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutPhotosInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutPhotosInput, ClientUncheckedCreateWithoutPhotosInput>
  }

  export type ClientUpsertWithoutPhotosInput = {
    update: XOR<ClientUpdateWithoutPhotosInput, ClientUncheckedUpdateWithoutPhotosInput>
    create: XOR<ClientCreateWithoutPhotosInput, ClientUncheckedCreateWithoutPhotosInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutPhotosInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutPhotosInput, ClientUncheckedUpdateWithoutPhotosInput>
  }

  export type ClientUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateWithoutLoansInput = {
    id?: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2?: string | null
    creditScore?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ClientPhotoCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutLoansInput = {
    id?: string
    name: string
    cpf: string
    rg: string
    address: string
    phone1: string
    phone2?: string | null
    creditScore?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ClientPhotoUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutLoansInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutLoansInput, ClientUncheckedCreateWithoutLoansInput>
  }

  export type UserCreateWithoutLoansInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutCollectorInput
    cashMovements?: CashMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLoansInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutCollectorInput
    cashMovements?: CashMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLoansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
  }

  export type InstallmentCreateWithoutLoanInput = {
    id?: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutInstallmentInput
  }

  export type InstallmentUncheckedCreateWithoutLoanInput = {
    id?: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutInstallmentInput
  }

  export type InstallmentCreateOrConnectWithoutLoanInput = {
    where: InstallmentWhereUniqueInput
    create: XOR<InstallmentCreateWithoutLoanInput, InstallmentUncheckedCreateWithoutLoanInput>
  }

  export type InstallmentCreateManyLoanInputEnvelope = {
    data: InstallmentCreateManyLoanInput | InstallmentCreateManyLoanInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutRenewedLoanInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutLoansInput
    collector: UserCreateNestedOneWithoutLoansInput
    installments?: InstallmentCreateNestedManyWithoutLoanInput
    previousLoan?: LoanCreateNestedOneWithoutRenewedLoanInput
  }

  export type LoanUncheckedCreateWithoutRenewedLoanInput = {
    id?: string
    clientId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutRenewedLoanInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutRenewedLoanInput, LoanUncheckedCreateWithoutRenewedLoanInput>
  }

  export type LoanCreateWithoutPreviousLoanInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutLoansInput
    collector: UserCreateNestedOneWithoutLoansInput
    installments?: InstallmentCreateNestedManyWithoutLoanInput
    renewedLoan?: LoanCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanUncheckedCreateWithoutPreviousLoanInput = {
    id?: string
    clientId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutLoanInput
    renewedLoan?: LoanUncheckedCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanCreateOrConnectWithoutPreviousLoanInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutPreviousLoanInput, LoanUncheckedCreateWithoutPreviousLoanInput>
  }

  export type ClientUpsertWithoutLoansInput = {
    update: XOR<ClientUpdateWithoutLoansInput, ClientUncheckedUpdateWithoutLoansInput>
    create: XOR<ClientCreateWithoutLoansInput, ClientUncheckedCreateWithoutLoansInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutLoansInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutLoansInput, ClientUncheckedUpdateWithoutLoansInput>
  }

  export type ClientUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ClientPhotoUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone1?: StringFieldUpdateOperationsInput | string
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    creditScore?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ClientPhotoUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutLoansInput = {
    update: XOR<UserUpdateWithoutLoansInput, UserUncheckedUpdateWithoutLoansInput>
    create: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLoansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLoansInput, UserUncheckedUpdateWithoutLoansInput>
  }

  export type UserUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutCollectorNestedInput
    cashMovements?: CashMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutCollectorNestedInput
    cashMovements?: CashMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InstallmentUpsertWithWhereUniqueWithoutLoanInput = {
    where: InstallmentWhereUniqueInput
    update: XOR<InstallmentUpdateWithoutLoanInput, InstallmentUncheckedUpdateWithoutLoanInput>
    create: XOR<InstallmentCreateWithoutLoanInput, InstallmentUncheckedCreateWithoutLoanInput>
  }

  export type InstallmentUpdateWithWhereUniqueWithoutLoanInput = {
    where: InstallmentWhereUniqueInput
    data: XOR<InstallmentUpdateWithoutLoanInput, InstallmentUncheckedUpdateWithoutLoanInput>
  }

  export type InstallmentUpdateManyWithWhereWithoutLoanInput = {
    where: InstallmentScalarWhereInput
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyWithoutLoanInput>
  }

  export type InstallmentScalarWhereInput = {
    AND?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
    OR?: InstallmentScalarWhereInput[]
    NOT?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
    id?: StringFilter<"Installment"> | string
    loanId?: StringFilter<"Installment"> | string
    installmentNo?: IntFilter<"Installment"> | number
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    status?: EnumInstallmentStatusFilter<"Installment"> | $Enums.InstallmentStatus
    paidAmount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeNullableFilter<"Installment"> | Date | string | null
    daysOverdue?: IntFilter<"Installment"> | number
    createdAt?: DateTimeFilter<"Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Installment"> | Date | string
  }

  export type LoanUpsertWithoutRenewedLoanInput = {
    update: XOR<LoanUpdateWithoutRenewedLoanInput, LoanUncheckedUpdateWithoutRenewedLoanInput>
    create: XOR<LoanCreateWithoutRenewedLoanInput, LoanUncheckedCreateWithoutRenewedLoanInput>
    where?: LoanWhereInput
  }

  export type LoanUpdateToOneWithWhereWithoutRenewedLoanInput = {
    where?: LoanWhereInput
    data: XOR<LoanUpdateWithoutRenewedLoanInput, LoanUncheckedUpdateWithoutRenewedLoanInput>
  }

  export type LoanUpdateWithoutRenewedLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutLoansNestedInput
    collector?: UserUpdateOneRequiredWithoutLoansNestedInput
    installments?: InstallmentUpdateManyWithoutLoanNestedInput
    previousLoan?: LoanUpdateOneWithoutRenewedLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutRenewedLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUpsertWithoutPreviousLoanInput = {
    update: XOR<LoanUpdateWithoutPreviousLoanInput, LoanUncheckedUpdateWithoutPreviousLoanInput>
    create: XOR<LoanCreateWithoutPreviousLoanInput, LoanUncheckedCreateWithoutPreviousLoanInput>
    where?: LoanWhereInput
  }

  export type LoanUpdateToOneWithWhereWithoutPreviousLoanInput = {
    where?: LoanWhereInput
    data: XOR<LoanUpdateWithoutPreviousLoanInput, LoanUncheckedUpdateWithoutPreviousLoanInput>
  }

  export type LoanUpdateWithoutPreviousLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutLoansNestedInput
    collector?: UserUpdateOneRequiredWithoutLoansNestedInput
    installments?: InstallmentUpdateManyWithoutLoanNestedInput
    renewedLoan?: LoanUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutPreviousLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutLoanNestedInput
    renewedLoan?: LoanUncheckedUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanCreateWithoutInstallmentsInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutLoansInput
    collector: UserCreateNestedOneWithoutLoansInput
    previousLoan?: LoanCreateNestedOneWithoutRenewedLoanInput
    renewedLoan?: LoanCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanUncheckedCreateWithoutInstallmentsInput = {
    id?: string
    clientId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    renewedLoan?: LoanUncheckedCreateNestedOneWithoutPreviousLoanInput
  }

  export type LoanCreateOrConnectWithoutInstallmentsInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
  }

  export type PaymentCreateWithoutInstallmentInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
    collector: UserCreateNestedOneWithoutPaymentsInput
    cashMovement?: CashMovementCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutInstallmentInput = {
    id?: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
    cashMovement?: CashMovementUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutInstallmentInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput>
  }

  export type PaymentCreateManyInstallmentInputEnvelope = {
    data: PaymentCreateManyInstallmentInput | PaymentCreateManyInstallmentInput[]
    skipDuplicates?: boolean
  }

  export type LoanUpsertWithoutInstallmentsInput = {
    update: XOR<LoanUpdateWithoutInstallmentsInput, LoanUncheckedUpdateWithoutInstallmentsInput>
    create: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
    where?: LoanWhereInput
  }

  export type LoanUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: LoanWhereInput
    data: XOR<LoanUpdateWithoutInstallmentsInput, LoanUncheckedUpdateWithoutInstallmentsInput>
  }

  export type LoanUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutLoansNestedInput
    collector?: UserUpdateOneRequiredWithoutLoansNestedInput
    previousLoan?: LoanUpdateOneWithoutRenewedLoanNestedInput
    renewedLoan?: LoanUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    renewedLoan?: LoanUncheckedUpdateOneWithoutPreviousLoanNestedInput
  }

  export type PaymentUpsertWithWhereUniqueWithoutInstallmentInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutInstallmentInput, PaymentUncheckedUpdateWithoutInstallmentInput>
    create: XOR<PaymentCreateWithoutInstallmentInput, PaymentUncheckedCreateWithoutInstallmentInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutInstallmentInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutInstallmentInput, PaymentUncheckedUpdateWithoutInstallmentInput>
  }

  export type PaymentUpdateManyWithWhereWithoutInstallmentInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutInstallmentInput>
  }

  export type InstallmentCreateWithoutPaymentsInput = {
    id?: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    loan: LoanCreateNestedOneWithoutInstallmentsInput
  }

  export type InstallmentUncheckedCreateWithoutPaymentsInput = {
    id?: string
    loanId: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentCreateOrConnectWithoutPaymentsInput = {
    where: InstallmentWhereUniqueInput
    create: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutCollectorInput
    cashMovements?: CashMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutCollectorInput
    cashMovements?: CashMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type CashMovementCreateWithoutPaymentInput = {
    id?: string
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCashMovementsInput
  }

  export type CashMovementUncheckedCreateWithoutPaymentInput = {
    id?: string
    userId: string
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type CashMovementCreateOrConnectWithoutPaymentInput = {
    where: CashMovementWhereUniqueInput
    create: XOR<CashMovementCreateWithoutPaymentInput, CashMovementUncheckedCreateWithoutPaymentInput>
  }

  export type InstallmentUpsertWithoutPaymentsInput = {
    update: XOR<InstallmentUpdateWithoutPaymentsInput, InstallmentUncheckedUpdateWithoutPaymentsInput>
    create: XOR<InstallmentCreateWithoutPaymentsInput, InstallmentUncheckedCreateWithoutPaymentsInput>
    where?: InstallmentWhereInput
  }

  export type InstallmentUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: InstallmentWhereInput
    data: XOR<InstallmentUpdateWithoutPaymentsInput, InstallmentUncheckedUpdateWithoutPaymentsInput>
  }

  export type InstallmentUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutInstallmentsNestedInput
  }

  export type InstallmentUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutCollectorNestedInput
    cashMovements?: CashMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutCollectorNestedInput
    cashMovements?: CashMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CashMovementUpsertWithoutPaymentInput = {
    update: XOR<CashMovementUpdateWithoutPaymentInput, CashMovementUncheckedUpdateWithoutPaymentInput>
    create: XOR<CashMovementCreateWithoutPaymentInput, CashMovementUncheckedCreateWithoutPaymentInput>
    where?: CashMovementWhereInput
  }

  export type CashMovementUpdateToOneWithWhereWithoutPaymentInput = {
    where?: CashMovementWhereInput
    data: XOR<CashMovementUpdateWithoutPaymentInput, CashMovementUncheckedUpdateWithoutPaymentInput>
  }

  export type CashMovementUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCashMovementsNestedInput
  }

  export type CashMovementUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutCashMovementsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutCollectorInput
    payments?: PaymentCreateNestedManyWithoutCollectorInput
  }

  export type UserUncheckedCreateWithoutCashMovementsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    phone?: string | null
    active?: boolean
    commissionPct?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutCollectorInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCollectorInput
  }

  export type UserCreateOrConnectWithoutCashMovementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCashMovementsInput, UserUncheckedCreateWithoutCashMovementsInput>
  }

  export type PaymentCreateWithoutCashMovementInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
    installment: InstallmentCreateNestedOneWithoutPaymentsInput
    collector: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutCashMovementInput = {
    id?: string
    installmentId: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutCashMovementInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutCashMovementInput, PaymentUncheckedCreateWithoutCashMovementInput>
  }

  export type UserUpsertWithoutCashMovementsInput = {
    update: XOR<UserUpdateWithoutCashMovementsInput, UserUncheckedUpdateWithoutCashMovementsInput>
    create: XOR<UserCreateWithoutCashMovementsInput, UserUncheckedCreateWithoutCashMovementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCashMovementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCashMovementsInput, UserUncheckedUpdateWithoutCashMovementsInput>
  }

  export type UserUpdateWithoutCashMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutCollectorNestedInput
    payments?: PaymentUpdateManyWithoutCollectorNestedInput
  }

  export type UserUncheckedUpdateWithoutCashMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    commissionPct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutCollectorNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCollectorNestedInput
  }

  export type PaymentUpsertWithoutCashMovementInput = {
    update: XOR<PaymentUpdateWithoutCashMovementInput, PaymentUncheckedUpdateWithoutCashMovementInput>
    create: XOR<PaymentCreateWithoutCashMovementInput, PaymentUncheckedCreateWithoutCashMovementInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutCashMovementInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutCashMovementInput, PaymentUncheckedUpdateWithoutCashMovementInput>
  }

  export type PaymentUpdateWithoutCashMovementInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installment?: InstallmentUpdateOneRequiredWithoutPaymentsNestedInput
    collector?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutCashMovementInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentId?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanCreateManyCollectorInput = {
    id?: string
    clientId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyCollectorInput = {
    id?: string
    installmentId: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
  }

  export type CashMovementCreateManyUserInput = {
    id?: string
    paymentId?: string | null
    type: $Enums.CashMovementType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type LoanUpdateWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutLoansNestedInput
    installments?: InstallmentUpdateManyWithoutLoanNestedInput
    previousLoan?: LoanUpdateOneWithoutRenewedLoanNestedInput
    renewedLoan?: LoanUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutLoanNestedInput
    renewedLoan?: LoanUncheckedUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installment?: InstallmentUpdateOneRequiredWithoutPaymentsNestedInput
    cashMovement?: CashMovementUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cashMovement?: CashMovementUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashMovementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUpdateOneWithoutCashMovementNestedInput
  }

  export type CashMovementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashMovementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCashMovementTypeFieldUpdateOperationsInput | $Enums.CashMovementType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientPhotoCreateManyClientInput = {
    id?: string
    bucket?: string
    objectKey: string
    originalName: string
    type: string
    description?: string | null
    sizeBytes?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type LoanCreateManyClientInput = {
    id?: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    totalWithInterest: Decimal | DecimalJsLike | number | string
    frequency: $Enums.LoanFrequency
    totalInstallments: number
    installmentAmount: Decimal | DecimalJsLike | number | string
    status?: $Enums.LoanStatus
    commissionPct: Decimal | DecimalJsLike | number | string
    commissionAmount: Decimal | DecimalJsLike | number | string
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeDays?: number
    startDate: Date | string
    endDate?: Date | string | null
    previousLoanId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientPhotoUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientPhotoUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientPhotoUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collector?: UserUpdateOneRequiredWithoutLoansNestedInput
    installments?: InstallmentUpdateManyWithoutLoanNestedInput
    previousLoan?: LoanUpdateOneWithoutRenewedLoanNestedInput
    renewedLoan?: LoanUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutLoanNestedInput
    renewedLoan?: LoanUncheckedUpdateOneWithoutPreviousLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalWithInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumLoanFrequencyFieldUpdateOperationsInput | $Enums.LoanFrequency
    totalInstallments?: IntFieldUpdateOperationsInput | number
    installmentAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    commissionPct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commissionAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeDays?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousLoanId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateManyLoanInput = {
    id?: string
    installmentNo: number
    amount: Decimal | DecimalJsLike | number | string
    lateFee?: Decimal | DecimalJsLike | number | string
    totalDue: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.InstallmentStatus
    paidAmount?: Decimal | DecimalJsLike | number | string
    paidAt?: Date | string | null
    daysOverdue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutInstallmentNestedInput
  }

  export type InstallmentUncheckedUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutInstallmentNestedInput
  }

  export type InstallmentUncheckedUpdateManyWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNo?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    daysOverdue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInstallmentInput = {
    id?: string
    collectorId: string
    amount: Decimal | DecimalJsLike | number | string
    method: $Enums.PaymentMethod
    receivedAt?: Date | string
    notes?: string | null
    syncId?: string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateWithoutInstallmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collector?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    cashMovement?: CashMovementUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutInstallmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cashMovement?: CashMovementUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutInstallmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    collectorId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    syncId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}