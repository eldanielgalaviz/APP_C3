import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '../../shared/ServiceContainer';

export class OriginationCatalogController {
  constructor() {}

  private getCatalog = async (tableName: string, res: Response, next: NextFunction) => {
    try {
      const result = await ServiceContainer.catalogos.getCatalog.run(tableName);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  private getMunicipalities = async (idState: number, res: Response, next: NextFunction) => {
    try {
      const result = await ServiceContainer.catalogos.getMunicipalities.run(idState);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  private getNeighborhoodByMuncipality = async (idNeighborhood: number, res: Response, next: NextFunction) => {
    try {
      const result = await ServiceContainer.catalogos.getNeighborhoodsByMuncipality.run(idNeighborhood);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  private getNeighborhoods = async (idNeighborhood: number, res: Response, next: NextFunction) => {
    try {
      const result = await ServiceContainer.catalogos.getNeighborhoods.run(idNeighborhood);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  private getLocationByCP = async (postalcode: number, res: Response, next: NextFunction) => {
    try {
      const result = await ServiceContainer.catalogos.getLocationByCP.run(postalcode);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  private getMunicipalitiesByState = async (idState: number, res: Response, next: NextFunction) => {
    try {
      const result = await ServiceContainer.catalogos.getMunicipalitiesByState.run(idState);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

   private getAgrarianNucleusByMunicipality = async (idState: number, res: Response, next: NextFunction) => {
    try {
      const result = await ServiceContainer.catalogos.getAgrarianNucleusByMunicipality.run(idState);
      return res.status(200).json({ valido: 1, result });
    } catch (error) {
      next(error);
    }
  }

  cat_municipalities_by_state = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    return this.getMunicipalitiesByState(parseInt(id), res, next);
  }

  cat_agrarian_nucleus_by_municipality = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    return this.getAgrarianNucleusByMunicipality(parseInt(id), res, next);
  }

  // ct_states = async (req: Request, res: Response, next: NextFunction) => {
  //   return this.getCatalog('ct_state', res, next);
  // }

  cat_states = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('cat_states', res, next);
  }

  cat_municipalities = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    return this.getMunicipalities(parseInt(id) ,res, next);
  }

  cat_neighborhoods = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    return this.getNeighborhoodByMuncipality(parseInt(id) ,res, next);
  }

  cat_neighborhoods_by_id = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    return this.getNeighborhoods(parseInt(id) ,res, next);
  }

  cat_location_by_cp = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    return this.getLocationByCP(parseInt(id) ,res, next);
  }

  getPostalCodes = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_postal_codes', res, next);
  }

  ct_leads_originacion = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_leads_originacion', res, next);
  }

  ct_origination_promoter = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_origination_promoter', res, next);
  }

  ct_programme = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_programme', res, next);
  }

  ct_registration_route = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_registration_route', res, next);
  }

  ct_methodology = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_methodology', res, next);
  }

  ct_project_condition = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_project_condition', res, next);
  }

  ct_licenses_permits = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_licenses_permits', res, next);
  }

  ct_ers_calculator_version = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_ers_calculator_version', res, next);
  }

  ct_estimate_permanence = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_estimate_permanence', res, next);
  }

  getPrct_estimated_mrv_requirementsojectAreas = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_estimated_mrv_requirements', res, next);
  }

  ct_estimate_leakage = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_estimate_leakage', res, next);
  }

  ct_confidence_front_cost = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_confidence_front_cost', res, next);
  }

  ct_cba_calculator_version = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_cba_calculator_version', res, next);
  }

  ct_safeguards_no_harm_approach = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_safeguards_no_harm_approach', res, next);
  }

  ct_social_community_no_harm = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_social_community_no_harm', res, next);
  }

  ct_shareholders_engagement = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_shareholders_engagement', res, next);
  }

  ct_biodiversity = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_biodiversity', res, next);
  }

  ct_hs = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_hs', res, next);
  }

  ct_negativeehs = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_negativeehs', res, next);
  }

  ct_indigenouspeople = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_indigenouspeople', res, next);
  }

  ct_human_rights = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_human_rights', res, next);
  }

  ct_negative_ehs = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_negative_ehs', res, next);
  }

  ct_certificacion = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_certificacion', res, next);
  }

  ct_statusvalidacionap = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_statusvalidacionap', res, next);
  }

  ct_solicitudalran = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_solicitudalran', res, next);
  }

  ct_confidence_crediting_activity_area = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_confidence_crediting_activity_area', res, next);
  }

  ct_version_aa = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_version_aa', res, next);
  }

  ct_status_validation_aa = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_status_validation_aa', res, next);
  }

  ct_population_aa = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_population_aa', res, next);
  }

  ct_agricultural_activity = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_agricultural_activity', res, next);
  }

  getProjct_surveysectAreas = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_surveysect_areas', res, next);
  }

  ct_earring_aa = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_earring_aa', res, next);
  }

  ct_result_ped_ap = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_result_ped_ap', res, next);
  }

  ct_section_ped_aa = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_section_ped_aa', res, next);
  }

  ct_coverage_change_aa = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_coverage_change_aa', res, next);
  }

  ct_subsidies_aa = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_subsidies_aa', res, next);
  }

  cat_postal_codes = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('cat_postal_codes', res, next);
  }

  ct_aggregation = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_aggregation', res, next);
  }

  ct_agrarian_nucleus = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_agrarian_nucleus', res, next);
  }

  ct_folio_car = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_folio_car', res, next);
  }

  ct_land_tenure_type = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_land_tenure_type', res, next);
  }

  ct_municipality = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_municipality', res, next);
  }

  ct_program = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_program', res, next);
  }

  ct_project_alive = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_project_alive', res, next);
  }

  ct_property_type = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_property_type', res, next);
  }

  ct_prospect_priority = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_prospect_priority', res, next);
  }

  ct_state = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_state', res, next);
  }

  ct_status_project = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_status_project', res, next);
  }
  
  ct_lead_sig = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_lead_sig', res, next);
  }
  ct_pedap_result = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_pedap_result', res, next);
  }
  ct_pedaa_section = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_pedaa_section', res, next);
  }
  ct_survey = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_survey', res, next);
  }
  ct_aa_subsidy = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_aa_subsidy', res, next);
  }
  ct_aa_steep = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_aa_steep', res, next);
  }
  ct_aa_coverage_change = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_aa_coverage_change', res, next);
  }
  ct_pedaa_result = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_pedaa_result', res, next);
  }

  ct_lead_legal = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_lead_legal', res, next);
  }

  ct_legal_dd_status = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_legal_dd_status', res, next);
  }

  ct_mekyc_status = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_mekyc_status', res, next);
  }

  ct_approved_buyer = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_approved_buyer', res, next);
  }

  ct_leads_desarrollo = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_leads_desarrollo', res, next);
  }

  ct_lead_safeguards = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_lead_safeguards', res, next);
  }

  ct_lead_mrv = async (req: Request, res: Response, next: NextFunction) => {
    return this.getCatalog('ct_lead_mrv', res, next);
  }

}