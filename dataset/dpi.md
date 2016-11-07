#domain name
```javascript
[
  {"ID":1, "DSN Request":true, "Legacy DNS Record":false, "Legacy DNS Record on Same Server":false, "Matched":true},
  {"ID":2, "DSN Request":false, "Legacy DNS Record":true, "Legacy DNS Record on Same Server":true, "Matched":true},
  {"ID":3, "DSN Request":false, "Legacy DNS Record":true, "Legacy DNS Record on Same Server":false, "Matched":false},
  {"ID":4, "DSN Request":false, "Legacy DNS Record":false, "Legacy DNS Record on Same Server":true, "Matched":false},
  {"ID":5, "DSN Request":false, "Legacy DNS Record":false, "Legacy DNS Record on Same Server":false, "Matched":false}
]
```
#host name
```javascript
[
  {"ID":1, "HTTP Host":true, "HTTPS Proxy Host":false, "HTTPS SNI":false, "Matched":true},
  {"ID":2, "HTTP Host":false, "HTTPS Proxy Host":true, "HTTPS SNI":false, "Matched":true},
  {"ID":3, "HTTP Host":false, "HTTPS Proxy Host":false, "HTTPS SNI":true, "Matched":true},
  {"ID":4, "HTTP Host":false, "HTTPS Proxy Host":false, "HTTPS SNI":false, "Matched":false}
]
```
#URI
```javascript
[
  {"ID":1, "Rule":"^/", "Traffic Type":"HTTP", "URL Matched":true, "Matched":true},
  {"ID":2, "Rule":"^!/", "Traffic Type":"HTTP", "URL Matched":true, "Matched":true},
  {"ID":3, "Rule":"http:", "Traffic Type":"HTTP", "URL Matched":true, "Matched":true},
  {"ID":3, "Rule":"https:", "Traffic Type":"HTTPS", "Matched":true}
]
```
