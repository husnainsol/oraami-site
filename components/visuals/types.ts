export type FeatureVisualId =
  | "icp"
  | "research"
  | "stakeholders"
  | "sequences"
  | "analytics"

export interface FeatureVisualProps {
  play: boolean
  reduceMotion: boolean
}

export type IndustryVisualId = "saas" | "it-services" | "financial-services" | "healthcare"

export interface IndustryVisualProps {
  reduceMotion: boolean
}
