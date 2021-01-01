# `singlish.js` - Sinhala Transliteration Parser

This is a simple transliteration parser for existing transliterated sinhala text. This can be used to parse segments of text which are written in sinhala english transliteration. Please note that this will likely break if the text being parsed contains characters other than `a-zA-Z`, hence use with caution.

## Getting Started

```
import { Singlish } from 'singlish.js';

const s = new Singlish();
s.parse('ammaa'); // Results in අම්මා
```

### Prerequisites

N/A

### Installing

```
npm install @_000407/singlish.js
```

## Running the tests

N/A

### Break down into end to end tests

N/A

## Deployment

N/A

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

N/A

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/000407/singlish.js/tags). 

## Authors

* **Kanchana Senadheera** - *Initial work* - [000407](https://github.com/000407)

See also the list of [contributors](https://github.com/000407/singlish.js/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

N/A
