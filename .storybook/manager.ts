import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Esthetic UI',
    brandImage: '/esthetica-logo-white.svg',
    brandTarget: '_self',
  }),
});
