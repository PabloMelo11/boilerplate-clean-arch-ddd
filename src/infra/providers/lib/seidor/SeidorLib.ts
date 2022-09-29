import { error, typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import {
    formatParamsToTypeOrmOptionsWithPaginate,
    formatPaginateDataToResponse,
} from '@seidor-cloud-produtos/typeorm';

import { UserRequestData } from '@shared/dtos/UserRequestData';

import ILib from '@domain/providers/lib/ILib';

export default class SeidorLib implements ILib {
    throwError(message: string, code: number): Error {
        return new error.HttpError(code, message);
    }

    preparePaginate(size: string, page: string): { take: number; skip: number } {
        const { skip, take } = formatParamsToTypeOrmOptionsWithPaginate({
            size,
            page,
        });
        return { skip, take };
    }

    queryPaginated<T>(
        query: any,
        dataDB: { data: T[]; count: number },
    ): {
        data: T[];
        count: number;
        limit: number;
        page: number;
        totalPages: number;
    } {
        return formatPaginateDataToResponse(query, dataDB);
    }

    orderBy(
        alias: string,
        param?: string | undefined,
        order?: string | undefined,
    ): string {
        return param
            ? `${alias}.${param?.toLowerCase()} ${
                  order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
              }`
            : `${alias}.created_at ${order ? `${order?.toUpperCase()}` : 'DESC'}`;
    }

    buildUpdateDomain<T>(
        data: T,
        userData: UserRequestData,
        domainId: string,
        tenantId: string,
    ): T {
        return typeorm.dynamicBuilders.buildUpdateWithUser(
            data,
            userData,
            domainId,
            tenantId,
        );
    }
}
