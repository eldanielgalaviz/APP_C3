import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { PrePinAssumptionsRepository } from "../../domain/Repositories/OriginationPrePinoAssumptionsRepository";
import { PrePinOriginationRequest } from "../../domain/Request/OriginationPreAssumptionsRequest";
import { PrePinMrvRequest } from "../../domain/Request/OriginationPreAssumptionsRequest";
import { PrePinSafeguardsRequest } from "../../domain/Request/OriginationPreAssumptionsRequest";

export class PrePinAssumptionsRepositoryImpl implements PrePinAssumptionsRepository {

  async getPrePinAssumptionsRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_pre_pin_assumptions', [idProject]);
    return result[0];
  }

  async setPrePinOriginationRepository(data: PrePinOriginationRequest, userId: number): Promise<any> {
    const params = [
      data.p_Id_project,
      data.p_descriptions                              ?? null,
      data.p_id_certification_program                  ?? null,
      data.p_id_registration_route                     ?? null,
      data.p_id_methodology                            ?? null,
      data.p_project_area                              ?? null,
      data.p_id_project_condition                      ?? null,
      data.p_id_licences_permits                       ?? null,
      data.p_id_confidence_of_crediting_activity_area  ?? null,
      data.p_id_umafor                                 ?? null,
      data.p_authorizedHarvestingVolume                ?? null,
      data.p_underlying_activities                     ?? null,
      data.p_percentage_mki_price                      ?? null,
      data.p_conficence_upfront_costs                  ?? null,
      data.p_cba                                       ?? null,
      data.p_irr                                       ?? null,
      data.p_credit_type                               ?? null,
      userId,
    ];
    const result = await executeStoredProcedure('sp_set_pre_pin_origination', params);
    return result[0];
  }

  async setPrePinMrvRepository(data: PrePinMrvRequest, userId: number): Promise<any> {
    const params = [
      data.p_Id_project,
      data.p_id_estimate_permanence     ?? null,
      data.p_estimate_sample_size       ?? null,
      data.p_id_estimate_mrv            ?? null,
      data.p_id_estimate_leakage        ?? null,
      data.p_id_estimate_reversal_risk  ?? null,
      data.p_Id_buffer_pool             ?? null,
      data.p_Id_inventory_stratification ?? null,
      userId,
    ];
    const result = await executeStoredProcedure('sp_set_pre_pin_mrv', params);
    return result[0];
  }

  async setPrePinSafeguardsRepository(data: PrePinSafeguardsRequest, userId: number): Promise<any> {
    const params = [
      data.p_Id_project,
      data.p_id_safeguards           ?? null,
      data.p_id_social_community     ?? null,
      data.p_id_shareholders         ?? null,
      data.p_id_press_negative       ?? null,
      data.p_id_biodiversity         ?? null,
      data.p_id_human_rights         ?? null,
      data.p_id_indigenous_people    ?? null,
      data.p_id_h_s                  ?? null,
      data.p_id_negative_ehs         ?? null,
      data.p_Id_grievance_mechanism  ?? null,
      userId,
    ];
    const result = await executeStoredProcedure('sp_set_pre_pin_safeguards', params);
    return result[0];
  }
}