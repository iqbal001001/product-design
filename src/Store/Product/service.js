import { createAction } from "@reduxjs/toolkit";

export const serviceGetSuite = createAction("service/GetSuite");
export const serviceSaveSuite = createAction("service/SaveSuite");
export const serviceSaveSuiteVersion = createAction("service/SaveSuiteVersion");
export const serviceGetVersion = createAction("service/GetVersion");
export const serviceSaveVersion = createAction("service/SaveVersion");
export const serviceGetCode = createAction("service/GetCode");
export const serviceSaveCode = createAction("service/SaveCode");
export const serviceGetCategory = createAction("service/GetCategory");
export const serviceSaveCategory = createAction("service/SaveCategory");