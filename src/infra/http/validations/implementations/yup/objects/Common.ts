import { validation } from '@seidor-cloud-produtos/lib-seidor-common';

export const headers = validation.commomValidators.tenantidSchema;
export const idEntity = validation.commomValidators.idParamSchema;
export const getAllFields = validation.commomValidators.getAllRequestSchema.fields;
