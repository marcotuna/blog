---
title: Meo Go anywhere
description: Using Meo GO with different network operators
date: 2021-05-29T18:15:00.000Z
category: Projects
featuredImage: ../assets/uploads/meo-go-anytime-anywhere.png
published: true
---
A few months ago I acquired an Android TV Box and decided to install Meo Go to watch television without relying on the operator's TV Box.

The experience was way better, the application responsiveness compared to the regular operator tv box was outstanding.

Here's the situation, I wanted to watch TV whether I am at home, traveling, or on holiday, ... However attempting to use it outside a Meo network is not possible, it's a requirement of this service. Even trying to use it with a Smartphone was not possible at all.

The first thing that came to mind was to create a Virtual Private Network (VPN).

There's no problem at all using a VPN but I didn't want to forward all the network traffic through the VPN because it will add an extra hop to all the network traffic and I didn't want to compromise the overall experience.

To bypass that requirement required further analysis... Network traffic analysis and application reverse led to the following networks:  

```plain
10.0.0.1/24
10.173.0.0/16
213.13.0.0/16
62.48.208.0/24
52.142.125.140/32
194.65.61.0/24
```

The networks above are from MEO, some of them are private addresses only available to MEO clients.  
Now it's time to configure the VPN service! I won't go deeper in this blog post about different VPN configurations, if you want to know more you can check this [post](/2021-05-29-connecting-servers-on-unreliable-networks) but should be noted that it's possible to achieve the same result with different configurations.  

I decided to use Tailscale because it's based on Wireguard, easier to set up, available on multiple platforms, and allows peer-to-peer connections which reduce the latency increasing the overall experience.  

The Android APK is not always available on the Playstore however it can be built by cloning the [Tailscale Android repository](https://github.com/tailscale/tailscale-android) and running the Dockerfile on it so it generates the latest APK.  

```
git clone https://github.com/tailscale/tailscale-android.git
docker build -t tailscale-android .
```

By having the Tailscale application on the TV Box it's possible to connect to other servers, however, it's also required to have a server also running Tailscale in the MEO network. That server should expose the networks above or/and allow using it as an exit node.   

Tailscale by default only allows reaching the available servers in your Tailscale Network (Tailnet), by exposing the networks to your Tailnet you can reach the servers that Meo GO needs! Now it should be possible to watch Meo GO without restrictions! There's also a fallback, in case it is not working it's possible to connect to the server as an exit node, this forwards all the traffic through that server, meaning that it's like being in the same location, the only problem with this is that every traffic generated from the client needs to pass through the server which increases bandwidth usage and after all an increased roundtrip.  