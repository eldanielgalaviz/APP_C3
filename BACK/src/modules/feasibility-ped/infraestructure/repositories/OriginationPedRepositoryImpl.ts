import { executeStoredProcedure } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { PedRepository } from "../../domain/Repositories/OriginationPedRepository";
import { PedOriginationRequest } from "../../domain/Request/OriginationPEDRequest";
import { PedSigRequest } from "../../domain/Request/OriginationPEDRequest";

export class PedRepositoryImpl implements PedRepository {

  async getPedRepository(idProject: number): Promise<any> {
    const result = await executeStoredProcedure('sp_get_ped_sig_by_pj', [idProject]);
    return result[0];
  }

  async setPedOriginationRepository(data: PedOriginationRequest, userId: number): Promise<any> {
    const params = [
      data.p_id_ped_origination          ?? 0,
      data.p_projects_id,
      data.p_ped_ap_result_id            ?? null,
      data.p_can_include_anp_or_advc     ?? null,
      data.p_can_include_psa             ?? null,
      data.p_requires_commercial_agriculture ?? null,
      data.p_requires_subsidies          ?? null,
      userId,
    ];
    const result = await executeStoredProcedure('sp_set_ped_origination', params);
    return result[0];
  }

  async setPedSigRepository(data: PedSigRequest, userId: number): Promise<any> {
    const params = [
      data.p_id_ped_sig                  ?? 0,
      data.p_projects_id,
      data.p_pedaa_section_id            ?? null,
      data.p_aa_population_id            ?? null,
      data.p_agricultural_activity_id    ?? null,
      data.p_survey_id                   ?? null,
      data.p_aa_subsidy_id               ?? null,
      data.p_aa_steep_id                 ?? null,
      data.p_aa_coverage_change_id       ?? null,
      data.p_pedaa_result_id             ?? null,
      data.p_pedaa_link                  ?? null,
      data.p_pedaa_observations          ?? null,
      userId,
    ];
    const result = await executeStoredProcedure('sp_set_ped_sig', params);
    return result[0];
  }
}