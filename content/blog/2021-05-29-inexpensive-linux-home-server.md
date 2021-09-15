---
title: Inexpensive Linux Home Server
description: Creating an inexpensive redundant Linux Home Server
date: 2021-05-29T18:15:00.000Z
category: Projects
featuredImage: ../assets/uploads/inexpensive-linux-server.png
published: true
---
Usually Raspberry Pi is THE holy savior of a low-budget home server but what if... It isn't? Or should I say... it's not the only one.


What about hardware that usually sits under the TV desk? TV Box? That's right! Unfortunately, that's not the one from the television service provider, I am referring to Android TV Boxes usually from unknown and unheard brands.


But why?


Because their cheap, you can get one with decent hardware (4 CPU cores, 4Gb memory, 32Gb storage, gigabit ethernet, and WiFi/Bluetooth, USB 3.0, sd card support, ...) for about 30 euros, that's right! And after all, why not?


But... Can they act as a server? Yes, they can! Some of them support Linux and even Docker which is great for running multiple services at home such as Node-Red, Home Assistant, ...
But wait, there's more, you can even build a cluster of them! Redundancy and high availability for the win! (For those who care)


This sounds great but what are the cons? Well... You won't get much more expandability as you do with a Raspberry Pi, if you do want to plug in LTE, Humidity, LORA, ... via the Raspberry Pi embedded connector. With this kind of hardware you can't unless they are USB compatible. Support is not as good as with a Raspberry Pi, the installation of the operating system can be tricky as well.


For me this was not a problem so I decided to buy 3x X96 Max+ 8K (26.40 euros without VAT / 32.37 euros with VAT each), however, I wanted to make this a small cluster with a little addition, more reliable, and increased storage space, I didn't want to wear-out the internal EMMC from the box (which is probably not the case at all), I wanted to have plenty of space with an SSD like speed experience so I decided to purchase a Corsair GTX Voyager USB 3.1 with 128 GB. This was way too much for what I wanted but well... Marketing did its job on these USBs with amazing read/write/sequential performance benchmarks. To be clear, this external storage is not needed at all.