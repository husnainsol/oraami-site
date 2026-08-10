import type { ComponentType } from "react"
import type { FeatureVisualId, FeatureVisualProps } from "../types"
import { AnalyticsReportingVisual } from "./analytics-reporting"
import { DeepLeadResearchVisual } from "./deep-lead-research"
import { IcpResearchVisual } from "./icp-research"
import { StakeholderMappingVisual } from "./stakeholder-mapping"
import { TrustBuildingSequencesVisual } from "./trust-building-sequences"

export const FEATURE_VISUALS: Record<FeatureVisualId, ComponentType<FeatureVisualProps>> = {
  icp: IcpResearchVisual,
  research: DeepLeadResearchVisual,
  stakeholders: StakeholderMappingVisual,
  sequences: TrustBuildingSequencesVisual,
  analytics: AnalyticsReportingVisual,
}
