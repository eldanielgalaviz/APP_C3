import { Injectable } from '@angular/core';
import { UtilApiService } from '../UtilApi.service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}

  getProjectStates(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `catalogs/getProjectStates`, token);
  }

  getAgrarianNucleusByMunicipality(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `catalogs/getAgrarianNucleusByMunicipality/${id}`, token);
  }

  getMunicipalitiesByState(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `catalogs/getMunicipalitiesByState/${id}`, token);
  }

  getPostalCodes(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPostalCodes', token);
  }

  getMunicipalitiesbyid(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `catalogs/getMunicipalities/${id}`, token);
  }

  getNeighborhoodsByMunicipality(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `catalogs/getNeighborhoodsByMunicipality/${id}`, token);
  }

  getNeighborhoodsbyid(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `catalogs/getNeighborhoodsByMunicipality/${id}`, token);
  }  
  
  getLocationByCP(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `catalogs/getLocationByCP/${id}`, token);
  }

  getOriginationPromoter(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getOriginationPromoter', token);
  }

  getProgramme(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getProgramme', token);
  }

  getRegistrationRoute(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getRegistrationRoute', token);
  }

  getMethodology(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getMethodology', token);
  }

  getProjectCondition(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getProjectCondition', token);
  }

  getLicensesPermits(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getLicensesPermits', token);
  }

  getErsCalculatorVersion(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getErsCalculatorVersion', token);
  }

  getEstimatePermanence(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getEstimatePermanence', token);
  }

  getPrctEstimatedMrvRequirements(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPrctEstimatedMrvRequirementsProjectAreas', token);
  }

  getEstimateLeakage(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getEstimateLeakage', token);
  }

  getConfidenceFrontCost(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getConfidenceFrontCost', token);
  }

  getCbaCalculatorVersion(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getCbaCalculatorVersion', token);
  }

  getSafeguardsNoHarmApproach(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getSafeguardsNoHarmApproach', token);
  }

  getSocialCommunityNoHarm(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getSocialCommunityNoHarm', token);
  }

  getShareholdersEngagement(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getShareholdersEngagement', token);
  }

  getBiodiversity(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getBiodiversity', token);
  }

  getHs(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getHs', token);
  }

  getNegativeehs(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getNegativeehs', token);
  }

  getIndigenousPeople(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getIndigenousPeople', token);
  }

  getHumanRights(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getHumanRights', token);
  }

  getCertificacion(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getCertificacion', token);
  }

  getStatusvalidacionAp(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getStatusvalidacionAp', token);
  }

  getSolicitudalRan(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getSolicitudalRan', token);
  }

  getConfidenceCreditingActivityArea(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getConfidenceCreditingActivityArea', token);
  }

  getVersionA(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getVersionA', token);
  }

  getStatusValidacionA(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getStatusValidacionA', token);
  }

  getPopulationA(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPopulationA', token);
  }

  getProjectAreas(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getProjectAreas', token);
  }

  getProjctSurveysectAreas(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getProjctSurveysectAreas', token);
  }

  getEarringA(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getEarringA', token);
  }

  getResultPedAp(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getResultPedAp', token);
  }

  getSectionPedA(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getSectionPedA', token);
  }

  getPedaaSection(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPedaaSection', token);
  }

  getAgriculturalActivity(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getAgriculturalActivity', token);
  }

  getPedSurvey(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPedSurvey', token);
  }

  getPedaaSteep(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPedaaSteep', token);
  }

  getPedaaResult(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPedaaResult', token);
  }

  getCoverageChangeA(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getCoverageChangeA', token);
  }

  getSubsidiesA(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getSubsidiesA', token);
  }

  getMunicipalities(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getMunicipalities', token);
  }

  getNeighborhoods(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getNeighborhoods', token);
  }

  getStates(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getStates', token);
  }

  getAggregation(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getAggregation', token);
  }

  getAgrarianNucleus(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getAgrarianNucleus', token);
  }

  getFolioCar(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getFolioCar', token);
  }

  getLandTenureType(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getLandTenureType', token);
  }

  getMunicipality(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getMunicipality', token);
  }

  getProgram(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getProgram', token);
  }

  getProjectAlive(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getProjectAlive', token);
  }

  getPropertyType(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPropertyType', token);
  }

  getProspectPriority(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getProspectPriority', token);
  }

  getState(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getState', token);
  }

  getStatusProject(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getStatusProject', token);
  }

  getMekycStatus(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getMekycStatus', token);
  }



  // getLegalDDStatus(token: string): Observable<any> {
  //   return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getLegalDDStatus', token);
  // }

  getApprovedBuyer(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getApprovedBuyer', token);
  }

  getSmeArea(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getSmeArea', token);
  }

  getStatusDocuments(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getStatusDocuments', token);
  }

  getMilestonesTDD(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getMilestonesTDD', token);
  }

  getBufferPool(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getBufferPool', token);
  }

  getInventoryStratification(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getInventoryStratification', token);
  }

  getGrievanceMechanism(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getGrievanceMechanism', token);
  }

  getPressNegative(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'catalogs/getPressNegative', token);
  }

}