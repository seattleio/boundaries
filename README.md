# seattle boundaries

Wondering if a point is inside a city park? Know your latitude and longitude but not sure which city council district you're in?
Want to know all the Seattle-related boundaries that a point is inside?

## More info
- Site: https://boundaries.seattle.io
- API: https://boundaries-api.seattle.io
  - API repo: https://github.com/seattleio/boundaries-api

## API
There's also an API! Send a request like this:

```
https://boundaries-api.seattle.io/boundaries?long=-122.345002&lat=47.667044
```

Get a `FeatureCollection` of the matching features from each dataset in response.

## Data
This project uses [seattle-boundaries](https://github.com/openseattle/seattle-boundaries), a collection of geojson boundaries for the city of Seattle.

## Development

To get this project running on your computer:

- `git clone https://github.com/seattleio/boundaries.git`
- `cd boundaries`
- `npm install`
- `npm start`

## License
[MIT](LICENSE.md)
