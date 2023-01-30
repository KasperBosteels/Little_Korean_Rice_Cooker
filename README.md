# keep in mind when discord updates, certain things might break.

<br/>
<p align="center">
  <a href="https://github.com/KasperBosteels/Little_Korean_Rice_Cooker">
    <img src="https://imgur.com/A2SSxSE.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Little_Korean_Rice_Cooker</h3>

  <p align="center">
    An overly convoluted discord bot,
with a ton of features.
    <br/>
    <br/>
    <a href="https://github.com/KasperBosteels/Little_Korean_Rice_Cooker/issues">Report Bug</a>
    .
    <a href="https://github.com/KasperBosteels/Little_Korean_Rice_Cooker/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/KasperBosteels/Little_Korean_Rice_Cooker?color=dark-green) ![Issues](https://img.shields.io/github/issues/KasperBosteels/Little_Korean_Rice_Cooker) ![License](https://img.shields.io/github/license/KasperBosteels/Little_Korean_Rice_Cooker)

## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Versions](#versions)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## About The Project

If you are a frequent visitor of the popular chat app Discord, you might already know that there are a ton of user made bots for all kinds of purposes.
As an experiment i made my own Discord bot with just some minor functionalities, to be used as a test bed for my javascript skils.
Over the years the bot has  grown and more people started using it, so now i have it running almost 24/7 and periodically update its code as my expertise in javascript grows.
this is by no means a serious project yet, so do not expect frequent updates.

Why would you get this bot for your server?
Here's why:

- This bot has very easily configured.
- This bot likes to have fun just like you.
- There are a ton of fun commands you can try out.
- level progression
- Slash commands
- handy auto moderation features.
- music player with your own playlists with no limits

I hope you consider running or inviting my bot, i am always open for questions or feature suggestions.

## Built With

- discord.js
- discord.js/voice
- oxford api
- urban dictionary api
- programmable google search engine
- mysql
- typeorm
- yt-core

## Getting Started

How to run this project localy:


### Prerequisites

stuff you need to install FIRST!

- node 16.13.2
- npm (i use 8.1.2 as of 2023)
- [ffmpeg](https://www.hostinger.com/tutorials/how-to-install-ffmpeg).
- the discord bot [token](https://discord.com/developers).
- a MySql [server](https://learn.microsoft.com/en-us/sql/relational-databases/databases/create-a-database?view=sql-server-ver16).
- [pm2](https://pm2.keymetrics.io/)

### Versions

LTS

```txt
V14
```

old(unsuported)

```txt
V12
V13
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/KasperBosteels/Little_Korean_Rice_Cooker.git
```

3. Install NPM packages(may take a while).

```sh
npm install
```

4. Create a .env file with the following enviroment variables

. DISCORD_TOKEN=`ENTER YOUR DISCORD TOKEN`
. SERVER_PASSWORD=`YOUR SQL SERVER PASSWORD`
. SERVER_USER=`YOUR SQL SERVER USERNAME`
. DATABASE=`THE DATABASE IN YOUR SQL SERVER`
. HOST=`SQL SERVER IP ADDRESS OR HOSTNAME`
. TYPE=`THE TYPE OF YOUR SERVER IN MY CASE THIS WAS "mysql"`
. PORT=`PORT USUALLY THIS IS 3306 BUT THIS MIGHT BE DIFFERENT FOR YOU`
. OXFORD_ID=`ID FROM THE OXFORD API`
. OXFORD_KEY=`API KEY FOR THE OXFORD API`
. OXFORD_LANG=`THE PREFFERED LANGUAGE`
. OXFORD_URL=`ttps://od-api.oxforddictionaries.com/api/v2`
. CSE_ID=`ID FOR THE PROGRAMMABLE GOOGLE SEARCH ENGINE`
. GOOGLE_API_KEY=`API KEY FOR THE GOOGLE SEARCH ENGINE`

where to get the key's and id's?

- The discord token can be created in [the discord developers platform](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications)

- The sql credentials you will need to create on your own after setting up an sql server.

- The oxford keys can be attained from the [oxford dictionaries api website](https://developer.oxforddictionaries.com/) you will need to create an account there and follow the simple instructions there.
(attention oxford api has started limiting usage of free account you will only get 1000 total requests before you need to pay.)

- For the programmable search engine (the CSE_ID) you will need to create one in [googles programmable search engine](https://programmablesearchengine.google.com/) dashboard
- For the google-api key you will need to create a new project in the [google cloud platform](https://console.cloud.google.com/home)
  and get the google_api key from there.

## Usage

with your terminal navigate to the "Little_Korean_Rice_Cooker" directory.
- windows: use "npm start" to start the bot.
- linux: use "pm2 start bot.js" to start the bot.

## License

Distributed under the CC0 License. See [LICENSE](https://github.com/KasperBosteels/Little_Korean_Rice_Cooker/blob/main/LICENSE) for more information.

## Authors

- **Kasper** - _Programming Student_ - [Kasper](https://github.com/KasperBosteels) - whell i made it on my own.
