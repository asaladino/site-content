# Site Content

Extracts content from a bunch saved html documents. Should be used with
[site-index](https://github.com/asaladino/site-index).

To start the content extraction, run:

```
node ./lib/site-index.js --domain "codingsimply.com" --verbose --html --type crawl --output "/some/reports"
node ./lib/site-content.js --domain "codingsimply.com" --verbose --output "/some/reports"
```

Domain and output folder are required parameters. To see a list of parameters, run
```
node ./lib/site-content.js --help

Site Content

  Extracts content from a bunch of urls. 

Options

  --domain www.domain.com   (Required) Domain to extract contents.       
  --output file             (Required) Folder to output the contents to. 
  --verbose                 Output information on the reporting.         
  --webSearch               Start a web server for search.               
  --help                    Print this usage guide. 
```