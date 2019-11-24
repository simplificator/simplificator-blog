---
title: "Use a Raspberry Pi 3 as an access point"
date: 2017-04-28
---

 

![raspberry-pi-logo](images/raspberry-pi-logo.png)

 

Raspberry Pis are awesome \[citation needed\].

This post is about how to setup a WiFi with a Raspberry Pi 3. It describes what packages you have to install and one example is shown how to configure them. In the end you will have an Raspberry Pi 3, which is connected through ethernet to the internet. The Pi provides an SSID and takes care that the traffic between WiFi and Ethernet is forwarded.

This tutorial basically follows the instructions on http://elinux.org/RPI-Wireless-Hotspot, except that it uses `dnsmasq` instead of `udhcpd`.

## Steps

### Operating system

Download and install an operating system for the Raspberry Pi. I used "Raspbian" and followed this description.

https://www.raspberrypi.org/documentation/installation/installing-images/mac.md

Before you unmount the flashed card, create a file named `ssh` in the boot segment on the disk. Otherwise you won't be able to SSH into the Raspberry Pi.

### Installations

Connect the Pi to your local network (through ethernet), search for the little rascal (i.e. using `nmap`) and connect to it via `ssh`.

When logged in, you will have to install at least 2 packages: `dnsmasq` and `hostapd`. I always love to have `vim`, so here's what I did:

\[code lang=text\] sudo apt-get update sudo apt-get install vim sudo apt-get install dnsmasq sudo apt-get install hostapd \[/code\]

### Configure the wlan interface

Now, let's edit the `iface wlan0` part in `/etc/network/interfaces`, make sure it is `static` and has following properties:

\[code lang=shell\] allow-hotplug wlan0 iface wlan0 inet static address 10.0.0.1 netmask 255.255.255.0 wpa-conf /etc/wpa\_supplicant/wpa\_supplicant.conf \[/code\]

Behold, that I used the address `10.0.0.1` as static IP. We will have to use the same IP for the DHCP configuration.

At this point you should quickly restart the networking service.

\[code lang=text\] sudo service networking restart \[/code\]

`ifconfig wlan0` should then show the applied changes on in the wlan0 interface.

### Configure DNSmasq

The Pi will have to manage the clients IP address (DHCP) on the `wlan0` interface. I used DNSmasq for the DHCP server, but it should work fine with any other DHCP servers.

However, let's edit `/etc/dnsmasq.con`

\[code lang=text\] domain-needed bogus-priv interface=wlan0 listen-address=10.0.0.1 dhcp-range=10.0.0.2,10.0.0.254,12h dhcp-option=option:router,10.0.0.1 dhcp-authoritative \[/code\]

Note that the Pi's static IP address is used for `listen-address` and `dhcp-option=option:router`. For more information about that, consider reading http://www.thekelleys.org.uk/dnsmasq/doc.html. ;-)

### Portforwarding (route wlan0 to eth0)

The next step affects iptables. I am no expert in this, so I basically just copy pasted that stuff and ensured that the in `-i` and out `-o` parameters made sense.

\[code lang=text\] sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT \[/code\]

In a nutshell, it allows that general traffic/communication is allowed between the interfaces `wlan0` (wireless) and `eth0` (ethernet). In order that the iptable rules apply immediately, you'll have to do this:

\[code lang=text\] sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip\_forward" \[/code\]

In order that the iptable rules are considered after reboot, edit `/etc/sysctl.conf`, and uncomment this line:

\[code lang=text\] net.ipv4.ip\_forward=1 \[/code\]

Finally persist the iptable rules, otherwise they get truncated after reboot. I used a package `iptables-persistent` which persists the rules right during installation which is pretty convenient.

\[code lang=text\] sudo apt-get install iptables-persistent \[/code\]

### Configure the access point

Now it get's interesting. We can create our own SSID and define a password. Therefore create `/etc/hostapd/hostapd.conf` and paste and save this:

\[code lang=text\] interface=wlan0 driver=nl80211 ssid=SIMPLIFICATOR-WIFI hw\_mode=g channel=6 macaddr\_acl=0 auth\_algs=1 ignore\_broadcast\_ssid=0 wpa=2 wpa\_passphrase=YOUR-INCREDIBLY-SECURE-PASSWORD wpa\_key\_mgmt=WPA-PSK #wpa\_pairwise=TKIP  # You better do not use this weak encryption (only used by old client devices) rsn\_pairwise=CCMP ieee80211n=1          # 802.11n support wmm\_enabled=1         # QoS support ht\_capab=\[HT40\]\[SHORT-GI-20\]\[DSSS\_CCK-40\] \[/code\]

Let's connect the above config to the default hostapd config, edit `/etc/default/hostapd` and make sure `DAEMON_CONF` is uncommented and points to the config file.

\[code lang=text\] DAEMON\_CONF="/etc/hostapd/hostapd.conf" \[/code\]

### Services (hostapd & dnsmasq)

Lastly, let's restart the services and enable them, so that the start automatically on boot.

\[code lang=text\] sudo service hostapd restart sudo service dnsmasq restart sudo update-rc.d hostapd enable sudo update-rc.d dnsmasq enable \[/code\]

## That's it

You should now see a WiFi named `SIMPLIFICATOR-WIFI` and connect to it using the passphrase `YOUR-INCREDIBLY-SECURE-PASSWORD`, or whatever values you have given it.

## Insights

While writing the blog post I had several insights:

- Raspberry Pi 3 comes with an 2.4 GHz 802.11n (150 Mbit/s) WiFi. It's always good to know the limits of the bandwidth.
- Even if you used a WiFi USB adapater with 1000 Mbit/s, the maximum speed would be 480 Mbit/s because of the USB 2 interface (!)
- I wasn't able to configure the Pi, so that two WiFi dongles run simultaneously, so that you could extend the range of an existing WiFi without having the Pi connected to an ethernet cable.
