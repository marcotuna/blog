---
title: Meo GO on Android TV Box everywhere
description: Using Meo GO with different network operators
date: 2021-05-29T18:15:00.000Z
category: Projects
published: true
---

A few months ago I acquired an Android TV Box and decided to install Meo Go to watch television without relying on the operator TV Box.  
The experience was way better, the application responsiveness compared to the regular operator tv box was outstanding.  
Here's the situation, I wanted to watch TV whether I am at home, traveling, or on holidays, ... But now every network that I was at was using Meo which is a requirement to use this service
The first thing that came to mind was to create a Virtual Private Network (VPN).  
There's no problem at all using a VPN but I didn't wanted to forward all the network traffic through the VPN.  
To bypass that requirement it required further analysis... Network traffic analysis and application reverse led to the following networks:  

```
10.0.0.1/24
10.173.0.0/16
213.13.0.0/16
62.48.208.0/24
52.142.125.140/32
194.65.61.0/24
```

Now it's time to configure the VPN service, server and client. I won't go deeper in this blogpost about different VPN configurations but it's possible to do this with different setups.  
For my use case I decided to use the following aproach:  
- Home Network (MEO Network)
- Virtual Private Server
- Android Box TV

A Virtual Private Server with a Public IP address is serving as VPN Server. The Home Network which is using MEO connects to the VPN Server and exposes the networks above. Now when a client connects to the VPN Server it will forward MEO GO traffic to the proper network.  

This approach is not the best because it introduces latency due to the Virtual Private Server in the middle but since I already have it with a Public IP address and it was hosted in the same country as the clients it won't create a big penalty and it also introduces complexity and a lot more configurations. The advantage is the fact that is a public server with a public IP address that is reachable from every network, in my situation is serving as a VPN aggregator that forwards traffic to multiple private networks from different locations on multiple networks.    
I am using Wireguard since it is fast and reliable, other VPN services can also work such as OpenVPN but I won't recommend it since it's slower and requires a lot more configurations, it might be an option in restricted networks that won't work with UDP (Which is the only supported protocol that Wireguard uses).  

Now let's get our hands dirty and get to work.  
I will post here the configurations, stay tuned!  
