module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    // recommended rules
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
    'import-notation': 'string',
    // TODO check and remove offs
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'at-rule-no-vendor-prefix': null,
    'comment-no-empty': null,
    'color-hex-length': 'long',
    'no-invalid-double-slash-comments': null,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'block-no-empty': [
      true,
      {
        severity: 'warning',
      },
    ],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': [
      // Positioning
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      // Display & Box Model
      'display',
      'flex',
      'flex-basis',
      'flex-direction',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',
      'grid',
      'grid-area',
      'grid-template',
      'grid-template-areas',
      'grid-template-rows',
      'grid-template-columns',
      'grid-row',
      'grid-row-start',
      'grid-row-end',
      'grid-column',
      'grid-column-start',
      'grid-column-end',
      'grid-auto-rows',
      'grid-auto-columns',
      'grid-auto-flow',
      'grid-gap',
      'grid-row-gap',
      'grid-column-gap',
      'box-sizing',
      'width',
      'height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      // Typography
      'font-family',
      'font-size',
      'font-smoothing',
      'font-style',
      'font-weight',
      'line-height',
      'letter-spacing',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-shadow',
      'text-transform',
      'white-space',
      'word-break',
      'word-spacing',
      'word-wrap',
      // Visual
      'color',
      'background',
      'background-color',
      'background-image',
      'background-repeat',
      'background-position',
      'background-size',
      'border',
      'border-collapse',
      'border-width',
      'border-style',
      'border-color',
      'border-top',
      'border-top-width',
      'border-top-style',
      'border-top-color',
      'border-right',
      'border-right-width',
      'border-right-style',
      'border-right-color',
      'border-bottom',
      'border-bottom-width',
      'border-bottom-style',
      'border-bottom-color',
      'border-left',
      'border-left-width',
      'border-left-style',
      'border-left-color',
      'border-radius',
      'outline',
      'outline-width',
      'outline-style',
      'outline-color',
      'opacity',
      'filter',
      'visibility',
      'box-shadow',
      'overflow',
      'overflow-x',
      'overflow-y',
      // Misc
      'transition',
      'animation',
      'transform',
      'cursor',
      'resize',
      'user-select',
    ],
  },
};
