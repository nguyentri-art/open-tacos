import { BBox, Feature } from '@turf/helpers'
import { ViewState } from 'react-map-gl'
import { BaseItem } from '@algolia/autocomplete-core'
import { RegisterOptions } from 'react-hook-form'
import { GradeScalesTypes } from '@openbeta/sandbag'
import { IUserProfile, UserRole } from './types/User'
import { GradeContexts } from './grades/Grade'

export type { IUserProfile }
export { UserRole }
export interface AreaMetadataType {
  leaf: boolean
  isDestination: boolean
  isBoulder: boolean
  lat: number
  lng: number
  bbox: [number, number, number, number]
  leftRightIndex: number
  mp_id: string
  area_id: string
  areaId: string
}

export enum SafetyType {
  UNSPECIFIED = 'UNSPECIFIED',
  PG = 'PG',
  PG13 = 'PG13',
  R = 'R',
  X = 'X',
}

export enum OrgType {
  LOCAL_CLIMBING_ORGANIZATION = 'LOCAL_CLIMBING_ORGANIZATION',
}

export interface ClimbMetadataType {
  lat: number
  lng: number
  left_right_index: string
  leftRightIndex: number
  mp_id: string
  climbId: string
}

export type ClimbDiscipline = 'sport' | 'bouldering' | 'alpine' | 'tr' | 'trad' | 'mixed' | 'aid' | 'ice' | 'snow' | 'deepwatersolo'

export type ClimbDisciplineRecord = Record<ClimbDiscipline, boolean>

export type GradeValuesType = { [Key in GradeScalesTypes]?: string }

export interface Climb {
  id: string
  name: string
  fa: string
  yds: string
  length: number
  grades: GradeValuesType
  metadata: ClimbMetadataType
  type: ClimbDisciplineRecord
  safety: SafetyType
  content: {
    description: string
    location: string
    protection: string
  }
  ancestors: string[]
  pathTokens: string[]
  media: MediaWithTags[]
  parent: AreaType
  authorMetadata: AuthorMetadata
}

export type ClimbType = Climb

export interface CountByGroupType {
  count: number
  label: string
}

export interface CountByDisciplineType {
  trad?: DisciplineStatsType
  sport?: DisciplineStatsType
  boulder?: DisciplineStatsType
  alpine?: DisciplineStatsType
  mixed?: DisciplineStatsType
  aid?: DisciplineStatsType
  tr?: DisciplineStatsType
}

export interface DisciplineStatsType {
  total: number
  bands: CountByGradeBandType
}

export interface CountByGradeBandType {
  beginner: number
  intermediate: number
  advanced: number
  expert: number
}

export interface Point {
  lat: number
  lng: number
}
export interface AggregateType {
  byGrade: CountByGroupType[]
  byDiscipline: CountByDisciplineType
  byGradeBand: CountByGradeBandType
}

export type OrganizationType =
  AuthorMetadata & {
    orgId: string
    orgType: OrgType
    displayName: string
    associatedAreaIds?: string[]
    excludedAreaIds?: string[]
    content?: OrganizationContentType
  }

export interface OrganizationContentType {
  website?: string
  email?: string
  donationLink?: string
  instagramLink?: string
  facebookLink?: string
  hardwareReportLink?: string
  description?: string
}

export interface OrganizationEditableFieldsType extends OrganizationContentType {
  displayName?: string
  associatedAreaIds?: string[]
  excludedAreaIds?: string[]
}

export interface AuthorMetadata {
  updatedAt?: Date
  updatedByUser?: string
  createdAt?: Date
  createdByUser?: string
}

export interface AreaType {
  id: string
  uuid: string
  areaName: string
  shortCode?: string
  pathTokens: string[]
  metadata: AreaMetadataType
  ancestors: string[]
  organizations: OrganizationType[]
  aggregate: AggregateType
  totalClimbs: number
  density: number
  content: {
    description: string
  }
  children: AreaType[]
  climbs: Climb[]
  media: MediaWithTags[]
  gradeContext: GradeContexts
  authorMetadata: AuthorMetadata
}

export interface AreaUpdatableFieldsType {
  areaName?: string
  description?: string
  isDestination?: boolean
  isLeaf?: boolean
  isBoulder?: boolean
  shortCode?: string
  lat?: number
  lng?: number
  climbs?: ClimbType[]
}

export interface AreaResponseType {
  areas: AreaType[]
}

export interface IndexResponseType {
  areas: AreaType[]
  area: AreaType
}

export interface ClimbResponseType {
  climbs: Climb[]
}

export type BBoxType = BBox
export type GeojsonFeatureType = Feature

export interface AlgoliaResultType {
  objectID: string
}

export enum EntityType {
  climb = 'climb',
  area = 'area',
  crag = 'crag',
}

export interface TypesenseDocumentType extends BaseItem {
  type: EntityType
  climbUUID: string
  climbDesc: string
  climbName: string
  disciplines: ClimbDiscipline[]
  fa: string
  grade: string
  safety: SafetyType
  areaNames: string[]
}

export interface TypesenseAreaType extends BaseItem {
  type: EntityType
  id: string
  name: string
  pathTokens: string[]
  highlightIndices: number[]
}

export enum GradeBand {
  beginner = '0',
  intermediate = '1',
  advanced = '2',
  expert = '3'
}

export interface RadiusRange {
  rangeMeters: number[]
  rangeIndices: number[]
}

/// /////////////////////////////////////////////
// Map interactive states

export interface MarkerStateType {
  areaId: string
  lnglat: number[]
}

export interface EntityTag {
  id: string
  targetId: string
  type: number
  ancestors: string
  climbName?: string
  areaName: string
}

export enum MediaFormat {
  jpg = 'jpeg',
  png = 'png',
  webp = 'webp',
  avif = 'avif',
}

/**
 * Media with climb & area tags
 */
export interface MediaWithTags {
  id: string
  username?: string
  mediaUrl: string
  width: number
  height: number
  format: MediaFormat
  size: number
  uploadTime: Date
  entityTags: EntityTag[]
}

/**
 * @deprecated see MediaWithTags
 */
export interface MediaBaseTag {
  id: string
  mediaUuid: string
  mediaUrl: string
  mediaType: number
  destType: number
  destination: string | null
  username: string | null
  width: number
  height: number
  uploadTime: Date
}

export type TagSource = Pick<MediaBaseTag, 'mediaUrl' | 'mediaUuid'>

export interface MediaTagWithClimb extends MediaBaseTag {
  climb: Pick<Climb, 'id' | 'name'>
}

export interface MediaTagWithArea extends MediaBaseTag {
  area: Pick<AreaType, 'uuid' | 'areaName' | 'metadata'> & { metadata: Pick<AreaMetadataType, 'leaf' | 'areaId'> }
}

export type HybridMediaTag = MediaTagWithArea | MediaTagWithClimb

export interface MediaByUsers {
  username: string
  userUuid: string
  mediaWithTags: MediaWithTags[]
}
export interface WithUid {
  uid: string
}

export interface MediaType {
  ownerId: string
  mediaId: string
  filename: string
  ctime: Date
  mtime: Date
  contentType: string
  meta: any
}

export enum TagTargetType {
  climb = 0,
  area = 1
}

export interface XViewStateType extends ViewState {
  width: number
  height: number
  bbox: BBox
}

export interface TickType {
  _id: string
  userId: string
  name: string
  notes: string
  climbId: string
  style: string
  attemptType: string
  dateClimbed: number
  grade: string
  source: string
}

export interface UpdateDescriptionType {
  updatedFields?: string[]
  removedFields?: string[]
  truncatedArrays?: any[]
}

export enum DocumentTypeName {
  Area = 'Area',
  Climb = 'Climb',
  Organization = 'Organization',
}

export interface WithDocumentTypeName {
  __typename: DocumentTypeName
}

export interface ChangeType {
  dbOp: string
  changeId: string
  fullDocument: (AreaType | ClimbType | OrganizationType) & WithDocumentTypeName
  updateDescription: UpdateDescriptionType
}

export interface ChangesetType {
  id: string
  createdAt: number
  editedByUser: string
  operation: string
  changes: ChangeType[]
}

export interface ResumeToken {
  _data: string
}

export interface ChangeRecordMetadataType {
  user: string
  operation: string
  historyId: string
  prevHistoryId?: string
  seq: number
  createdAt?: Date
  updatedAt?: Date
}

export interface FinancialBackersResponseType {
  account: {
    members: {
      nodes: FinancialBackerAccountType[]
    }
    stats: {
      totalNetAmountReceived: {
        value: number
        currency: string
      }
    }
  }
}

export interface FinancialReportType {
  totalRaised: number
  donors: FinancialBackerAccountType[]
}

export interface FinancialBackerAccountType {
  account: {
    id: string
    name: string
    imageUrl: string
  }
}

export type CountrySummaryType = Pick<AreaType, 'areaName' | 'uuid' | 'totalClimbs' | 'authorMetadata' | 'metadata'> & { metadata: Pick<AreaMetadataType, 'lat' | 'lng' | 'areaId'> }

export interface TagsByUserType {
  userUuid: string
  username?: string
  total: number
}

export interface TagsLeaderboardType {
  allTime: {
    totalMediaWithTags: number
    byUsers: TagsByUserType[]
  }
}

/**
 * Validation rules for react-hook-form
 */
export type RulesType = Pick<RegisterOptions, 'minLength' | 'maxLength' | 'min' | 'max' | 'required' | 'validate' | 'valueAsNumber'>

export interface Username {
  userUuid: string
  username: string
  lastUpdated: Date
}

export interface UserMedia {
  userUuid: string
  mediaConnection: MediaConnection
}

export interface MediaConnection {
  edges: MediaEdge[]
  pageInfo: {
    hasNextPage: boolean
    endCursor: string
  }
}
export interface MediaEdge {
  node: MediaWithTags
  cursor: string
}
