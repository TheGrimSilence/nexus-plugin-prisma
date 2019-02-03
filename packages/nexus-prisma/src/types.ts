import { core } from 'nexus'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type PrismaShapeKeys = 'objectTypes' | 'inputTypes' | 'enumTypesNames'

interface PrismaGenTypesShape {
  objectTypes: {
    fields: Record<string, any>
    fieldsDetails: Record<string, any>
  }
  inputTypes: {
    fields: Record<string, any>
  }
  enumTypesNames: string
}

export type GetGen<
  K extends PrismaShapeKeys,
  Fallback = any
> = NexusGen extends infer GenTypes
  ? GenTypes extends PrismaGenTypesShape
    ? GenTypes[K]
    : Fallback
  : Fallback

export type GetGen2<
  K extends PrismaShapeKeys,
  K2 extends keyof PrismaGenTypesShape[K]
> = NexusGen extends infer GenTypes
  ? GenTypes extends PrismaGenTypesShape
    ? K extends keyof GenTypes
      ? K2 extends keyof GenTypes[K]
        ? GenTypes[K][K2]
        : any
      : any
    : any
  : any

export type GetGen3<
  K extends PrismaShapeKeys,
  K2 extends Extract<keyof PrismaGenTypesShape[K], string>,
  K3 extends Extract<keyof PrismaGenTypesShape[K][K2], string>
> = NexusGen extends infer GenTypes
  ? GenTypes extends PrismaGenTypesShape
    ? K extends keyof GenTypes
      ? K2 extends keyof GenTypes[K]
        ? K3 extends keyof GenTypes[K][K2]
          ? GenTypes[K][K2][K3]
          : any
        : any
      : any
    : any
  : any

export type InputField<
  GraphQLType extends PrismaShapeKeys,
  TypeName extends string
> = NexusGen extends infer GenTypes
  ? GenTypes extends PrismaGenTypesShape
    ? GraphQLType extends keyof GenTypes
      ? 'fields' extends infer Fields
        ? Fields extends keyof GenTypes[GraphQLType]
          ? TypeName extends keyof GenTypes[GraphQLType][Fields]
            ? GenTypes[GraphQLType][Fields][TypeName]
            : any
          : any
        : any
      : any
    : any
  : any

export interface PickInputField<
  GraphQLType extends PrismaShapeKeys,
  TypeName extends string
> {
  pick: InputField<GraphQLType, TypeName>[]
}

export interface FilterInputField<
  GraphQLType extends PrismaShapeKeys,
  TypeName extends string
> {
  filter: ((fields: string[]) => string[]) | InputField<GraphQLType, TypeName>[]
}

export type AddFieldInput<
  GraphQLType extends PrismaShapeKeys,
  TypeName extends string
> =
  | InputField<GraphQLType, TypeName>[]
  | PickInputField<GraphQLType, TypeName>
  | FilterInputField<GraphQLType, TypeName>

export type AliasedObjectField = {
  name: string
  args?: string[] | false
  alias?: string
}
export type ObjectField = Omit<AliasedObjectField, 'alias'>
export type AnonymousField = string | AliasedObjectField
export interface AnonymousPickOmitField {
  pick?: AnonymousField[]
  omit?: AnonymousField[]
}
export type AnonymousInputFields = AnonymousField[] | AnonymousPickOmitField

export interface PrismaOutputOpts
  extends Omit<
    core.FieldOutConfig<string, string>,
    'args' | 'deprecation' | 'resolve'
  > {
  args: Record<string, core.NexusArgDef<string>>
  resolve: (root: any, args: any, ctx: any) => any
}

export type PrismaOutputOptsMap = Record<string, PrismaOutputOpts>

export interface PrismaSchemaConfig extends core.BuilderConfig {
  types?: any
  prisma: {
    schemaPath: string
    contextClientName: string
  }
}
