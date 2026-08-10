import type { ComponentType } from "react"
import type { IndustryVisualId, IndustryVisualProps } from "../types"
import { FinancialServicesReviewVisual } from "./financial-services-review"
import { HealthcareCommunicationVisual } from "./healthcare-communication"
import { ItServicesRadarVisual } from "./it-services-radar"
import { SaasCustomerJourneyVisual } from "./saas-customer-journey"

export const INDUSTRY_VISUALS: Record<IndustryVisualId, ComponentType<IndustryVisualProps>> = {
  saas: SaasCustomerJourneyVisual,
  "it-services": ItServicesRadarVisual,
  "financial-services": FinancialServicesReviewVisual,
  healthcare: HealthcareCommunicationVisual,
}
