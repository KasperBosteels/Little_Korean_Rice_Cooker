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

If you are a frequent visitor of the discord chat servers, you might already know that there are a ton of bots for a million different tasks.

altho this project was started as just an educational project for my programming skills, it has grown a special place in my heart, and i've been developing it on and off for more than 2 years now.

Why would you get this bot for your server?
Here's why:

- This bot has very easily accessable configuration.
- This bot likes to have fun just like you.
- There are a ton of fun commands you can try out.
- level progression
- Slash commands
- handy auto moderation features

I hope you consider running or inviting my bot, i am always open for questions or feature suggestions.

## Built With

- discord.js
- discord.js/voice
- oxford api
- urban dictionary api
- programmable google search engine
- mysql
- yt-core

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

stuff you need to install first

- npm (i use 7.21.1 atm)
- [ffmpeg](https://www.hostinger.com/tutorials/how-to-install-ffmpeg).
- the discord bot [token](https://discord.com/developers).
- an SQL [server](https://learn.microsoft.com/en-us/sql/relational-databases/databases/create-a-database?view=sql-server-ver16).
- node node version 16.9.0 should work(thats what i use).

### Versions

development

```txt
V14
```

works but no longer supported

```txt
V13
```

old(unsuported)

```txt
V12
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

DISCORD_TOKEN=`ENTER YOUR DISCORD TOKEN`
PASSWORDSQLSERVER=`YOUR SQL SERVER PASSWORD`
USERSQLSERVFER=`SQL USERNAME`
DATABASE=`THE DATABASE IN YOUR SQL SERVER`
HOST=`SQL SERVER IP ADDRESS`
OXFORD_ID=`ID FROM THE OXFORD API`
OXFORD_KEY=`API KEY FOR THE OXFORD API`
OXFORD_LANG=`THE PREFFERED LANGUAGE`
OXFORD_URL=`ttps://od-api.oxforddictionaries.com/api/v2`
CSE_ID=`ID FOR THE PROGRAMMABLE GOOGLE SEARCH ENGINE`
GOOGLE_API_KEY=`API KEY FOR THE GOOGLE SEARCH ENGINE`

where to get the key's and id's?

- The discord token can be created in [the discord developers platform](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications)

- The sql credentials you will need to create on your own after installing mysql on a device

- The oxford keys can be attained from the [oxford dictionaries api website](https://developer.oxforddictionaries.com/) you will need to create an account there and follow the simple instructions there.

- For the programmable search engine (the CSE_ID) you will need to create one in [googles programmable search engine](https://programmablesearchengine.google.com/) dashboard
- For the google-api key you will need to create a new project in the [google cloud platform](https://console.cloud.google.com/home)
  and get the google_api key from there.

## Usage

Once you have installed all the packages, and put all the keys/id's in the .env file you can just type 'npm start' in the terminal to start the bot.

## License

Distributed under the CC0 License. See [LICENSE](https://github.com/KasperBosteels/Little_Korean_Rice_Cooker/blob/main/LICENSE) for more information.

## Authors

- **Kasper** - _Programming Student_ - [Kasper](https://github.com/KasperBosteels) - whell i made it on my own.
