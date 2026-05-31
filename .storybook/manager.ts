import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Esthetic UI',
    brandImage: '/esthetica-logo.svg',
    brandTarget: '_self',
  }),
});
