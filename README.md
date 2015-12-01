
# @request/multipart

> See [@request/core][request-core] for more details.


```js
var options = {
  // related
  multipart: [],
  // form-data
  multipart: {},

  // optional
  contentType: 'multipart/related; boundary=',
  boundary: '',
  preambleCRLF: true,
  postambleCRLF: true
}


var result = multipart(options)

result.contentType
result.body
```

```js
// related
multipart: [{key: 'value', body: 'body'}]
multipart: [{key: 'value', body: 'body'}]

// form-data
multipart: {key: 'value'}
multipart: {key: ['value', 'value']}
multipart: {key: {
  value: 'value',
  options: {filename: '', contentType: '', knownLength: 0}
}}
```


## Notice

This module may contain code snippets initially implemented in [request][request] by [request contributors][request-contributors].


  [request]: https://github.com/request/request
  [request-contributors]: https://github.com/request/request/graphs/contributors
  [request-core]: https://github.com/request/core
