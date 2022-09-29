module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' }, loose: true }],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@domain': './src/domain',
                    '@application': './src/application',
                    '@infra': './src/infra',
                    '@shared': './src/shared',
                },
            },
        ],
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    ignore: ['**/*.spec.ts'],
};
