import { asyncWrapper } from '../../../../utils/asyncWrapper';
import { Router } from 'express';
import { OriginationCatalogController } from '../../../../controllers/OriginationControllers/OriginationCatalogsController';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';

export class OriginationCatalogsRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/catalogs', authRouter);

    const controller = new OriginationCatalogController();

    authRouter.get('/getPostalCodes', AuthMiddleware.authenticate,asyncWrapper(controller.getPostalCodes));
    authRouter.get('/getStates', AuthMiddleware.authenticate, asyncWrapper(controller.cat_states));
    authRouter.get('/getMunicipalities/:id', asyncWrapper(controller.cat_municipalities));
    authRouter.get('/getNeighborhoodsByMunicipality/:id', AuthMiddleware.authenticate,asyncWrapper(controller.cat_neighborhoods));
    authRouter.get('/getNeighborhoods/:id', AuthMiddleware.authenticate, asyncWrapper(controller.cat_neighborhoods_by_id));
    authRouter.get('/getLocationByCP/:id', AuthMiddleware.authenticate, asyncWrapper(controller.cat_location_by_cp));
    authRouter.get('/getMunicipalitiesByState/:id', AuthMiddleware.authenticate, asyncWrapper(controller.cat_municipalities_by_state));
    authRouter.get('/getAgrarianNucleusByMunicipality/:id', AuthMiddleware.authenticate, asyncWrapper(controller.cat_agrarian_nucleus_by_municipality));
    authRouter.get('/getProjectStates', AuthMiddleware.authenticate, asyncWrapper(controller.ct_state));

    authRouter.get('/getLeadsOriginacion', AuthMiddleware.authenticate, asyncWrapper(controller.ct_leads_originacion));
    authRouter.get('/getOriginationPromoter', AuthMiddleware.authenticate, asyncWrapper(controller.ct_origination_promoter));
    authRouter.get('/getProgramme', AuthMiddleware.authenticate, asyncWrapper(controller.ct_programme));
    authRouter.get('/getRegistrationRoute', AuthMiddleware.authenticate, asyncWrapper(controller.ct_registration_route));
    authRouter.get('/getMethodology', asyncWrapper(controller.ct_methodology));
    authRouter.get('/getProjectCondition', AuthMiddleware.authenticate, asyncWrapper(controller.ct_project_condition));
    authRouter.get('/getLicensesPermits', AuthMiddleware.authenticate, asyncWrapper(controller.ct_licenses_permits));
    authRouter.get('/getErsCalculatorVersion', AuthMiddleware.authenticate, asyncWrapper(controller.ct_ers_calculator_version));
    authRouter.get('/getEstimatePermanence', AuthMiddleware.authenticate, asyncWrapper(controller.ct_estimate_permanence));
    authRouter.get('/getPrctEstimatedMrvRequirementsProjectAreas', AuthMiddleware.authenticate, asyncWrapper(controller.getPrct_estimated_mrv_requirementsojectAreas));
    authRouter.get('/getEstimateLeakage', AuthMiddleware.authenticate, asyncWrapper(controller.ct_estimate_leakage));
    authRouter.get('/getConfidenceFrontCost', AuthMiddleware.authenticate, asyncWrapper(controller.ct_confidence_front_cost));
    authRouter.get('/getCbaCalculatorVersion', AuthMiddleware.authenticate, asyncWrapper(controller.ct_cba_calculator_version));
    authRouter.get('/getSafeguardsNoHarmApproach', AuthMiddleware.authenticate, asyncWrapper(controller.ct_safeguards_no_harm_approach));
    authRouter.get('/getSocialCommunityNoHarm', AuthMiddleware.authenticate, asyncWrapper(controller.ct_social_community_no_harm));
    authRouter.get('/getShareholdersEngagement', AuthMiddleware.authenticate, asyncWrapper(controller.ct_shareholders_engagement));
    authRouter.get('/getBiodiversity', AuthMiddleware.authenticate, asyncWrapper(controller.ct_biodiversity));
    authRouter.get('/getHs', AuthMiddleware.authenticate, asyncWrapper(controller.ct_hs));
    authRouter.get('/getNegativeehs', AuthMiddleware.authenticate, asyncWrapper(controller.ct_negativeehs));
    authRouter.get('/getIndigenousPeople', AuthMiddleware.authenticate, asyncWrapper(controller.ct_indigenouspeople));
    authRouter.get('/getHumanRights', AuthMiddleware.authenticate, asyncWrapper(controller.ct_human_rights));
    authRouter.get('/getCertificacion', AuthMiddleware.authenticate, asyncWrapper(controller.ct_certificacion));
    authRouter.get('/getStatusvalidacionAp', AuthMiddleware.authenticate, asyncWrapper(controller.ct_statusvalidacionap));
    authRouter.get('/getSolicitudalRan', AuthMiddleware.authenticate, asyncWrapper(controller.ct_solicitudalran));
    authRouter.get('/getConfidenceCreditingActivityArea', AuthMiddleware.authenticate, asyncWrapper(controller.ct_confidence_crediting_activity_area));
    authRouter.get('/getVersionA', AuthMiddleware.authenticate, asyncWrapper(controller.ct_version_aa));
    authRouter.get('/getStatusValidacionA', AuthMiddleware.authenticate, asyncWrapper(controller.ct_status_validation_aa));
    authRouter.get('/getPopulationA', AuthMiddleware.authenticate, asyncWrapper(controller.ct_population_aa));
    authRouter.get('/getAgriculturalActivity', AuthMiddleware.authenticate, asyncWrapper(controller.ct_agricultural_activity));
    authRouter.get('/getProjctSurveysectAreas', AuthMiddleware.authenticate, asyncWrapper(controller.getProjct_surveysectAreas));
    authRouter.get('/getEarringA', AuthMiddleware.authenticate, asyncWrapper(controller.ct_earring_aa));
    authRouter.get('/getResultPedAp', AuthMiddleware.authenticate, asyncWrapper(controller.ct_result_ped_ap));
    authRouter.get('/getSectionPedA', AuthMiddleware.authenticate, asyncWrapper(controller.ct_section_ped_aa));
    authRouter.get('/getCoverageChangeA', AuthMiddleware.authenticate, asyncWrapper(controller.ct_coverage_change_aa));
    authRouter.get('/getSubsidiesA', AuthMiddleware.authenticate, asyncWrapper(controller.ct_subsidies_aa));
    // authRouter.get('/getMunicipalities', asyncWrapper(controller.cat_municipalities));
    // authRouter.get('/getNeighborhoods', asyncWrapper(controller.cat_neighborhoods));
    authRouter.get('/getPostalCodes', AuthMiddleware.authenticate, asyncWrapper(controller.cat_postal_codes));
    authRouter.get('/getStates', AuthMiddleware.authenticate, asyncWrapper(controller.cat_states));
    authRouter.get('/getAggregation', AuthMiddleware.authenticate, asyncWrapper(controller.ct_aggregation));
    authRouter.get('/getAgrarianNucleus', AuthMiddleware.authenticate, asyncWrapper(controller.ct_agrarian_nucleus));
    authRouter.get('/getFolioCar', AuthMiddleware.authenticate, asyncWrapper(controller.ct_folio_car));
    authRouter.get('/getLandTenureType', AuthMiddleware.authenticate, asyncWrapper(controller.ct_land_tenure_type));
    authRouter.get('/getMunicipality', AuthMiddleware.authenticate, asyncWrapper(controller.ct_municipality));
    authRouter.get('/getProgram', AuthMiddleware.authenticate, asyncWrapper(controller.ct_program));
    authRouter.get('/getProjectAlive', AuthMiddleware.authenticate, asyncWrapper(controller.ct_project_alive));
    authRouter.get('/getPropertyType', AuthMiddleware.authenticate, asyncWrapper(controller.ct_property_type));
    authRouter.get('/getProspectPriority', AuthMiddleware.authenticate, asyncWrapper(controller.ct_prospect_priority));
    // authRouter.get('/getState', AuthMiddleware.authenticate, asyncWrapper(controller.ct_state));
    authRouter.get('/getStatusProject', AuthMiddleware.authenticate, asyncWrapper(controller.ct_status_project));
    authRouter.get('/getLeadSig', AuthMiddleware.authenticate, asyncWrapper(controller.ct_lead_sig));
    // Aqui empieza PED
    authRouter.get('/getPedaaPopulation', AuthMiddleware.authenticate, asyncWrapper(controller.ct_population_aa));
    authRouter.get('/getPedapResult', AuthMiddleware.authenticate, asyncWrapper(controller.ct_pedap_result));
    authRouter.get('/getPedaaSection', AuthMiddleware.authenticate, asyncWrapper(controller.ct_pedaa_section));
    authRouter.get('/getPedSurvey', AuthMiddleware.authenticate, asyncWrapper(controller.ct_survey));
    authRouter.get('/getPedaaSubsidy', AuthMiddleware.authenticate, asyncWrapper(controller.ct_aa_subsidy));
    authRouter.get('/getPedaaSteep', AuthMiddleware.authenticate, asyncWrapper(controller.ct_aa_steep));
    authRouter.get('/getPedaaCoverageChange', AuthMiddleware.authenticate, asyncWrapper(controller.ct_aa_coverage_change));
    authRouter.get('/getPedaaResult', AuthMiddleware.authenticate, asyncWrapper(controller.ct_pedaa_result));
    authRouter.get('/getLeadLegal', AuthMiddleware.authenticate, asyncWrapper(controller.ct_lead_legal));
    authRouter.get('/getLegalddStatus', AuthMiddleware.authenticate, asyncWrapper(controller.ct_legal_dd_status));
    authRouter.get('/getMekycStatus', AuthMiddleware.authenticate, asyncWrapper(controller.ct_mekyc_status));
    authRouter.get('/getApprovedBuyer', AuthMiddleware.authenticate, asyncWrapper(controller.ct_approved_buyer));
    authRouter.get('/getLeadsDesarrollo', AuthMiddleware.authenticate, asyncWrapper(controller.ct_leads_desarrollo));
    authRouter.get('/getLeadSafeguards', AuthMiddleware.authenticate, asyncWrapper(controller.ct_lead_safeguards));
    authRouter.get('/getLeadMrv', AuthMiddleware.authenticate, asyncWrapper(controller.ct_lead_mrv));
  }
}