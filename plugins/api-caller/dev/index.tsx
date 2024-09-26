import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { apiCallerPlugin, ApiCallerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(apiCallerPlugin)
  .addPage({
    element: <ApiCallerPage />,
    title: 'Root Page',
    path: '/api-caller',
  })
  .render();
