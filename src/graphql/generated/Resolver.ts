import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../Context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  PointsID: any;
  TeamID: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPoints?: Maybe<Scalars['Boolean']>;
  addTeam?: Maybe<Scalars['Boolean']>;
  deletePoints?: Maybe<Scalars['Boolean']>;
  deleteTeam?: Maybe<Scalars['Boolean']>;
};


export type MutationAddPointsArgs = {
  adjustment: Scalars['Int'];
  reason: Scalars['String'];
  teamId: Scalars['TeamID'];
  timestamp?: InputMaybe<Scalars['DateTime']>;
};


export type MutationAddTeamArgs = {
  teamName: Scalars['String'];
};


export type MutationDeletePointsArgs = {
  id: Scalars['PointsID'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['TeamID'];
};

export type Points = {
  __typename?: 'Points';
  adjustment: Scalars['Int'];
  id: Scalars['PointsID'];
  reason: Scalars['String'];
  team: Scalars['TeamID'];
  timestamp: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  team?: Maybe<Team>;
  teams?: Maybe<Array<Maybe<Team>>>;
};


export type QueryTeamArgs = {
  id: Scalars['TeamID'];
};

export type Score = {
  __typename?: 'Score';
  points: Array<Maybe<Points>>;
  total: Scalars['Int'];
};

export type Team = {
  __typename?: 'Team';
  color: Scalars['String'];
  id: Scalars['TeamID'];
  name: Scalars['String'];
  score?: Maybe<Score>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Points: ResolverTypeWrapper<Points>;
  PointsID: ResolverTypeWrapper<Scalars['PointsID']>;
  Query: ResolverTypeWrapper<{}>;
  Score: ResolverTypeWrapper<Score>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Team: ResolverTypeWrapper<Team>;
  TeamID: ResolverTypeWrapper<Scalars['TeamID']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  Mutation: {};
  Points: Points;
  PointsID: Scalars['PointsID'];
  Query: {};
  Score: Score;
  String: Scalars['String'];
  Team: Team;
  TeamID: Scalars['TeamID'];
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addPoints?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddPointsArgs, 'adjustment' | 'reason' | 'teamId'>>;
  addTeam?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddTeamArgs, 'teamName'>>;
  deletePoints?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeletePointsArgs, 'id'>>;
  deleteTeam?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'id'>>;
}>;

export type PointsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Points'] = ResolversParentTypes['Points']> = ResolversObject<{
  adjustment?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['PointsID'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  team?: Resolver<ResolversTypes['TeamID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PointsIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PointsID'], any> {
  name: 'PointsID';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryTeamArgs, 'id'>>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
}>;

export type ScoreResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Score'] = ResolversParentTypes['Score']> = ResolversObject<{
  points?: Resolver<Array<Maybe<ResolversTypes['Points']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TeamResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = ResolversObject<{
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['TeamID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Score']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TeamIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TeamID'], any> {
  name: 'TeamID';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Points?: PointsResolvers<ContextType>;
  PointsID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Score?: ScoreResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamID?: GraphQLScalarType;
}>;

