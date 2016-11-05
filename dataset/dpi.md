#domain name
```javascript
[
  {"DSN Request":true, "Matched":true},
  {"DSN Request":false, "Legacy DNS Record":true, "Legacy DNS Record on Same Server":true, "Matched":true},
  {"DSN Request":false, "Legacy DNS Record":false, "Matched":false},
  {"DSN Request":false, "Legacy DNS Record":true, "Legacy DNS Record on Same Server":false, "Matched":false}
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
