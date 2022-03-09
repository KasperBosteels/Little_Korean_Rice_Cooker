# BE AWARE THIS PROJECT IS IN PRODUCTION!!!!


![Logo](https://imgur.com/A2SSxSE.png)


# Little Korean Rice Cooker

this is the comprehensive and as clear as possible readme for the discord bot "Little_Korean_Rice_Cooker".
due to me being the only developer i can only fix bugs or add changes to it, ever so often so don't be  afraid to experiment with the code, while i am indisposed.
tip: the default prefix is "-" (without the quotation marks).


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

your own private discord token:

name:`DISCORD_TOKEN`

To be able to use google search api's you need the following:
You can create this when you make an api in the [google cloud platform](https://console.cloud.google.com/).

name:`GOOGLE_API_KEY`

This one you need to create when you make a custom [google search engine](https://programmablesearchengine.google.com/)

name:`CSE_ID`

You can freely get an oxford api key [here](https://developer.oxforddictionaries.com/):
(is limited to around 100 searches a day)

name:`OXFORD_KEY`


For the bot to log warnings, customize prefixes, save the social credit of users,...
You will need an sql server, ive tailored this bot to use a Mysql server connecten over a network.

name:`HOST`
(The servers ip adress)

name:`USERSQLSERVER`
(The username for the login into the server)

name:`PASSWORDSQLSERVER`
(The password for the sql server)

name:`DATABASE`
(The database in the server that you are going to use)



## STARTING

If you installed all the required packages all you need to do it 
```bash
  cd Little_Korean_Rice_Cooker
  npm start
```


## Installation

Install my-project with npm,
V13 is guaranteed to work with node 16.6.1
```bash
git clone https://github.com/KasperBosteels/Little_Korean_Rice_Cooker.git
cd Little_Korean_Rice_Cooker
git checkout V13
//or V12 if you want the old version(cannot guarantee that one still works).
  npm install
```
    
## Author

- [Kasper](https://github.com/KasperBosteels)


## Support

For support, 
email: Little_Korean_rice_Cooker@outlook.com,

or join the support server on [discord](https://discord.gg/aKZ5a4Vyau).
