module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
  ],
  'parserOptions': {
    //        "ecmaVersion": "latest", 设置了env:es2021会自动设置它
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
  	'no-unused-vars': ['off'],
  	'no-unused-labels': ['off'],
    'no-mixed-spaces-and-tabs': ['off', 'smart-tabs'],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
