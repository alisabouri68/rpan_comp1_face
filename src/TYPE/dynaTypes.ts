export type ENVIGroup =
  | 'ENVI_GLOB'
  | 'ENVI_CONS'
  | 'ENVI_HYB'
  | 'ENVI_CANV'
  | 'ENVI_COMP'
  | 'ENVI_PLUG'
  | 'ENVI_PROF'

export type DynaRecord = Record<string, any>

export type DynaState = Record<ENVIGroup, DynaRecord>
