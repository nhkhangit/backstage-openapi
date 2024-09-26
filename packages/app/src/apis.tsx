/* eslint-disable no-console */
import { ApiEntity } from '@backstage/catalog-model';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
} from '@backstage/core-plugin-api';
import {
  ScmAuth,
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
} from '@backstage/integration-react';
import {
  apiDocsConfigRef,
  defaultDefinitionWidgets,
  OpenApiDefinitionWidget,
} from '@backstage/plugin-api-docs';
import React from 'react';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  ScmAuth.createDefaultApiFactory(),
  createApiFactory({
    api: apiDocsConfigRef,
    deps: {},
    factory: () => {
      // Áp dụng interceptor vào các widget định nghĩa OpenAPI
      const definitionWidgets = defaultDefinitionWidgets().map(obj => {
        // eslint-disable-next-line no-console
        console.log(obj.type);
        if (obj.type === 'openapi') {
          return {
            ...obj,

            component: (definition: any) => (
              <OpenApiDefinitionWidget
                definition={definition}
                // override and change request
                requestInterceptor={req => {
                  return { ...req, headers: { ...req?.headers, Test: 'encrypt raw data and encrypt' } };
                }}
              />
            ),
          };
        }
        return obj;
      });

      return {
        getApiDefinitionWidget: (apiEntity: ApiEntity) => {
          return definitionWidgets.find(d => d.type === apiEntity.spec.type);
        },
      };
    },
  }),
];