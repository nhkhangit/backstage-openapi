import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const apiCallerPlugin = createPlugin({
  id: 'api-caller',
  routes: {
    root: rootRouteRef,
  },
});

export const ApiCallerPage = apiCallerPlugin.provide(
  createRoutableExtension({
    name: 'ApiCallerPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
