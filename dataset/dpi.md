#domain name
DNS Request|DNS Record on Same Server|DNS Record Expired|Matching
---|---|---|---
Yes|Yes|Yes|Yes
Yes|Yes|No|Yes
Yes|No|Yes|Yes
Yes|No|No|Yes
No|Yes|Yes|No
No|Yes|No|Yes
No|No|Yes|No
No|No|No|No

#host name
HTTP Host|HTTPS SNI|Proxy HTTPS Host|Matching
---|---|---|---
Yes|No|No|Yes
No|Yes|No|Yes
No|No|Yes|Yes
No|No|No|No

#URI
