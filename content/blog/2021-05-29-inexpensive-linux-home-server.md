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

#### But why...?

Because their cheap, you can get one with decent hardware (4 CPU cores, 4Gb memory, 32Gb storage, gigabit ethernet, and WiFi/Bluetooth, USB 3.0, sd card support, ...) for about 30 euros, that's right! And after all, why not?

#### But... Can they act as a server?

Yes, they can! Some of them support Linux and even Docker which is great for running multiple services at home such as Node-Red, Home Assistant, ...
But wait, there's more, you can even build a cluster of them! Redundancy and high availability for the win! (For those who care)

#### This sounds great but what are the cons?

Well... You won't get much more expandability as you do with a Raspberry Pi, if you do want to plug in LTE, Humidity, LORA, ... via the Raspberry Pi embedded connector. With this kind of hardware, you can't unless they are USB compatible. Support is not as good as with a Raspberry Pi, and the installation of the operating system can be tricky as well.

There's even a dedicated group of people working on creating Linux support for these kinds of boards.  

### Material list

| Amount | Item | Price | Total Price |
| - | - | - | - |
| 3 | [X96 Max+ 8K with 4GB RAM](https://www.powerplanetonline.com/pt/x96-max-8k-4gb32gb-android-10-android-tv) | 30€ | 90€ |
| 3 | [Corsair GTX Voyager USB 3.1 with 128 GB](https://www.amazon.es/-/pt/dp/B079NVJPKV) | 55€ | 165€ |
| 1 | [GeeekPi Raspberry Pi Cluster](https://www.amazon.es/gp/product/B083FP9JRY) | 40€ | 40€ |
| 1 | [USB Fan 120 mm](https://www.amazon.es/gp/product/B06XQWMFDQ) | € | € |
| 1 | [Thermal Pad 0.5 mm](https://www.amazon.es/gp/product/B08ZKH1CBD) | € | € |
| 1 | [Small Heat Sink](https://www.amazon.es/-/pt/dp/B079FQ22LK) | € | € |

I already had the Small Heat Sink at home, the ones I listed were the closest I found to the ones I have.  
The prices are varying from time to time, the ones I listed were the prices I paid at the time of purchase.  


### Let's get started!

The chosen hardware was an "X96 Max+ 8K" with 4 GB RAM, Amlogic S905x3 (Quad Core), and 32 GB internal memory.  

I wanted to make this cluster as small as possible in size and reliable. I also needed to have more storage space and I didn't want to wear out the internal EMMC (which is probably not the case at all), I wanted to have plenty of space with an SSD like speed experience so I decided to purchase a "Corsair GTX Voyager USB 3.1 with 128 GB" for storing the workloads and "Samsung 64 GB SDCard" for running the operating system.

This was way too much for the job but... Marketing did its job either on these USBs and SD Card with amazing read/write/sequential performance benchmarks and endurance. To be clear, this external USB storage is not needed at all I just wanted to have extra reliable space to store my workloads.

Since I am modifying and going to use this as a cluster I needed to have a proper cluster racking case. There's nothing in the market assembled for this hardware, I tried to look for something that had enough space to put them, and for any additional modification to the racking case, I should be able to do it with domestic tools. I found this online "GeeekPi Raspberry Pi Cluster". It states that it works with several different Raspberry Pi models and even Jetson nano, I decided to give it a shot!

What about Thermals? There were several reasons I wanted to improve thermals:  

* I was going to assemble them in a rack case. 
* The stock thermal heat spreader was not enough. 
* The rack case comes with a fan, I needed to allow it to do its job.  

So that's what I did, disassembled the hardware from the stock cases and added thermal pads in the chips that were generating heat with mini heat spreaders on top. The stock fan that came with the rack case did not have a proper connector to supply its power, I replaced it with one of the same size and USB powered.  