# Envoy-With-2way-SSL
This example demonstrates the example for acheiving 2way ssl on both ingress ( inward traffic) as well as egress ( outward network traffic ) using Envoy


## 2 WAY SSL
If you are not aware about how 2 way ssl works or how it is different from 1 way ssl . Please refer to this [article](https://tutorialspedia.com/an-overview-of-one-way-ssl-and-two-way-ssl/)


## Description
This project is simply an extension of my previous project where I create getting started example on using Envoy as a load balancer. Please visit this [link](https://github.com/budanm/EnvoyLoadBalancer/) to have a look. 

However this project is a little bit different from the previous setup . Here tls context ( downstream tls context ) has been introduced in the edge envoy to carry out tls termination against downstream insecure traffic. Also one of node applications ( service 2 ) has been protected and hence the sidecar/service envoy for that application now handles the upstream tls context ( cluster upsteam tls context ).
The set up of the project can be described roughly in the diagram below

![Envoy proxy mesh with 2 way ssl](envoy2wayssl.png?raw=true "Deployment diagram")
