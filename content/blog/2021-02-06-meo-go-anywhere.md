---
title: Meo Go anywhere
description: Using Meo GO with different network operators
date: 2021-05-29T18:15:00.000Z
category: Projects
featuredImage: ../assets/uploads/meo-go-anytime-anywhere.png
published: true
---

A few months ago I acquired an Android TV Box and decided to install Meo Go to watch television without relying on the operator TV Box.  
The experience was way better, the application responsiveness compared to the regular operator tv box was outstanding.  
Here's the situation, I wanted to watch TV whether I am at home, traveling, or on holidays, ... But now every network that I was at was using Meo which is a requirement to use this service. Even trying to use it with a Smartphone was not possible at all.  
The first thing that came to mind was to create a Virtual Private Network (VPN).  
There's no problem at all using a VPN but I didn't want to forward all the network traffic through the VPN because it will add an extra hop to all the network traffic and I didn't want to compromise the overall experience.    
To bypass that requirement it required further analysis... Network traffic analysis and application reverse led to the following networks:  

```plain
10.0.0.1/24
10.173.0.0/16
213.13.0.0/16
62.48.208.0/24
52.142.125.140/32
194.65.61.0/24
```

Now it's time to configure the VPN service! I won't go deeper in this blog post about different VPN configurations but should be noted that it's possible to achieve the same result with different configurations.  

### Using a Central VPN Server

![Tailscale Traditional VPN](https://tailscale.com/blog/how-tailscale-works/hub-and-spoke-single.svg "Traditional VPN")*Source: Tailscale*

#### With an Intermediary

A Virtual Private Server with a Public IP address is acting as VPN Server. The Home Network (using MEO) connects to the VPN Server and exposes the networks above. Now when a client connects to the VPN Server it will forward MEO GO traffic to the proper network.  

This approach is not the best because it introduces latency due to the Virtual Private Server in the middle but since I already have it with a Public IP address and it was hosted in the same country as the clients it won't create a big penalty, it as some disadvantages such as a lot more complexity and configurations. The advantage is the fact that is a public server with a public IP address that is reachable from every network, in my situation is serving as a VPN aggregator that forwards traffic to multiple private networks from different locations on multiple networks.    
I am using Wireguard since it is fast and reliable, other VPN services can also work such as OpenVPN but I won't recommend it since it's slower and requires even more configurations, it might be an option in restricted networks that won't work with UDP (Which is the only supported protocol that Wireguard uses).  

#### Without an Intermediary

A Private Server hosted at home (using MEO) is required to act as a VPN Server. Port forwarding is necessary to allow clients to connect to the VPN.  

### Using a P2P (Client to Client)

![Tailscale Mesh Network](https://tailscale.com/blog/how-tailscale-works/mesh-network.svg "Mesh Network") *Source: Tailscale*

For the P2P approach, Tailscale is being used since it is easier to configure and can satisfy every requirement that I have but unfortunately, it has a caveat, the Android TV doesn’t support the Tailscale client.  

Now let's get our hands dirty and get to work.  
I will post here the configurations, stay tuned!  
