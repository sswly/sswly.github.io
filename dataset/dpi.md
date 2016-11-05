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
  {"HTTP Host":true, "Matched":true},
  {"HTTPS SNI":true, "Matched":true},
  {"HTTPS Proxy Host":true, "Matched":true},
  {"HTTP Host":false, "HTTPS SNI":false, "HTTPS Proxy Host":false, "Matched":true},
}
```
#URI
