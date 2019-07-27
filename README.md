# Envoy-With-2way-SSL
This example demonstrates the example for acheiving 2way ssl on both ingress ( inward traffic) as well as egress ( outward network traffic ) using Envoy


### 2 WAY SSL
If you are not aware about how 2 way ssl works or how it is different from 1 way ssl . Please refer to this [article](https://tutorialspedia.com/an-overview-of-one-way-ssl-and-two-way-ssl/)
### Generating self-signed certificates for 2way ssl ( Mutual  TLS )
For generating self-signed , I found this [link](https://blog.cloudboost.io/implementing-mutual-ssl-authentication-fc20ab2392b3) to be quiet helpful. Ensure however that the common name used for client/server certificate should be different from the common name used for the CA certificate


## Description
This project is simply an extension of my previous project where I create getting started example on using Envoy as a load balancer. Please visit this [link](https://github.com/budanm/EnvoyLoadBalancer/) to have a look. 

However this project is a little bit different from the previous setup . Here tls context ( downstream tls context ) has been introduced in the edge envoy to carry out tls termination against downstream insecure traffic. Also one of node applications ( service 2 ) has been protected and hence the sidecar/service envoy for that application now handles the upstream tls context ( cluster upsteam tls context ).
The set up of the project can be described roughly in the diagram below

![Envoy proxy mesh with 2 way ssl](envoy2wayssl.png?raw=true "Deployment diagram")


## Instructions to run the project ( docker-compose )

The project comes with a docker-compose file which can be used as it is

Step1: Build the project
```
docker-compose build
```

Step2: Bring up the envoy containers using docker-compose
```
docker-compose up  
```

Step3: Verify service 1 is up and running
```
curl -k -v --cert front-envoy-proxy/certificates/clientB-crt.pem --key front-envoy-proxy/certificates/clientB-key.pem https://localhost:8443/service/1

Expected response : TLS Handhake steps  + Hello I am a simple express api service 1 and I am unprotected
```

Step4: Verify service 2 is up and running
```
curl -k -v --cert front-envoy-proxy/certificates/clientB-crt.pem --key front-envoy-proxy/certificates/clientB-key.pem https://localhost:8443/service/2
 
Expected response : TLS Handshake steps +  Hello I am a simple express api service 2 and I am protected
```

The reason for using -k option with curl is because of the reason mentioned in their manuals as shown below
-k/--insecure

(SSL) This option explicitly allows curl to perform "insecure" SSL connections and transfers. Starting with curl 7.10, all SSL connections will be attempted to be made secure by using the CA certificate bundle installed by default. This makes all connections considered "insecure" to fail unless -k/--insecure is used.

The certificates I have used in this project are self signed and hence it will not work with the --cacert option

## Modification avenues for the project
If needed you can make changes to the service code and build the dockerfile using your own tag . You can even build your own certificates if you want using the CA certificate bundle installed by default

## Built With

* [Express](https://expressjs.com/) - The framework used for developing simple services ( service1 and service 2 )

 

## Authors

* **Soumya Mukhopadhyay** 
