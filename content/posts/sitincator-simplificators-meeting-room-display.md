---
title: "“Sitincator” - Simplificator’s Meeting Room Display"
date: 2017-01-12
language: en
---

![Sitincator displays in front of meeting rooms](/images/image03.png)

We have two meeting rooms at our Simplificator headquarter office in central Zurich. As they have opaque doors and no windows towards the aisle, it was often unclear whether a meeting room was occupied or not. Frequently, people opened the door and immediately apologized when realizing that there was an ongoing meeting. As an agile company we strive to reduce such nuisances and to improve our efficiency.

We, the “Smooth Operators” team, came up with an idea to improve the situation by mounting a display next to the door of each meeting room showing its occupancy. A 3-day retreat was planned to focus our efforts on this project.

![Team working on the application](/images/image02.png)

We decided to use a Raspberry Pi 3 with its official touch screen display. This allowed us to not only display information, but to make the system interactive. We started out by brainstorming the functionality we wanted to provide to the user. Most importantly, it should be obvious whether the meeting room was occupied or not. Scheduled meetings of the current day should be visible and we wanted to provide the ability to make a “quick reservation”, i.e. anonymously book the room for 15 or 30min. This feature is quite useful if you want to have a short ad-hoc talk or a quick phone call. As we already schedule meetings in Simplificator’s Google Calendar, we fetch booking data from the [Google Calendar API](https://developers.google.com/google-apps/calendar/).

After defining the functionality, we created wireframes to clarify how many screens we would have to implement and what information and interactivity they should provide. We ended up having two screens: the main screen showing whether the room is free or busy and a screen showing all scheduled meetings of the current day. As the functionality and the screens were defined, our designer started to layout the screens and define its components graphically. We tested the design on the display of the Raspberry Pi regarding size and colors and performed quick user tests to finetune the behavior.

![Early Sitincator wireframes](/images/image00.png)
![Mockups of the various screens of the application](/images/image01.png)

Each screen has several possible states (e.g. free and busy), so we decided to use an interactive web frontend technology. As retreats at Simplificator offer an educational component as well, we decided to create two versions of the app, one in [React](https://facebook.github.io/react/) and one in [Elm](http://elm-lang.org/). To run the app in a kiosk mode on the Raspberry Pi, we chose to package our app with Electron.

After the three days of retreat we had two basic apps in React and Elm. For future maintainability we decided to go on with the React app. We mounted the Raspberry Pis and their display next to the meeting room doors, installed our app on them and tested for a while. We found some bugs to fix and improvements to implement. The app is now running quite smoothly and our meetings are free of disturbances!

If you want to rebuild this setup at your office as well, you find the required hardware components and a link to the app’s code below. [Drop us a line](mailto:info@simplificator.com) and tell us how it is working out for you!

 

Components:

- Original Raspberry Pi touch screen 7”, [https://www.pi-shop.ch/raspberry-pi-7-touch-screen-display-mit-10-finger-capacitive-touch](https://www.pi-shop.ch/raspberry-pi-7-touch-screen-display-mit-10-finger-capacitive-touch)
- Raspberry Pi 3, [https://www.pi-shop.ch/raspberry-pi-3](https://www.pi-shop.ch/raspberry-pi-3)
- Display case for the Raspberry Pi and its touchscreen, [https://www.pi-shop.ch/raspberry-pi-7-touchscreen-display-frame-noir](https://www.pi-shop.ch/raspberry-pi-7-touchscreen-display-frame-noir)

Source code of the Sitincator app: [https://github.com/simplificator/sitincator](https://github.com/simplificator/sitincator)
