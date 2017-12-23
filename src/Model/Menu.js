const FileDetails = require('./FileDetails');

module.exports = [
    {
        header: 'Site Content',
        content: 'Extracts content from a bunch of urls.'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'domain',
                type: String,
                typeLabel: '[underline]{www.domain.com}',
                description: '(Required) Domain to run a11y reports on.'
            },
            {
                name: 'output',
                type: filename => new FileDetails(filename),
                typeLabel: '[underline]{file}',
                description: '(Required) Folder to output the reports to.'
            },
            {
                name: 'verbose',
                defaultValue: false,
                type: Boolean,
                description: 'Output information on the reporting.'
            },
            {
                name: 'help',
                type: Boolean,
                description: 'Print this usage guide.'
            }
        ]
    }
];